import React from 'react'
import './style.css'
import styled from "styled-components";



const Wrapper = styled.section`
  padding: 9rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .btn {
    font-size: 1.8rem;
    margin-top: 3rem;
  }
`;
export const PageNotFound = () => {
  return <Wrapper>
    <img src="/assets/images/error/error404.svg" alt="Error 404" />
  </Wrapper>
}


export default PageNotFound; 
