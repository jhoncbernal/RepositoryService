import dotenv from "dotenv";
dotenv.config();
export const PROJECT = {
  name: process.env.PROJECT_NAME || "DefaultProjectName",
  mode: process.env.PROJECT_MODE || "DefaultProjectMode",
};

export const SERVER = {
  hostname: process.env.SERVER_HOSTNAME || "localhost",
  port: process.env.PORT || process.env.SERVER_PORT || "8080",
};

export const SWAGGER = {
  isPublic: process.env.SWAGGER_IS_PUBLIC || "false",
  html: process.env.SWAGGER_HTML_ENDPOINT || "/swagger.html",
  json: process.env.SWAGGER_JSON_ENDPOINT || "/swagger.json",
};

export const MONGO_DB = {
  hostname: process.env.MONGODB_HOSTNAME || "localhost",
  port: process.env.MONGODB_PORT || "27017",
  database: process.env.MONGODB_DATABASE || "defaultDatabase",
  username: process.env.MONGODB_USERNAME || "defaultUser",
  password: process.env.MONGODB_PASSWORD || "defaultPassword",
};

export const AWS = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "yourAccessKeyId",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "yourSecretAccessKey",
  region: process.env.AWS_REGION || "us-east-1",
  bucketImg: process.env.AWS_BUCKET_IMG || "yourBucketImg",
  bucketFile: process.env.AWS_BUCKET_FILE || "yourBucketFile",
};
