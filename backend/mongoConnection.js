// const { MongoClient } = require('mongodb');
// require('dotenv').config()

 //const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.wgbbinn.mongodb.net/trucklist`
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB Atlas');
//     // you can perform database operations here
//   } catch (error) {
//     console.error('Failed to connect to MongoDB Atlas', error);
//   }
// }

// // connectToDatabase();
// module.exports = connectToDatabase

const mongoose = require("mongoose");
require('dotenv').config()

console.log(`*****URI*****`, process.env.MONGO_URI);

// this function will be called in the server.js
const connectDB = async () => {
  try {
    // mongodb connection string
    // uses your database's specific URI
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
