import path from 'path';

import dotenv from 'dotenv';
import envVar from 'env-var';

const cwd = process.cwd();

dotenv.config({
  path: path.join(cwd, '.env'),
});

export const JWT_KEY = envVar
  .get('JWT_KEY')
  .required()
  .asString();

export const ANIMAVITA_ENV = envVar
  .get('ANIMAVITA_ENV')
  .required()
  .asString();

export const AWS_S3_BUCKET_NAME = envVar
  .get('AWS_S3_BUCKET_NAME')
  .required()
  .asString();
export const AWS_REGION = envVar
  .get('AWS_REGION')
  .required()
  .asString();
export const AWS_ACCESS_KEY_ID = envVar
  .get('AWS_ACCESS_KEY_ID')
  .required()
  .asString();
export const AWS_SECRET_ACCESS_KEY = envVar
  .get('AWS_SECRET_ACCESS_KEY')
  .required()
  .asString();
export const AWS_STANDARD_QUEUE_URL = envVar
  .get('AWS_STANDARD_QUEUE_URL')
  .required()
  .asString();

export const MONGO_URI = envVar
  .get('MONGO_URI')
  .required()
  .asString();
