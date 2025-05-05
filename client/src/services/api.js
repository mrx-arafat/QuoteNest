import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance with interceptors for error handling
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle API errors
    const customError = {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status || 500,
    };

    // Log error
    console.error("API Error:", customError);

    return Promise.reject(customError);
  }
);

// Quotes API
export const quoteService = {
  // Get all quotes, optionally with endpoint suffix (e.g., "/favorites")
  getQuotes: async (endpoint = "", page = 1, limit = 10) => {
    try {
      const response = await api.get(
        `/quotes${endpoint}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a single quote by ID
  getQuoteById: async (id) => {
    try {
      const response = await api.get(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new quote
  createQuote: async (quoteData) => {
    try {
      const response = await api.post("/quotes", quoteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update a quote
  updateQuote: async (id, quoteData) => {
    try {
      const response = await api.put(`/quotes/${id}`, quoteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Toggle favorite status
  toggleFavorite: async (id) => {
    try {
      const response = await api.patch(`/quotes/${id}/favorite`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a quote
  deleteQuote: async (id) => {
    try {
      const response = await api.delete(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get quotes by tag
  getQuotesByTag: async (tag, page = 1, limit = 10) => {
    try {
      const response = await api.get(
        `/quotes/tags/${tag}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search quotes (by text, author, etc.)
  searchQuotes: async (searchTerm, page = 1, limit = 10) => {
    try {
      const response = await api.get(
        `/quotes/search?q=${encodeURIComponent(
          searchTerm
        )}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
