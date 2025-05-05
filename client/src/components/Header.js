import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e1e1e1;
  background-color: #ffffff;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #6d4ce3;
  margin-right: 2rem;
`;

const ApiStatus = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  gap: 0.5rem;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #4caf50;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const Tab = styled(Link)`
  padding: 0.5rem 1rem;
  color: ${(props) => (props.active ? "#6d4ce3" : "#333")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-bottom: ${(props) => (props.active ? "2px solid #6d4ce3" : "none")};
  margin-right: 0.5rem;

  &:hover {
    color: #6d4ce3;
  }
`;

const Header = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">QuoteNest</Logo>
        <TabsContainer>
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

      <ApiStatus>
        <StatusDot />
        API Connected
      </ApiStatus>
    </HeaderContainer>
  );
};

export default Header;
