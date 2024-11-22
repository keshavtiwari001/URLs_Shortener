const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_URL);
    console.log(`mongoDB is connected !!`);
  } catch (error) {
    console.log(`err in connecting monngoDB : ${error}`);
  }
};

module.exports = connectDB;
