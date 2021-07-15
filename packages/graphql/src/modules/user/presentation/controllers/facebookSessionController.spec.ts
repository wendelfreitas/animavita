import * as http from 'http';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

import app from '../../../../app';
import {connectMongoose, clearDbAndRestartCounters, disconnectMongoose} from '../../../../shared/tests/helpers';

const server = http.createServer(app.callback());

const query = `mutation ContinueWithFacebookMutation($input: SaveFacebookUserInput!) {
  authenticateFacebookUser(input: $input) {
   error
   user {
     name
   }
   token
 }
}`;

const variables = {
  input: {
    token: 'fake-token',
    expires: 1000,
    permissions: ['public_profile', 'email'],
  },
};

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

describe('Facebook Session Controller', () => {
  const mockedAxios = new MockAdapter(axios);
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null);
  });
  beforeEach(() => {
    mockedAxios.reset();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when successfully get data from facebook', () => {
    it('authenticates the user', async () => {
      mockedAxios.onGet('https://graph.facebook.com/me?fields=id,name,email&access_token=fake-token').reply(200, {
        id: 'fake-id',
        name: 'John Doe',
        email: 'johndoe@animavita.com',
      });

      mockedAxios
        .onGet('https://graph.facebook.com/me/picture?height=720&width=720&redirect=false&access_token=fake-token')
        .reply(200, 'fake-url');

      const response = await request(server)
        .post('/')
        .send({
          operationName: 'ContinueWithFacebookMutation',
          query,
          variables,
        });

      const {
        authenticateFacebookUser: {user, token, error},
      } = response.body.data;

      expect(user.name).toBe('John Doe');
      expect(token).toMatch(/(JWT )\w+\.\w+\.\w+/g);
      expect(error).toBeNull();
    });
  });

  describe('when fails to get data from facebook', () => {
    it('throws an error', async () => {
      mockedAxios.onGet('https://graph.facebook.com/me?fields=id,name,email&access_token=fake-token').reply(400, {
        error: {
          message: 'failed to get facebook data',
          code: 400,
        },
      });

      const response = await request(server)
        .post('/')
        .send({
          operationName: 'ContinueWithFacebookMutation',
          query,
          variables,
        });

      const error = response.body.errors[0];
      expect(error.message).toBe('Failed to fetch basic user data');
    });
  });
});
