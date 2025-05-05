import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Check local storage for saved theme preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Update local storage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Update body background color
    document.body.style.backgroundColor =
      theme === "light" ? lightTheme.background : darkTheme.background;

    // Add transition to body for smooth background color transition
    document.body.style.transition = "background-color 0.3s ease";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
