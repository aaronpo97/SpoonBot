import mongoose from 'mongoose';

export const connectMongo = async () => mongoose.connect(process.env.MONGO_URI!);
export const disconnectMongo = async () => mongoose.disconnect();
