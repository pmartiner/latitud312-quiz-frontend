// Bibliotecas
import React, { FC, AnchorHTMLAttributes } from 'react';
import styled from 'styled-components';

// Colores
import { ACCENT_COLOR_DARK, PRIMARY_COLOR } from 'components/layout/const';

type AnchorProps = {
  disabled?: boolean;
}

const LinkButtonComponent = styled.a<AnchorProps>`
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

type Props = AnchorProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkButton: FC<Props> = (props: Props) => (
  <LinkButtonComponent {...props}>
    {props.children}
  </LinkButtonComponent>
);

export default LinkButton;
