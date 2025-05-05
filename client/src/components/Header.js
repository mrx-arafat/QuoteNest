import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.headerShadow};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: ${({ theme }) => theme.transition};

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-right: 2rem;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const LogoText = styled.span`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const ApiStatus = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme, connected }) =>
    connected ? `${theme.success}20` : `${theme.error}20`};
  padding: 0.3rem 0.6rem;
  border-radius: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, connected }) =>
    connected ? theme.success : theme.error};
  box-shadow: 0 0 0 2px
    ${({ theme, connected }) =>
      connected ? `${theme.success}30` : `${theme.error}30`};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Tab = styled(Link)`
  padding: 0.5rem 1rem;
  color: ${({ theme, active }) => (active ? theme.primary : theme.text)};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  border-bottom: ${({ theme, active }) =>
    active ? `2px solid ${theme.primary}` : "none"};
  margin-right: 0.5rem;
  text-decoration: none;
  position: relative;
  transition: ${({ theme }) => theme.transition};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &:hover::after {
    transform: ${({ active }) => (active ? "scaleX(0)" : "scaleX(1)")};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.tagBackground};
    transform: rotate(15deg);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  max-width: 300px;
  height: 100vh;
  background-color: ${({ theme }) => theme.surface};
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileMenuClose = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
`;

const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileMenuItem = styled(Link)`
  padding: 0.8rem;
  color: ${({ theme, active }) => (active ? theme.primary : theme.text)};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  text-decoration: none;
  border-radius: 8px;
  transition: ${({ theme }) => theme.transition};
  background-color: ${({ theme, active }) =>
    active ? `${theme.primary}15` : "transparent"};

  &:hover {
    background-color: ${({ theme }) => `${theme.primary}10`};
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Header = () => {
  const location = useLocation();
  const [apiConnected, setApiConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Check API connection
    const checkApiConnection = async () => {
      try {
        const response = await axios.get("http://localhost:5000");
        setApiConnected(response.status === 200);
      } catch (error) {
        setApiConnected(false);
      }
    };

    // Check connection when component mounts
    checkApiConnection();

    // Set up interval to check connection status
    const interval = setInterval(checkApiConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo to="/">
          <LogoText>QuoteNest</LogoText>
        </Logo>
      </LogoContainer>

      <Nav className="desktop-nav">
        <TabsContainer>
          <Tab to="/" active={location.pathname === "/" ? "true" : undefined}>
            Home
          </Tab>
          <Tab
            to="/my-quotes"
            active={location.pathname === "/my-quotes" ? "true" : undefined}
          >
            My Quotes
          </Tab>
          <Tab
            to="/add-quote"
            active={location.pathname === "/add-quote" ? "true" : undefined}
          >
            Add New Quote
          </Tab>
        </TabsContainer>
      </Nav>

      <RightSection>
        <ApiStatus connected={apiConnected}>
          <StatusDot connected={apiConnected} />
          {apiConnected ? "API Connected" : "API Disconnected"}
        </ApiStatus>

        <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </ThemeToggle>

        <MobileMenuButton
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </MobileMenuButton>
      </RightSection>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <MobileOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <MobileMenuHeader>
                <Logo to="/">QuoteNest</Logo>
                <MobileMenuClose onClick={() => setMobileMenuOpen(false)}>
                  <FiX size={24} />
                </MobileMenuClose>
              </MobileMenuHeader>
              <MobileMenuItems>
                <MobileMenuItem
                  to="/"
                  active={location.pathname === "/" ? "true" : undefined}
                >
                  Home
                </MobileMenuItem>
                <MobileMenuItem
                  to="/my-quotes"
                  active={
                    location.pathname === "/my-quotes" ? "true" : undefined
                  }
                >
                  My Quotes
                </MobileMenuItem>
                <MobileMenuItem
                  to="/add-quote"
                  active={
                    location.pathname === "/add-quote" ? "true" : undefined
                  }
                >
                  Add New Quote
                </MobileMenuItem>
              </MobileMenuItems>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
