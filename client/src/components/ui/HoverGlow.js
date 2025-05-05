import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const GlowContainer = styled(motion.div)`
  position: relative;
  overflow: visible;
  cursor: pointer;
  z-index: 1;
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  border-radius: inherit;
  filter: blur(15px);
  opacity: 0;
  background: ${({ color }) => color || "rgba(109, 76, 227, 0.5)"};
  transition: opacity 0.3s ease;
  transform: scale(1.05);
  pointer-events: none;
`;

const HoverGlow = ({
  children,
  color = "rgba(109, 76, 227, 0.5)",
  glowOnHover = true,
  glowOnClick = false,
  glowIntensity = 0.7,
  glowScale = 1.15,
  glowDuration = 1,
  className,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (glowOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (glowOnHover) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (glowOnClick) {
      setIsClicked(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a timeout to remove the glow effect after duration
      timeoutRef.current = setTimeout(() => {
        setIsClicked(false);
      }, glowDuration * 1000);
    }
  };

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showGlow = isHovered || isClicked;

  return (
    <GlowContainer
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {children}
      <GlowEffect
        color={color}
        animate={{
          opacity: showGlow ? glowIntensity : 0,
          scale: showGlow ? glowScale : 1.05,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />
    </GlowContainer>
  );
};

export default HoverGlow;
