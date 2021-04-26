// Bibliotecas
import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

// Colores
import { ACCENT_COLOR_LIGHT } from 'components/layout/const';

const RadioGroup = styled.input`
  &[type="radio"]:checked,
  &[type="radio"]:not(:checked) {
      position: absolute;
      opacity: 0;
  }

  &[type="radio"]:checked + label,
  &[type="radio"]:not(:checked) + label
  {
      position: relative;
      padding-left: 28px;
      cursor: pointer;
      line-height: 20px;
      display: inline-block;
      color: #666;
  }
  &[type="radio"]:checked + label:before,
  &[type="radio"]:not(:checked) + label:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      border: 2px solid #ccc;
      border-radius: 100%;
      background: #fff;
      transition: all 0.3s ease;
  }
  &[type="radio"]:checked + label:after,
  &[type="radio"]:not(:checked) + label:after {
      content: '';
      width: 12px;
      height: 12px;
      background: ${ACCENT_COLOR_LIGHT};
      position: absolute;
      top: 5px;
      left: 5px;
      border-radius: 100%;
      transition: all 0.3s ease;
  }
  &[type="radio"]:checked + label:hover:before,
  &[type="radio"]:not(:checked) + label:hover:before {
      border-color: #ccc;
      background: #ccc;
      transition: all 0.3s ease;
  }
  &[type="radio"]:not(:checked) + label:after {
      opacity: 0;
      transform: scale(0);
  }
  &[type="radio"]:checked + label:after {
      opacity: 1;
      transform: scale(1);
  }
`;

type Props = InputHTMLAttributes<HTMLInputElement>;

const RadioButton: FC<Props> = (props: Props) => {
  return(
    <RadioGroup {...props} type='radio' />
  );
};

export default RadioButton;