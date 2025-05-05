const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");

// Get all quotes with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalQuotes = await Quote.countDocuments();
    const quotes = await Quote.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      quotes,
      currentPage: page,
      totalPages: Math.ceil(totalQuotes / limit),
      totalQuotes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search quotes with pagination
router.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchCondition = {
      $or: [
        { quote: { $regex: searchQuery, $options: "i" } },
        { author: { $regex: searchQuery, $options: "i" } },
        { book: { $regex: searchQuery, $options: "i" } },
        { tags: { $in: [new RegExp(searchQuery, "i")] } },
      ],
    };

    const totalQuotes = await Quote.countDocuments(searchCondition);
    const quotes = await Quote.find(searchCondition)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      quotes,
      currentPage: page,
      totalPages: Math.ceil(totalQuotes / limit),
      totalQuotes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get quotes by tag with pagination
router.get("/tags/:tag", async (req, res) => {
  try {
    const tag = req.params.tag;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalQuotes = await Quote.countDocuments({ tags: tag });
    const quotes = await Quote.find({ tags: tag })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      quotes,
      currentPage: page,
      totalPages: Math.ceil(totalQuotes / limit),
      totalQuotes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get favorite quotes with pagination
router.get("/favorites", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalQuotes = await Quote.countDocuments({ favorite: true });
    const quotes = await Quote.find({ favorite: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      quotes,
      currentPage: page,
      totalPages: Math.ceil(totalQuotes / limit),
      totalQuotes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific quote
router.get("/:id", async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new quote
router.post("/", async (req, res) => {
  try {
    const newQuote = new Quote(req.body);
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a quote
router.put("/:id", async (req, res) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json(updatedQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle favorite status
router.patch("/:id/favorite", async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.favorite = !quote.favorite;
    const updatedQuote = await quote.save();

    res.status(200).json(updatedQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a quote
router.delete("/:id", async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
