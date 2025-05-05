import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import Confetti from "./ui/Confetti";
import TiltEffect from "./ui/TiltEffect";
import { useThemeContext } from "../context/ThemeContext";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const SuccessCard = styled(motion.div)`
  background: ${({ theme }) => (theme === "dark" ? "#2a2a2a" : "#ffffff")};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 10;
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #6d4ce3;
  color: white;
  font-size: 2rem;
  margin: 0 auto 20px;
`;

const Title = styled(motion.h1)`
  margin: 20px 0;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
  font-size: 2rem;
`;

const Message = styled(motion.p)`
  color: ${({ theme }) => (theme === "dark" ? "#b1b1b1" : "#666666")};
  line-height: 1.6;
  margin-bottom: 30px;
  font-size: 1.1rem;
`;

const Button = styled(motion.button)`
  background: #6d4ce3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #5a3dd1;
  }
`;

const Quote = styled(motion.div)`
  margin: 30px 0;
  padding: 20px;
  border-left: 4px solid #6d4ce3;
  background: ${({ theme }) => (theme === "dark" ? "#3a3a3a" : "#f7f7f7")};
  border-radius: 8px;
  font-style: italic;
  color: ${({ theme }) => (theme === "dark" ? "#e1e1e1" : "#444444")};
`;

const SuccessPage = ({ quote }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  useEffect(() => {
    // Trigger confetti after component mounts
    setShowConfetti(true);
  }, []);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Container variants={containerVariants} initial="initial" animate="animate">
      <Confetti
        active={showConfetti}
        duration={5000}
        onComplete={() => setShowConfetti(false)}
      />

      <TiltEffect maxTilt={5} glare={true}>
        <SuccessCard theme={theme}>
          <IconWrapper
            variants={itemVariants}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <FaCheck />
          </IconWrapper>

          <Title variants={itemVariants} theme={theme}>
            Quote Added Successfully!
          </Title>

          <Message variants={itemVariants} theme={theme}>
            Your quote has been added to our collection. Thank you for
            contributing to QuoteNest!
          </Message>

          {quote && (
            <Quote variants={itemVariants} theme={theme}>
              "{quote.text}"
              <br />— {quote.author || "Anonymous"}
            </Quote>
          )}

          <Button
            variants={itemVariants}
            onClick={handleNavigate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Quotes <FaArrowRight />
          </Button>
        </SuccessCard>
      </TiltEffect>
    </Container>
  );
};

export default SuccessPage;
