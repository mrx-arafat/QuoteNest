import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiHeart, FiShare2, FiMoreHorizontal, FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 1.8rem;
  margin-bottom: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    box-shadow: ${({ theme }) => theme.cardHover};
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const QuoteText = styled.p`
  font-size: 1.3rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1.8rem;
  color: ${({ theme }) => theme.text};
  font-style: italic;
  font-weight: 500;

  &::before {
    content: '"';
    position: absolute;
    left: 0;
    top: 0;
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary};
    font-family: Georgia, serif;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.6;
    padding-left: 1.5rem;
  }
`;

const QuoteInfo = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => `${theme.border}80`};
  padding-top: 1rem;
`;

const AuthorBook = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 0.3rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  margin-right: 0.5rem;
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagText};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: ${({ theme }) => theme.transition};
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const QuoteActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => `${theme.border}40`};
    color: ${({ theme }) => theme.primary};
  }

  &.favorite {
    color: ${({ theme, isFavorite }) =>
      isFavorite ? theme.error : theme.textSecondary};
  }

  &.favorite:hover {
    background-color: ${({ theme }) => `${theme.error}10`};
  }
`;

const QuoteCard = ({
  quote,
  author,
  book,
  tags,
  favorite,
  onToggleFavorite,
  id,
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleFavoriteClick = () => {
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
    setIsFavorite(!isFavorite);
    toast.success(
      `Quote ${!isFavorite ? "added to" : "removed from"} favorites`
    );
  };

  const handleCopyClick = () => {
    const textToCopy = `"${quote}" - ${author}${book ? ` (${book})` : ""}`;
    navigator.clipboard.writeText(textToCopy);
    toast.info("Quote copied to clipboard");
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Quote by ${author}`,
          text: `"${quote}" - ${author}${book ? ` (${book})` : ""}`,
          url: window.location.href,
        })
        .then(() => toast.info("Quote shared"))
        .catch(() => toast.error("Unable to share"));
    } else {
      handleCopyClick();
    }
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <QuoteText>{quote}</QuoteText>
      <QuoteInfo>
        <AuthorBook>
          <InfoRow>
            <InfoLabel>Author:</InfoLabel>
            <InfoValue>{author}</InfoValue>
          </InfoRow>
          {book && (
            <InfoRow>
              <InfoLabel>Book:</InfoLabel>
              <InfoValue>{book}</InfoValue>
            </InfoRow>
          )}
        </AuthorBook>

        {tags && tags.length > 0 && (
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}

        <QuoteActions>
          <ActionButton
            whileTap={{ scale: 0.9 }}
            onClick={handleCopyClick}
            aria-label="Copy quote"
          >
            <FiCopy size={18} />
          </ActionButton>
          <ActionButton
            whileTap={{ scale: 0.9 }}
            onClick={handleShareClick}
            aria-label="Share quote"
          >
            <FiShare2 size={18} />
          </ActionButton>
          <ActionButton
            className="favorite"
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            isFavorite={isFavorite}
          >
            <FiHeart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </ActionButton>
          <ActionButton whileTap={{ scale: 0.9 }} aria-label="More options">
            <FiMoreHorizontal size={18} />
          </ActionButton>
        </QuoteActions>
      </QuoteInfo>
    </Card>
  );
};

export default QuoteCard;
