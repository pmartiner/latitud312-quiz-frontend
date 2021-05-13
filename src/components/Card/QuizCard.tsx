// Bibliotecas
import React, { FC } from 'react';
import styled from 'styled-components';

// Tipos
import { ChildrenProps } from 'types/index';

// Colores
import { ACCENT_COLOR_DARK } from 'components/layout/const';

const CardWrapper = styled.div`
  background-color: white;
  border: 7px solid ${ACCENT_COLOR_DARK};
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  max-height: 75vh;
  max-width: 60vw;
  overflow: auto;
  position: relative;

  @media screen and (max-width: 768px) {
    max-height: 90%;
    max-width: 90vw;
  }
`;

const QuizCard: FC<ChildrenProps> = (props: ChildrenProps) => {
  return(
    <CardWrapper>
      {props.children}
    </CardWrapper>
  );
};

export default QuizCard;