import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import TiltEffect from "./ui/TiltEffect";
import { useThemeContext } from "../context/ThemeContext";

const Container = styled.div`
  margin: 50px 0;
  position: relative;
`;

const FeaturedContainer = styled(motion.div)`
  background: ${({ theme }) => (theme === "dark" ? "#2a2a2a" : "#ffffff")};
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, #6d4ce3, #f67280);
  }
`;

const OverlayCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => (theme === "dark" ? "#3a3a3a" : "#f0f0f0")};
  opacity: 0.6;

  &.top-right {
    width: 200px;
    height: 200px;
    top: -100px;
    right: -100px;
  }

  &.bottom-left {
    width: 150px;
    height: 150px;
    bottom: -75px;
    left: -75px;
  }
`;

const QuoteText = styled(motion.div)`
  font-size: 1.8rem;
  line-height: 1.5;
  margin: 30px 0;
  font-weight: 500;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#444444")};
  position: relative;
  z-index: 2;
`;

const QuoteAuthor = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => (theme === "dark" ? "#b1b1b1" : "#777777")};
  margin-top: 20px;
`;

const QuoteMark = styled(motion.div)`
  font-size: 4rem;
  color: ${({ theme }) => (theme === "dark" ? "#444444" : "#f0f0f0")};
  position: absolute;

  &.left {
    top: 20px;
    left: 20px;
  }

  &.right {
    bottom: 20px;
    right: 20px;
  }
`;

const RefreshButton = styled(motion.button)`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #6d4ce3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  z-index: 10;
`;

// Random selection of featured quotes
const featuredQuotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey",
  },
];

const FeaturedQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const { theme } = useThemeContext();

  // Change quote automatically every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      changeQuote();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentQuote]);

  const changeQuote = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % featuredQuotes.length);
      setIsChanging(false);
    }, 500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const quoteMarkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  // Splitting text into words for animation
  const words = featuredQuotes[currentQuote].text.split(" ");

  return (
    <Container>
      <TiltEffect maxTilt={3} glare={true} perspective={1500}>
        <FeaturedContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          theme={theme}
        >
          <OverlayCircle className="top-right" theme={theme} />
          <OverlayCircle className="bottom-left" theme={theme} />

          <QuoteMark
            className="left"
            variants={quoteMarkVariants}
            theme={theme}
          >
            <FaQuoteLeft />
          </QuoteMark>

          <AnimatePresence mode="wait">
            <QuoteText key={currentQuote} theme={theme} variants={textVariants}>
              <AnimatePresence mode="wait">
                {!isChanging && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                  >
                    {words.map((word, i) => (
                      <motion.span
                        key={i}
                        style={{ display: "inline-block", marginRight: "10px" }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </QuoteText>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <QuoteAuthor
              key={`author-${currentQuote}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.8, duration: 0.3 },
              }}
              exit={{ opacity: 0, y: -10 }}
              theme={theme}
            >
              — {featuredQuotes[currentQuote].author}
            </QuoteAuthor>
          </AnimatePresence>

          <QuoteMark
            className="right"
            variants={quoteMarkVariants}
            theme={theme}
          >
            <FaQuoteRight />
          </QuoteMark>
        </FeaturedContainer>
      </TiltEffect>

      <RefreshButton
        onClick={changeQuote}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next Quote
      </RefreshButton>
    </Container>
  );
};

export default FeaturedQuote;
