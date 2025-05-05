import React, { useRef, useState } from "react";
import styled from "styled-components";

const TiltContainer = styled.div`
  transform-style: preserve-3d;
  transform: perspective(1000px);
  transition: transform 0.1s ease-out;
  width: 100%;
  height: 100%;
`;

const TiltEffect = ({
  children,
  maxTilt = 10, // Maximum tilt angle in degrees
  scale = 1.05, // Amount to scale on hover
  speed = 300, // Transition speed in ms
  perspective = 1000, // Perspective value
  disabled = false, // Disable the effect
  className,
  style,
  glare = false, // Enable glare effect
  glareOpacity = 0.3, // Glare opacity
  ...props
}) => {
  const tiltRef = useRef(null);
  const [isTilting, setIsTilting] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (disabled || !tiltRef.current) return;

    const container = tiltRef.current;
    const rect = container.getBoundingClientRect();

    // Calculate mouse position relative to the element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate the tilt angle (from center of element)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Convert to percentage (-50 to 50)
    const percentX = ((x - centerX) / centerX) * 100;
    const percentY = ((y - centerY) / centerY) * 100;

    // Calculate the tilt
    const tiltX = (percentY / 100) * maxTilt;
    const tiltY = -((percentX / 100) * maxTilt);

    // Apply transformation
    container.style.transform = `
      perspective(${perspective}px) 
      rotateX(${tiltX}deg) 
      rotateY(${tiltY}deg)
      scale3d(${isTilting ? scale : 1}, ${isTilting ? scale : 1}, 1)
    `;

    // Update glare position
    if (glare) {
      setGlarePosition({
        x: (percentX + 50) / 100,
        y: (percentY + 50) / 100,
      });
    }
  };

  const handleMouseEnter = () => {
    if (disabled || !tiltRef.current) return;

    setIsTilting(true);
    tiltRef.current.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
  };

  const handleMouseLeave = () => {
    if (disabled || !tiltRef.current) return;

    setIsTilting(false);

    // Reset to default
    tiltRef.current.style.transform = `
      perspective(${perspective}px) 
      rotateX(0deg) 
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  };

  return (
    <TiltContainer
      ref={tiltRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: `perspective(${perspective}px)`,
        transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      }}
      {...props}
    >
      {children}

      {glare && isTilting && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            borderRadius: "inherit",
            background: `radial-gradient(
              circle at 
              ${glarePosition.x * 100}% ${glarePosition.y * 100}%, 
              rgba(255, 255, 255, ${glareOpacity}), 
              transparent 80%
            )`,
            zIndex: 9,
          }}
        />
      )}
    </TiltContainer>
  );
};

export default TiltEffect;
