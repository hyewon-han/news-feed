import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/Theme';

function Button({ value, onClick, color, size, children }) {
  return <StBtn onClick={onClick}>{children}</StBtn>;
}

export default Button;

const StBtn = styled.button`
  height: 50px;
  width: 100px;
  border: none;
  transition: all 0.2s ease-in-out;
  ${(props) => {
    switch (props.color) {
      case 'yellow':
        return css`
          background-color: ${theme.color.yellow};
        `;
      default:
        return css`
          background-color: ${theme.color.blue};
          color: white;
        `;
    }
  }}
  ${(props) => {
    switch (props.size) {
      case 'large':
        return css`
          height: 50px;
          width: 100px;
        `;
      default:
        return css`
          height: 40px;
          width: 70px;
        `;
    }
  }}
  padding: 10px;
  border-radius: 10px;
  font-size: 18px;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
`;
