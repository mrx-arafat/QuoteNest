import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Hero = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #6d4ce3;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: #5a3dd1;
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 1rem;
  background-color: #f5f5f5;
`;

const FeatureTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #6d4ce3;
`;

const FeatureCardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
`;

const Home = () => {
  return (
    <>
      <Hero>
        <Title>Your Personal Quote Journal</Title>
        <Subtitle>
          Collect, organize, and reflect on your favorite quotes
        </Subtitle>
        <ButtonContainer>
          <PrimaryButton to="/my-quotes">View My Quotes</PrimaryButton>
          <PrimaryButton to="/add-quote">Add New Quote</PrimaryButton>
        </ButtonContainer>
      </Hero>

      <FeaturesSection>
        <FeatureTitle>Why Use QuoteNest?</FeatureTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>📚</FeatureIcon>
            <FeatureCardTitle>Collect Quotes</FeatureCardTitle>
            <FeatureDescription>
              Save your favorite quotes from books, articles, speeches and more.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🏷️</FeatureIcon>
            <FeatureCardTitle>Organize with Tags</FeatureCardTitle>
            <FeatureDescription>
              Add tags to your quotes to easily find them by theme or topic.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureCardTitle>Search & Filter</FeatureCardTitle>
            <FeatureDescription>
              Quickly find the exact quote you're looking for with powerful
              search features.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </>
  );
};

export default Home;
