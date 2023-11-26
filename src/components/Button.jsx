import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/Theme';

function Button({ onClick, color, size, children }) {
  return (
    <StBtn onClick={onClick} color={color} size={size}>
      {children}
    </StBtn>
  );
}

export default Button;

const StBtn = styled.button`
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
          min-width: 100px;
          max-width: 200px;
        `;
      case 'small':
        return css`
          height: 35px;
          min-width: 50px;
          max-width: 100px;
        `;
      default:
        return css`
          height: 40px;
          min-width: 70px;
          max-width: 120px;
        `;
    }
  }}
  border: none;
  transition: all 0.2s ease-in-out;
  padding: 10px;
  border-radius: 10px;
  font-size: ${theme.fontSize.base};

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
`;
