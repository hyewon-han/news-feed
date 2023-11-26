import React from 'react';
import styled, { css } from 'styled-components';
import defaultUser from 'assets/default-user.jpeg';

function Avatar({ src, size, onClick }) {
  return (
    <AvatarFigure size={size}>
      <AvatarImg src={src ?? defaultUser} alt="이미지없음" onClick={onClick} />
    </AvatarFigure>
  );
}

export default Avatar;

const AvatarFigure = styled.figure`
  ${(props) => {
    switch (props.size) {
      case 'large':
        return css`
          width: 90px;
          height: 90px;
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

const AvatarImg = styled.img`
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
      &:hover {
        /* 추가적인 스타일 설정 가능 */
        opacity: 0.8;
      }
    `}
`;
