import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Check if the MongoDB URL is provided
  if (!process.env.MONGODB_URL) {
    console.error("Missing MongoDB URL");
    return;
  }

  // If the connection is already established, return the existing connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (error) {
    isConnected = false; // Set the connection status to false
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};
