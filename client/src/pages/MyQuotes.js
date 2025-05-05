import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import QuoteCard from "../components/QuoteCard";

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#6d4ce3" : "#666")};
  border-bottom: ${(props) => (props.active ? "2px solid #6d4ce3" : "none")};
  cursor: pointer;
  margin-right: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
`;

// Mock data for demonstration
const mockQuotes = [
  {
    id: 1,
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    book: "Long Walk to Freedom",
    tags: ["inspiration", "perseverance"],
  },
  {
    id: 2,
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    book: "The Quotable Walt Disney",
    tags: ["motivation", "action"],
  },
  {
    id: 3,
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    book: "Stanford Commencement Address",
    tags: ["life", "purpose"],
  },
];

const MyQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // In a real application, you would fetch quotes from the API
    // For demonstration purposes, we're using mock data
    setTimeout(() => {
      setQuotes(mockQuotes);
      setLoading(false);
    }, 1000);

    // Actual API call would look like this:
    /*
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/quotes');
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuotes();
    */
  }, []);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>My Quotes</PageTitle>
        <TabContainer>
          <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
            All
          </Tab>
          <Tab
            active={activeTab === "favorites"}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </Tab>
          <Tab
            active={activeTab === "recent"}
            onClick={() => setActiveTab("recent")}
          >
            Recently Added
          </Tab>
        </TabContainer>
      </PageHeader>

      {loading ? (
        <LoadingState>Loading quotes...</LoadingState>
      ) : quotes.length === 0 ? (
        <EmptyState>
          <EmptyStateText>You haven't added any quotes yet.</EmptyStateText>
        </EmptyState>
      ) : (
        quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote.quote}
            author={quote.author}
            book={quote.book}
            tags={quote.tags}
          />
        ))
      )}
    </PageContainer>
  );
};

export default MyQuotes;
