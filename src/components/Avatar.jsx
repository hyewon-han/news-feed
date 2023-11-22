import React from 'react';
import styled, { css } from 'styled-components';
import defaultUser from 'assets/default-img.jpeg';

function Avatar({ src, size, onClick }) {
  return (
    <AvatarFigure size={size}>
      <img src={src ?? defaultUser} alt="이미지없음" onClick={onClick} />
    </AvatarFigure>
  );
}

export default Avatar;

const AvatarFigure = styled.figure`
  ${(props) => {
    switch (props.size) {
      case 'large':
        return css`
          width: 75px;
          height: 75px;
        `;
      default:
        return css`
          width: 50px;
          height: 50px;
        `;
    }
  }}

  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
