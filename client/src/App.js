import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Components
import Header from "./components/Header";
import Home from "./pages/Home";
import AddQuote from "./pages/AddQuote";
import MyQuotes from "./pages/MyQuotes";

// Styles
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const App = () => {
  return (
    <Router>
      <Header />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-quote" element={<AddQuote />} />
          <Route path="/my-quotes" element={<MyQuotes />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
