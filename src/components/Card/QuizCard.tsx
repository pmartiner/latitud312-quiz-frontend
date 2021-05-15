// Bibliotecas
import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

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

type Props = HTMLAttributes<HTMLDivElement>;

const QuizCard: FC<Props> = (props: Props) => {
  return(
    <CardWrapper {...props} />
  );
};

export default QuizCard;