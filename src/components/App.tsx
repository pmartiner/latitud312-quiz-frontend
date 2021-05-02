// Bibliotecas
import React, { FC, useState } from 'react';
import styled from 'styled-components';

// Componentes
import Page from 'components/layout/Page';
import QuizCard from 'components/Card/QuizCard';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import RadioButton from 'components/FormElements/RadioButton';
import TextInput from 'components/FormElements/TextInput';

// Tipos
import { QuizQuestionsType } from 'src/types';

const CardQuestion = styled.label`
  font-size: 30px;
`;

const IntroCardHeader = styled.h3`
  font-size: 48px;
  padding-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

const LoaderContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const LoaderLabel = styled.p`
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const CardContentContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const QUIZ: QuizQuestionsType = {
  quiz: {
    pages: [
      {
        question: 'Hola, ¿cómo estás?',
        input: {
          type: 'radio',
          values: [
            {
              label: 'A favor ✅',
              value: 'A favor'
            },
            {
              label: 'Indeciso/a',
              value: 'Indecisión'
            },
            {
              label: 'En contra ❌',
              value: 'En contra'
            }
          ]
        }
      }
    ]
  }
};

const App: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(-2);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasZipCodeError, setHasZipCodeError] = useState<boolean>(false);

  const renderIntroCard = (): JSX.Element => {
    return (
      <CardContentContainer>
        <IntroCardHeader>
          ¿Sabías que éstas son las primeras elecciones en las que tu diputado/a puede reelegirse? Descubre si tu diputado te ha evaluado bien o si necesitas buscar una alternativa. Contesta estas 5 preguntas para descubrirla respuesta.  
        </IntroCardHeader>
        <Button onClick={() => setCurrentPage(currentPage + 1)}>
          Empieza aquí
        </Button>
      </CardContentContainer>
    );
  };

  const renderZipCodeCard = (): JSX.Element => {
    return (
      <CardContentContainer>
        <IntroCardHeader>
          Para poder comenzar, te pedimos escribas tu código postal.
        </IntroCardHeader>
        <IntroCardHeader>
          Únicamente utilizaremos este dato para determinar a los y las representantes de tu distrito.
        </IntroCardHeader>
        <label htmlFor='codigo-postal'>Código postal:</label>
        <TextInput
          id='codigo-postal'
          maxLength={5}
          error={hasZipCodeError}
          placeholder='Escribe aquí tu código postal: '
        />
        <Button onClick={() => setCurrentPage(currentPage + 1)}>
          Continuar
        </Button>
      </CardContentContainer>
    );
  };

  const renderContent = (): JSX.Element => {
    if (currentPage === -2) {
      return renderIntroCard();
    } else if (currentPage === -1) {
      return renderZipCodeCard();
    }

    return <></>;
  };

  return (
    <Page>
      <QuizCard>
        {loading ?
          <LoaderContainer>
            <Loader />
            <LoaderLabel>
            Cargando...
            </LoaderLabel>
          </LoaderContainer> :
          renderContent()}
      </QuizCard>
    </Page>
  );
};

export default App;