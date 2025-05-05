import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaQuoteRight,
  FaHeart,
  FaEdit,
  FaTrash,
  FaShare,
} from "react-icons/fa";
import { useThemeContext } from "../../context/ThemeContext";

const Card = styled(motion.div)`
  background: ${({ theme }) => (theme === "dark" ? "#2a2a2a" : "#ffffff")};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: #6d4ce3;
    border-radius: 4px 0 0 4px;
  }
`;

const QuoteContent = styled.div`
  padding: 20px 10px;
  position: relative;
`;

const QuoteText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 15px 0;
  color: ${({ theme }) => (theme === "dark" ? "#e1e1e1" : "#444")};
`;

const QuoteAuthor = styled.p`
  font-weight: 500;
  margin-top: 15px;
  text-align: right;
  color: ${({ theme }) => (theme === "dark" ? "#b1b1b1" : "#666")};
`;

const QuoteCategory = styled.span`
  display: inline-block;
  background: ${({ theme }) => (theme === "dark" ? "#3a3a3a" : "#f5f5f5")};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-top: 10px;
  color: ${({ theme }) => (theme === "dark" ? "#c1c1c1" : "#666")};
`;

const QuoteIcon = styled.div`
  position: absolute;
  font-size: 1.2rem;
  color: #6d4ce3;
  opacity: 0.5;

  &.left {
    top: 10px;
    left: 5px;
  }

  &.right {
    bottom: 10px;
    right: 5px;
  }
`;

const ActionBar = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled(motion.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme, liked }) =>
    liked ? "#e74c3c" : theme === "dark" ? "#b1b1b1" : "#666"};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const AnimatedQuoteCard = ({ quote, onEdit, onDelete, onShare }) => {
  const { theme } = useThemeContext();
  const [liked, setLiked] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const cardVariants = {
    initial: { scale: 0.96, opacity: 0, y: 20 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    tap: { scale: 0.98 },
    hover: {
      scale: 1.02,
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 },
    },
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  // Handle double click to flip card
  const handleCardDoubleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      initial="initial"
      animate="animate"
      whileTap="tap"
      whileHover="hover"
      variants={cardVariants}
      theme={theme}
      onDoubleClick={handleCardDoubleClick}
      layout
      style={{ perspective: "1000px" }}
    >
      <motion.div
        variants={flipVariants}
        animate={isFlipped ? "back" : "front"}
        style={{
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        <QuoteContent>
          <QuoteIcon className="left">
            <FaQuoteLeft />
          </QuoteIcon>

          <QuoteText theme={theme}>{quote.text}</QuoteText>

          <QuoteAuthor theme={theme}>
            — {quote.author || "Anonymous"}
          </QuoteAuthor>

          {quote.category && (
            <QuoteCategory theme={theme}>{quote.category}</QuoteCategory>
          )}

          <QuoteIcon className="right">
            <FaQuoteRight />
          </QuoteIcon>
        </QuoteContent>

        <ActionBar
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ActionButton
            theme={theme}
            liked={liked}
            onClick={toggleLike}
            whileTap={{ scale: 1.3 }}
          >
            <FaHeart />
          </ActionButton>

          <ActionButton
            theme={theme}
            onClick={onEdit}
            whileHover={{ scale: 1.1 }}
          >
            <FaEdit />
          </ActionButton>

          <ActionButton
            theme={theme}
            onClick={onDelete}
            whileHover={{ scale: 1.1 }}
          >
            <FaTrash />
          </ActionButton>

          <ActionButton
            theme={theme}
            onClick={onShare}
            whileHover={{ scale: 1.1 }}
          >
            <FaShare />
          </ActionButton>
        </ActionBar>
      </motion.div>
    </Card>
  );
};

export default AnimatedQuoteCard;
