import { MONGO_DB } from "@/infrastructure/config";

const mongoose: any = require("mongoose");
export const mongooseObj = mongoose.Types.ObjectId;

export const mongooseConnection = async () => {
  const uri: string =
    MONGO_DB.username && MONGO_DB.password
      ? `mongodb://${MONGO_DB.username}:${MONGO_DB.password}@${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`
      : `mongodb://${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`;

  const publicURI = `${MONGO_DB.hostname}:${MONGO_DB.port}/${MONGO_DB.database}`;
  console.info(uri);
  mongoose.connection.on("connected", () => {
    console.info(`Mongoose connected to ${publicURI}`);
  });

  mongoose.connection.on("error", (err: string) => {
    console.info("Mongoose default connection error: " + err);
  });

  mongoose.connection.on("disconnected", function () {
    console.info("Mongoose default connection disconnected");
  });

  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
