import dotenv from "dotenv";

dotenv.config();

export const PORT = 5555;

export const MongoDBURL = process.env.MONGODBURL;
