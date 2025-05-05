import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { quoteService } from "../services/api";

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const FormContainer = styled.div`
  max-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #6d4ce3;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #6d4ce3;
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.div`
  background-color: #f0f0ff;
  color: #6d4ce3;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #6d4ce3;
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

const SubmitButton = styled.button`
  background-color: #6d4ce3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #5a3dd1;
  }

  &:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fdecea;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const AddQuote = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, currentTag.trim()],
        });
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
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
      await quoteService.createQuote(formData);
      navigate("/my-quotes");
    } catch (error) {
      console.error("Error adding quote:", error);
      setError("Failed to add quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Add New Quote</PageTitle>
      <FormContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}

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
            <Input
              id="tags"
              name="tags"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type and press Enter to add tags"
            />

            <TagInput>
              {formData.tags.map((tag, index) => (
                <Tag key={index}>
                  {tag}
                  <TagRemoveButton type="button" onClick={() => removeTag(tag)}>
                    ×
                  </TagRemoveButton>
                </Tag>
              ))}
            </TagInput>
          </FormGroup>

          <FormGroup>
            <Label>
              <input
                type="checkbox"
                name="favorite"
                checked={formData.favorite}
                onChange={(e) =>
                  setFormData({ ...formData, favorite: e.target.checked })
                }
              />{" "}
              Add to Favorites
            </Label>
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Quote"}
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default AddQuote;
