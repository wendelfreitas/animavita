import React, {useEffect} from 'react';
import * as Facebook from 'expo-facebook';
import {FacebookButton} from '@animavita/ui/social';
import {useMutation} from '@animavita/relay';
import {differenceInSeconds} from 'date-fns';

import getEnvVars from '../../../environment';

import {ContinueWithFacebookMutation as ContinueWithFacebookMutationType} from './__generated__/ContinueWithFacebookMutation.graphql';
import useAuth from './useAuth';
import {ContinueWithFacebookMutation} from './ContinueWithFacebook.mutation';

const {fbAppID, fbAppName} = getEnvVars();

const ContinueWithFacebook: React.FC = () => {
  const {changeFbLoginLoadingTo, fbLoginIsLoading, onCompleted, onError} = useAuth();
  const [, authenticateFacebookUser] = useMutation<ContinueWithFacebookMutationType>(ContinueWithFacebookMutation);

  // TODO: initialize this sooner
  useEffect(() => {
    async function initializeFacebookSDK() {
      try {
        await Facebook.initializeAsync({appId: fbAppID, appName: fbAppName});
      } catch ({message}) {
        // eslint-disable-next-line no-console
        console.log(`Facebook Login Error: ${message}`);
      }
    }

    initializeFacebookSDK();
  }, []);

  const loginWithFacebookMobile = async () => {
    // prevent the user from firing too much requests
    if (fbLoginIsLoading) return;

    changeFbLoginLoadingTo(true);

    const response = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });

    if (response.type === 'success') {
      const {token, permissions, expirationDate} = response;
      const expires = differenceInSeconds(new Date(expirationDate), new Date());

      authenticateFacebookUser({
        variables: {
          input: {
            token,
            expires,
            permissions: permissions || [],
          },
        },
        onCompleted,
        onError,
      });
    } else {
      changeFbLoginLoadingTo(false);
    }
  };

  return <FacebookButton testID="fb-btn" onPress={loginWithFacebookMobile} />;
};

export default ContinueWithFacebook;
