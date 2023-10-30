import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import NavBar from "../../Home/NavBar";
import './style.css';


const Header = () => {
  return (
    <MainHeader>
      <NavLink className='navLink-blog' to="/">
        <img src="/assets/images/logo.svg" alt="logo" className="logo" />
      </NavLink>
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  background-color: ${({ theme }) => theme.colors.bg};
  
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin:auto;
    max-width:100%;
    height: auto;
    max-width: 20%;
  }
`;

export default Header;