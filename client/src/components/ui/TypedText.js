import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TypedTextContainer = styled(motion.div)`
  display: inline-block;
  position: relative;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 3px;
  height: 1em;
  background-color: ${({ theme, color }) =>
    color || (theme === "dark" ? "#fff" : "#333")};
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 1s infinite;
  opacity: ${({ isTyping }) => (isTyping ? 1 : 0.7)};

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const TypedText = ({
  text,
  typingSpeed = 70,
  deletingSpeed = 50,
  delayBeforeDelete = 2000,
  delayBeforeTyping = 500,
  onComplete,
  loop = true,
  className,
  style,
  showCursor = true,
  cursorColor,
  theme,
  children,
  startDelay = 0,
  multiText = [],
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // Determine which text to use - either multiText array or single text
  const activeText = multiText.length > 0 ? multiText[textIndex] : text;

  useEffect(() => {
    // Initial delay before starting
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;

    let timeout;

    // Handle typing animation
    if (!isDeleting && displayText.length < activeText.length) {
      timeout = setTimeout(() => {
        setIsTyping(true);
        setDisplayText(activeText.slice(0, displayText.length + 1));
      }, typingSpeed);
    }
    // Handle complete text
    else if (!isDeleting && displayText.length === activeText.length) {
      timeout = setTimeout(() => {
        setIsTyping(false);
        setIsDeleting(true);
      }, delayBeforeDelete);
    }
    // Handle deleting animation
    else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setIsTyping(true);
        setDisplayText(displayText.slice(0, displayText.length - 1));
      }, deletingSpeed);
    }
    // Handle completely deleted text
    else if (isDeleting && displayText.length === 0) {
      setIsTyping(false);
      setIsDeleting(false);

      if (multiText.length > 0) {
        // Move to next text in array
        timeout = setTimeout(() => {
          setTextIndex((prevIndex) => (prevIndex + 1) % multiText.length);
        }, delayBeforeTyping);
      } else if (loop) {
        // Restart the same text if looping
        timeout = setTimeout(() => {}, delayBeforeTyping);
      } else if (onComplete) {
        // Call completion callback
        onComplete();
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    activeText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    delayBeforeDelete,
    delayBeforeTyping,
    loop,
    onComplete,
    multiText,
    textIndex,
    isStarted,
  ]);

  return (
    <TypedTextContainer className={className} style={style}>
      {children || displayText}
      {showCursor && (
        <Cursor theme={theme} color={cursorColor} isTyping={isTyping} />
      )}
    </TypedTextContainer>
  );
};

export default TypedText;
