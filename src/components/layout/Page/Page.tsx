// Componentes
import React, { FC } from 'react';
import styled from 'styled-components';

// Tipos
import { ChildrenProps } from 'types/index';

// Constantes
import { ACCENT_COLOR_DARK, ACCENT_COLOR_LIGHT, NAVBAR_MAX_HEIGHT } from 'components/layout/const';

const PageBackground = styled.section`
  background-color: ${ACCENT_COLOR_LIGHT};
  color: ${ACCENT_COLOR_DARK};
  width: 100%;
  height: calc(100vh - ${NAVBAR_MAX_HEIGHT});
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Page: FC<ChildrenProps> = (props: ChildrenProps) => {
  return (
    <PageBackground>
      {props.children}
    </PageBackground>
  );
};

export default Page;