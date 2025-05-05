const mongoose = require("mongoose");
const Quote = require("./models/Quote");
require("dotenv").config();

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("MONGO_URI:", process.env.MONGO_URI || "not set");

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connection successful!");

    // Test creating a quote
    const testQuote = new Quote({
      quote: "This is a test quote",
      author: "Test Author",
      book: "Test Book",
      tags: ["test", "debug"],
    });

    console.log("Attempting to save a test quote...");
    const savedQuote = await testQuote.save();
    console.log("Quote saved successfully:", savedQuote);

    // Clean up - delete the test quote
    await Quote.findByIdAndDelete(savedQuote._id);
    console.log("Test quote cleaned up");

    mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error:", error.message);
    if (error.stack) {
      console.error("Stack:", error.stack);
    }
    process.exit(1);
  }
}

testConnection();
