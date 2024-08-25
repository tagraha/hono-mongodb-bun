import * as mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (Bun.env.MONGO_URI !== undefined) {
      const conn = await mongoose.connect(Bun.env.MONGO_URI, {
        autoIndex: true,
        dbName: Bun.env.DB_NAME,
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
