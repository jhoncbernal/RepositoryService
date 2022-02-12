declare const process: any;

const env = process.env;

export const PROJECT = {
  name: env.PROJECT_NAME,
  mode: env.PROJECT_MODE,
};

export const SERVER = {
  hostname: env.SERVER_HOSTNAME,
  port: env.SERVER_PORT,
};

export const SWAGGER = {
  isPublic: env.SWAGGER_IS_PUBLIC,
  html: env.SWAGGER_HTML_ENDPOINT,
  json: env.SWAGGER_JSON_ENDPOINT,
};

export const MONGO_DB = {
  hostname: env.MONGODB_HOSTNAME,
  port: env.MONGODB_PORT,
  database: env.MONGODB_DATABASE,
  username: env.MONGODB_USERNAME,
  password: env.MONGODB_PASSWORD,
};
