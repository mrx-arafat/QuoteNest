import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

// Components
import Header from "./components/Header";
import Home from "./pages/Home";
import AddQuote from "./pages/AddQuote";
import MyQuotes from "./pages/MyQuotes";
import NotFound from "./pages/NotFound";

// Context & Styles
import { ThemeProvider } from "./context/ThemeContext";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <Header />
        <AppContainer>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-quote" element={<AddQuote />} />
              <Route path="/my-quotes" element={<MyQuotes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </AppContainer>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
