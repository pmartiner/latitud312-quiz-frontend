// Bibliotecas
import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

// Colores
import { ACCENT_COLOR_DARK, PRIMARY_COLOR } from 'components/layout/const';

const ButtonComponent = styled.button`
  background-color: ${props => props.disabled ? '#757575' : ACCENT_COLOR_DARK};
  border: 3px solid ${props => props.disabled ? '#757575' : ACCENT_COLOR_DARK};;
  border-radius: 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 10px 25px;
  min-width: 30px;
  max-width: 250px;
  color: white;
  font-size: 18px;
  transition: all .3s;

  :hover, :active {
    background-color: ${props => props.disabled ? '#757575' : PRIMARY_COLOR};
    border-color: ${props => props.disabled ? '#757575' : PRIMARY_COLOR};
  }

  :focus {
    background-color: ${props => props.disabled ? '#757575' : PRIMARY_COLOR};
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
