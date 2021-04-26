// Bibliotecas
import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

// Colores
import { ACCENT_COLOR_DARK, PRIMARY_COLOR } from 'components/layout/const';

const ButtonComponent = styled.button`
  background-color: ${ACCENT_COLOR_DARK};
  border: 3px solid ${ACCENT_COLOR_DARK};
  border-radius: 6px;
  cursor: pointer;
  padding: 10px 25px;
  min-width: 30px;
  max-width: 250px;
  color: white;
  font-size: 14px;
  transition: all .3s;

  :hover, :active {
    background-color: ${PRIMARY_COLOR};
    border-color: ${PRIMARY_COLOR};
  }

  :focus {
    background-color: ${PRIMARY_COLOR};
    border-color: ${ACCENT_COLOR_DARK};
  }
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ type = 'button', ...props }: Props) => (
  <ButtonComponent type={type} {...props}>
    {props.children}
  </ButtonComponent>
);

export default Button;
