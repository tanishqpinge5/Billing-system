
import { MongoClient } from "mongodb";

let clientPromise;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB;

  if (!uri || !dbName) {
    throw new Error("Missing MongoDB environment variables");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);

    clientPromise = client.connect().catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }

  const client = await clientPromise;
  return client.db(dbName);
}
