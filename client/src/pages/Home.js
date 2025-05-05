import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBookOpen, FaTag, FaSearch, FaRocket } from "react-icons/fa";
import PageTransition from "../components/ui/PageTransition";
import ScrollReveal from "../components/ui/ScrollReveal";
import FeaturedQuote from "../components/FeaturedQuote";
import TypedText from "../components/ui/TypedText";
import HoverGlow from "../components/ui/HoverGlow";
import { childVariants } from "../components/ui/PageTransition";
import { useThemeContext } from "../context/ThemeContext";

const Hero = styled(motion.div)`
  text-align: center;
  padding: 4rem 1rem;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
  margin-bottom: 1rem;

  span {
    background: linear-gradient(90deg, #6d4ce3, #f67280);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${({ theme }) => (theme === "dark" ? "#b1b1b1" : "#666666")};
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const TypedTextContainer = styled(motion.div)`
  font-size: 1.4rem;
  margin-bottom: 3rem;
  min-height: 2rem;
  color: ${({ theme }) => (theme === "dark" ? "#e1e1e1" : "#555555")};

  span.highlight {
    color: #6d4ce3;
    font-weight: bold;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 3rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 90%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const PrimaryButton = styled(motion(Link))`
  display: inline-block;
  padding: 0.9rem 1.8rem;
  background-color: #6d4ce3;
  color: white;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(109, 76, 227, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, #5a3dd1, #f67280);
    transition: all 0.5s ease;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(109, 76, 227, 0.4);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  border: 2px solid #6d4ce3;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#6d4ce3")};
  box-shadow: none;

  &::before {
    background: #6d4ce3;
  }

  &:hover {
    color: white;
  }
`;

const FeaturesSection = styled(motion.section)`
  padding: 5rem 1rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#1a1a1a" : "#f7f7f7"};
  border-radius: 50px 50px 0 0;
  margin-top: 2rem;
`;

const FeatureTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3.5rem;
  position: relative;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #6d4ce3, #f67280);
    border-radius: 2px;
  }
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background-color: ${({ theme }) =>
    theme === "dark" ? "#2a2a2a" : "#ffffff"};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #6d4ce3;
  background: ${({ theme }) => (theme === "dark" ? "#3a3a3a" : "#f0f0f0")};
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureCardTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => (theme === "dark" ? "#b1b1b1" : "#666666")};
  line-height: 1.6;
`;

const Home = () => {
  const { theme } = useThemeContext();

  // Array of texts for the typing animation
  const typedTexts = [
    "Capture wisdom from your favorite books.",
    "Save inspiration from memorable speeches.",
    "Collect insights that changed your perspective.",
    "Build your personal library of life wisdom.",
  ];

  return (
    <PageTransition>
      <Hero>
        <motion.div variants={childVariants}>
          <Title theme={theme}>
            Your Personal <span>Quote Journal</span>
          </Title>
        </motion.div>

        <motion.div variants={childVariants}>
          <Subtitle theme={theme}>
            Collect, organize, and reflect on your favorite quotes from books,
            speeches, and inspiring moments that resonate with you.
          </Subtitle>
        </motion.div>

        <motion.div variants={childVariants}>
          <TypedTextContainer theme={theme}>
            <TypedText
              multiText={typedTexts}
              theme={theme}
              typingSpeed={50}
              deletingSpeed={30}
              delayBeforeDelete={2000}
            />
          </TypedTextContainer>
        </motion.div>

        <ButtonContainer variants={childVariants}>
          <HoverGlow color="rgba(109, 76, 227, 0.6)" glowOnHover={true}>
            <PrimaryButton
              to="/add-quote"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New Quote
            </PrimaryButton>
          </HoverGlow>

          <HoverGlow color="rgba(109, 76, 227, 0.3)" glowOnHover={true}>
            <SecondaryButton
              to="/my-quotes"
              theme={theme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Quotes
            </SecondaryButton>
          </HoverGlow>
        </ButtonContainer>

        <FeaturedQuote />
      </Hero>

      <FeaturesSection theme={theme}>
        <ScrollReveal>
          <FeatureTitle theme={theme}>Why Use QuoteNest?</FeatureTitle>
        </ScrollReveal>

        <FeaturesGrid>
          <ScrollReveal direction="up" delay={0.1}>
            <FeatureCard theme={theme}>
              <FeatureIcon theme={theme}>
                <FaBookOpen />
              </FeatureIcon>
              <FeatureCardTitle theme={theme}>Collect Quotes</FeatureCardTitle>
              <FeatureDescription theme={theme}>
                Save your favorite quotes from books, articles, speeches and
                more in one beautiful place.
              </FeatureDescription>
            </FeatureCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <FeatureCard theme={theme}>
              <FeatureIcon theme={theme}>
                <FaTag />
              </FeatureIcon>
              <FeatureCardTitle theme={theme}>
                Organize with Categories
              </FeatureCardTitle>
              <FeatureDescription theme={theme}>
                Add categories to your quotes to easily find them by theme or
                topic when you need inspiration.
              </FeatureDescription>
            </FeatureCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <FeatureCard theme={theme}>
              <FeatureIcon theme={theme}>
                <FaSearch />
              </FeatureIcon>
              <FeatureCardTitle theme={theme}>Search & Filter</FeatureCardTitle>
              <FeatureDescription theme={theme}>
                Quickly find the exact quote you're looking for with powerful
                search and filtering features.
              </FeatureDescription>
            </FeatureCard>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <FeatureCard theme={theme}>
              <FeatureIcon theme={theme}>
                <FaRocket />
              </FeatureIcon>
              <FeatureCardTitle theme={theme}>
                Beautiful Experience
              </FeatureCardTitle>
              <FeatureDescription theme={theme}>
                Enjoy a visually stunning and interactive interface designed to
                make your quote collection a joy to explore.
              </FeatureDescription>
            </FeatureCard>
          </ScrollReveal>
        </FeaturesGrid>
      </FeaturesSection>
    </PageTransition>
  );
};

export default Home;
