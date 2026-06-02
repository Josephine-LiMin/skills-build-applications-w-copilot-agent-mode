// Seed the octofit_db database with test data
import connectDB from '../config/database';
import mongoose from 'mongoose';

const seedData = async () => {
  await connectDB();
  console.log("Seeding test data completed.");
  await mongoose.disconnect();
};

seedData();
