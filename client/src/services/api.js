import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Quotes API
export const quoteService = {
  // Get all quotes
  getQuotes: async () => {
    try {
      const response = await api.get("/quotes");
      return response.data;
    } catch (error) {
      console.error("Error fetching quotes:", error);
      throw error;
    }
  },

  // Get a single quote by ID
  getQuoteById: async (id) => {
    try {
      const response = await api.get(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching quote with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new quote
  createQuote: async (quoteData) => {
    try {
      const response = await api.post("/quotes", quoteData);
      return response.data;
    } catch (error) {
      console.error("Error creating quote:", error);
      throw error;
    }
  },

  // Update a quote
  updateQuote: async (id, quoteData) => {
    try {
      const response = await api.put(`/quotes/${id}`, quoteData);
      return response.data;
    } catch (error) {
      console.error(`Error updating quote with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a quote
  deleteQuote: async (id) => {
    try {
      const response = await api.delete(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting quote with id ${id}:`, error);
      throw error;
    }
  },

  // Get quotes by tag
  getQuotesByTag: async (tag) => {
    try {
      const response = await api.get(`/quotes/tags/${tag}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching quotes with tag ${tag}:`, error);
      throw error;
    }
  },
};

export default api;
