import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useThemeContext } from "../../context/ThemeContext";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  opacity: 0.4;
  transition: all 0.5s ease;
`;

const BackgroundSVG = styled.svg`
  width: 100%;
  height: 100%;
  opacity: ${({ theme }) => (theme === "dark" ? 0.15 : 0.08)};
`;

const Circle = styled.circle`
  fill: ${({ theme, color }) =>
    color || (theme === "dark" ? "#ffffff" : "#6d4ce3")};
  opacity: ${({ opacity }) => opacity || 0.5};
`;

const ParallaxBackground = () => {
  const { theme } = useThemeContext();
  const circlesRef = useRef([]);
  const backgroundRef = useRef(null);

  // Generate random circles
  const generateCircles = () => {
    const circles = [];
    const colors = [
      "#6d4ce3",
      "#8a6aff",
      "#f67280",
      "#4caf50",
      "#2196f3",
      "#fb8c00",
    ];

    for (let i = 0; i < 20; i++) {
      const radius = Math.random() * 30 + 5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.5 + 0.1;

      circles.push({
        id: i,
        cx: `${x}%`,
        cy: `${y}%`,
        r: radius,
        color,
        opacity,
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
      });
    }

    return circles;
  };

  useEffect(() => {
    circlesRef.current = generateCircles();

    let rafId;
    const moveCircles = () => {
      if (!backgroundRef.current) return;

      const svgElement = backgroundRef.current;
      const circleElements = svgElement.querySelectorAll("circle");

      circleElements.forEach((circle, index) => {
        const data = circlesRef.current[index];

        // Parse percentage to number
        let x = parseFloat(data.cx);
        let y = parseFloat(data.cy);

        // Move the circle
        x += data.speedX;
        y += data.speedY;

        // Bounce on boundaries
        if (x <= 0 || x >= 100) data.speedX *= -1;
        if (y <= 0 || y >= 100) data.speedY *= -1;

        // Update position
        data.cx = `${x}%`;
        data.cy = `${y}%`;

        // Apply to DOM
        circle.setAttribute("cx", data.cx);
        circle.setAttribute("cy", data.cy);
      });

      rafId = requestAnimationFrame(moveCircles);
    };

    moveCircles();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <BackgroundContainer>
      <BackgroundSVG ref={backgroundRef} theme={theme}>
        {circlesRef.current.map((circle) => (
          <Circle
            key={circle.id}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            color={circle.color}
            opacity={circle.opacity}
            theme={theme}
          />
        ))}
      </BackgroundSVG>
    </BackgroundContainer>
  );
};

export default ParallaxBackground;
