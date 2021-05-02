// Bibliotecas
import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

// Colores
import { ACCENT_COLOR_DARK, ACCENT_COLOR_LIGHT } from 'components/layout/const';

// Íconos
import leftChevron from 'src/assets/icons/left-chevron.svg';

const ButtonComponent = styled.button`
  background-color: white;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  padding: 10px 0;
  min-width: 30px;
  max-width: 250px;
  color: ${ACCENT_COLOR_DARK};
  font-size: 18px;
  transition: background-color .3s;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;

  :hover, :active {
    background-color: ${ACCENT_COLOR_LIGHT}60;
  }

  :focus {
    background-color: ${ACCENT_COLOR_LIGHT}60;
  }
`;

const LeftChevronImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
  transition: all .3s;

  :hover, :active {
    margin-right: 10px;
  }
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ type = 'button', ...props }: Props) => (
  <ButtonComponent type={type} {...props}>
    <LeftChevronImg src={leftChevron} alt='Flecha izquierda' />
    {props.children}
  </ButtonComponent>
);

export default Button;
