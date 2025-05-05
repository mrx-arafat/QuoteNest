import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const QuoteText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1.5rem;
  font-style: italic;

  &::before {
    content: '"';
    position: absolute;
    left: 0;
    top: 0;
    font-size: 2rem;
    color: #6d4ce3;
    font-family: Georgia, serif;
  }
`;

const QuoteInfo = styled.div`
  margin-top: 1rem;
`;

const AuthorBook = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #555;
  margin-right: 0.5rem;
`;

const InfoValue = styled.span`
  color: #333;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const Tag = styled.span`
  background-color: #f0f0ff;
  color: #6d4ce3;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const QuoteCard = ({ quote, author, book, tags }) => {
  return (
    <Card>
      <QuoteText>{quote}</QuoteText>
      <QuoteInfo>
        <AuthorBook>
          <div>
            <InfoLabel>Author:</InfoLabel>
            <InfoValue>{author}</InfoValue>
          </div>
          <div>
            <InfoLabel>Book:</InfoLabel>
            <InfoValue>{book}</InfoValue>
          </div>
        </AuthorBook>

        {tags && tags.length > 0 && (
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
      </QuoteInfo>
    </Card>
  );
};

export default QuoteCard;
