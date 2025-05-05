import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FiX, FiPlus, FiSave, FiArrowLeft } from "react-icons/fi";
import { quoteService } from "../services/api";
import PageTransition from "../components/ui/PageTransition";
import SuccessPage from "../components/SuccessPage";
import { useThemeContext } from "../context/ThemeContext";

const PageContainer = styled(motion.div)`
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  flex: 1;

  @media (max-width: 640px) {
    font-size: 1.8rem;
  }
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FormContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.8rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  transition: ${({ theme }) => theme.transition};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}30`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary}80;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.9rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  font-family: inherit;
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  transition: ${({ theme }) => theme.transition};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}30`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary}80;
  }
`;

const TagInputContainer = styled.div`
  margin-top: 0.5rem;
`;

const TagInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.surface};
  padding: 0.3rem;
  transition: ${({ theme }) => theme.transition};

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}30`};
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.3rem;
`;

const Tag = styled(motion.div)`
  background-color: ${({ theme }) => theme.tagBackground};
  color: ${({ theme }) => theme.tagText};
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.tagText};
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 16px;
  height: 16px;
`;

const TagInput = styled.input`
  flex: 1;
  border: none;
  padding: 0.6rem;
  font-size: 0.9rem;
  background: transparent;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary}80;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
  }
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.primary}40`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const CancelButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.9rem 1.8rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => `${theme.border}30`};
    color: ${({ theme }) => theme.text};
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: ${({ theme }) => theme.error};
  background-color: ${({ theme }) => `${theme.error}15`};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.error};
`;

const FavoriteToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.primary};
  }

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.border};
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SwitchLabel = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const AddTagButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
`;

const AddQuote = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    book: "",
    tags: [],
    favorite: false,
  });
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tagInputRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [savedQuote, setSavedQuote] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      });
      setCurrentTag("");
      if (tagInputRef.current) {
        tagInputRef.current.focus();
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const toggleFavorite = () => {
    setFormData({
      ...formData,
      favorite: !formData.favorite,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!formData.quote || !formData.author) {
      setError("Quote and author are required");
      return;
    }

    setLoading(true);

    try {
      const response = await quoteService.createQuote(formData);

      // Save the quote for the success page
      setSavedQuote({
        text: formData.quote,
        author: formData.author,
        category: formData.tags.length > 0 ? formData.tags[0] : null,
      });

      // Show success view instead of redirecting
      setSuccess(true);
      toast.success("Quote added successfully!");
    } catch (error) {
      console.error("Error adding quote:", error);
      setError(
        error.response?.data?.message ||
          "Failed to add quote. Please try again."
      );
      toast.error("Failed to add quote");
    } finally {
      setLoading(false);
    }
  };

  // If success, display the SuccessPage
  if (success) {
    return <SuccessPage quote={savedQuote} />;
  }

  return (
    <PageTransition>
      <PageContainer>
        <PageHeader>
          <PageTitle>Add New Quote</PageTitle>
          <BackButton
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft /> Back
          </BackButton>
        </PageHeader>

        <FormContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {error && (
            <ErrorMessage
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </ErrorMessage>
          )}

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="quote">Quote</Label>
              <Textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Enter the quote text"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter the author's name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="book">Book/Source</Label>
              <Input
                id="book"
                name="book"
                value={formData.book}
                onChange={handleChange}
                placeholder="Where is this quote from? (optional)"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="tags">Tags</Label>
              <TagInputContainer>
                <TagInputWrapper>
                  <TagList>
                    {formData.tags.map((tag, index) => (
                      <Tag
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        layout
                        theme={theme}
                      >
                        {tag}
                        <TagRemoveButton
                          type="button"
                          onClick={() => removeTag(tag)}
                          theme={theme}
                        >
                          <FiX size={14} />
                        </TagRemoveButton>
                      </Tag>
                    ))}
                  </TagList>
                  <TagInput
                    id="tags"
                    ref={tagInputRef}
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add tags..."
                    theme={theme}
                  />
                  <AddTagButton
                    type="button"
                    onClick={addTag}
                    aria-label="Add tag"
                    theme={theme}
                  >
                    <FiPlus size={18} />
                  </AddTagButton>
                </TagInputWrapper>
              </TagInputContainer>
            </FormGroup>

            <FavoriteToggle>
              <Switch>
                <SwitchInput
                  type="checkbox"
                  checked={formData.favorite}
                  onChange={toggleFavorite}
                  theme={theme}
                />
                <SwitchSlider theme={theme} />
              </Switch>
              <SwitchLabel theme={theme}>Add to favorites</SwitchLabel>
            </FavoriteToggle>

            <FormActions>
              <CancelButton
                type="button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                theme={theme}
              >
                Cancel
              </CancelButton>
              <SubmitButton
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                theme={theme}
              >
                <FiSave size={18} />
                {loading ? "Saving..." : "Save Quote"}
              </SubmitButton>
            </FormActions>
          </form>
        </FormContainer>
      </PageContainer>
    </PageTransition>
  );
};

export default AddQuote;
