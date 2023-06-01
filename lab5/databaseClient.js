import { MongoClient } from "mongodb";

const databaseClient = new MongoClient("mongodb://127.0.0.1:27017/");
export default databaseClient;
