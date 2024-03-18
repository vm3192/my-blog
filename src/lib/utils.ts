import mongoose, { ConnectionStates } from "mongoose";

type connectionType = {
  isConnected?: ConnectionStates;
};

export const connectToDB = async () => {
  const connection: connectionType = {};

  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO!);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error("Failed to connect to the database");
  }
};