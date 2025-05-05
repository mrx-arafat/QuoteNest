import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const AddQuote = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    book: "",
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(false);

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

    // Validate form
    if (!formData.quote || !formData.author) {
      alert("Quote and author are required");
      return;
    }

    setLoading(true);

    // In a real application, you would submit to the API
    // For demonstration, we're just simulating an API call

    try {
      // Mocked successful API call
      console.log("Submitting quote:", formData);

      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success response - redirect to quotes page
      navigate("/my-quotes");

      // Actual API call would look like this:
      /*
      const response = await axios.post('http://localhost:5000/api/quotes', formData);
      if (response.status === 201) {
        navigate('/my-quotes');
      }
      */
    } catch (error) {
      console.error("Error adding quote:", error);
      alert("Failed to add quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Add New Quote</PageTitle>
      <FormContainer>
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

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Quote"}
          </SubmitButton>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default AddQuote;
