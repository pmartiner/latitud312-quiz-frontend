// Bibliotecas
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';

// Componentes
import Page from 'components/layout/Page';
import QuizCard from 'components/Card/QuizCard';
import Button from 'components/Button/Button';
import BackButton from 'components/Button/BackButton';
import Loader from 'components/Loader/Loader';
import RadioButton from 'components/FormElements/RadioButton';
import TextInput from 'components/FormElements/TextInput';

// Tipos
import { QuizQuestionsType } from 'src/types';

const CardQuestion = styled.label`
  font-size: 30px;
`;

const IntroCardHeader = styled.p`
  font-size: 48px;
  padding-bottom: 20px;
  font-weight: bold;
  max-width: 100%;

  @media screen and (max-width: 768px) {
    font-size: 24px;
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
  width: 100%;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  height: 100%;
`;

const CardQuestionContentContainer = styled(CardContentContainer)`
  align-items: flex-start;
`;

const CardZipCodeContentContainer = styled.form`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  height: 100%;
`;

const ParagraphContainer = styled.div`
  width: 100%;
`;

const CardValues = styled.div``;

const InputZipCodeContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  padding-bottom: 20px;
`;

const LabelValueContainer = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const QuizQuestionFooter = styled.footer`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const QuizQuestionHeader = styled.header`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 769px) {
    justify-content: flex-end;
  }
`;

const DesktopBackButton = styled(BackButton)`
  @media screen and (max-width: 768px) {
     display: none;
  }
`;

const MobileBackButton = styled(BackButton)`
  @media screen and (min-width: 769px) {
     display: none;
  }
`;

const FullSizeFade = styled(Fade)`
  width: 100%;
  height: 100%;
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
        },
      },
      {
        question: 'Ésta es una pregunta de prueba',
        input: {
          type: 'radio',
          values: [
            {
              label: 'Súper',
              value: 'Ok'
            },
            {
              label: 'Vale',
              value: 'Meh'
            },
          ]
        },
      }
    ]
  }
};

const App: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(-2);
  const [zipCode, setZipCode] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasZipCodeError, setHasZipCodeError] = useState<boolean>(false);
  
  useEffect(() => {
    const initUserAnswers: string[] = [];
    for (let i = 0; i < QUIZ.quiz.pages.length; i++) {
      initUserAnswers.push('');
    }

    setUserAnswers(initUserAnswers);
  }, []);

  // Temp
  const later = (delay, value) => {
    let timeout: NodeJS.Timeout | null = null;
    let reject: ((reason?: any) => void) | null = null;
    const promise = new Promise((resolve, _reject) => {
      reject = _reject;
      timeout = setTimeout(resolve, delay, value);
    });
    return {
      get promise() { return promise; },
      cancel() {
        if (timeout && reject && Math.random() <= 0.2) {
          clearTimeout(timeout);
          reject();
          reject = null;
        }
      }
    };
  };

  const handleZipCodeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    later(500, false).promise
      .then(val => {
        setHasZipCodeError(val as boolean);
        setCurrentPage(currentPage + 1);
      })
      .catch(err => {
        console.error(err);
        setHasZipCodeError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUserAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    const currentUserAnswers = [...userAnswers];

    if (currentPage >= 0 && currentPage < currentUserAnswers.length) {
      currentUserAnswers[currentPage] = e.target.value;
      setUserAnswers(currentUserAnswers);
    }
  };

  const renderIntroCard = (): JSX.Element => {
    return (
      <FullSizeFade>
        <CardContentContainer>
          <ParagraphContainer>
            <IntroCardHeader>
            ¿Sabías que éstas son las primeras elecciones en las que tu diputado/a puede reelegirse?
            </IntroCardHeader>
            <IntroCardHeader>
            Descubre si tu diputado te ha evaluado bien o si necesitas buscar una alternativa. 
            </IntroCardHeader>
            <IntroCardHeader>
            Contesta estas 5 preguntas para descubrirla respuesta.  
            </IntroCardHeader>
          </ParagraphContainer>
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
          Empieza aquí
          </Button>
        </CardContentContainer>
      </FullSizeFade>
    );
  };

  const renderZipCodeCard = (): JSX.Element => {
    return (
      <FullSizeFade>
        <CardZipCodeContentContainer onSubmit={handleZipCodeSubmit}>
          <ParagraphContainer>
            <IntroCardHeader>
            Para poder comenzar, te pedimos escribas tu código postal.
            </IntroCardHeader>
            <IntroCardHeader>
            Únicamente utilizaremos este dato para determinar a los y las representantes de tu distrito.
            </IntroCardHeader>
          </ParagraphContainer>
          <InputZipCodeContainer>
            <label htmlFor='codigo-postal'>Código postal:</label>
            <TextInput
              id='codigo-postal'
              maxLength={5}
              onChange={(e) => setZipCode(e.target.value)}
              error={hasZipCodeError}
              placeholder='Escribe aquí tu código postal: '
              required
            />
          </InputZipCodeContainer>
          <Button
            type='submit'
            disabled={hasZipCodeError || zipCode === ''}
          >
          Continuar
          </Button>
        </CardZipCodeContentContainer>
      </FullSizeFade>
    );
  };

  const renderQuizCard = (): JSX.Element => {
    const cardValues = QUIZ.quiz.pages[currentPage].input.values.map((val, i) => {
      if (QUIZ.quiz.pages[currentPage].input.type === 'radio') {
        return (
          <LabelValueContainer key={`${QUIZ.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}-${i}`}>
            <RadioButton
              id={`${QUIZ.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}`}
              value={val.value}
              onChange={handleUserAnswer}
              name={`question-${currentPage + 1}`}
            />
            <label
              htmlFor={`${QUIZ.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}`}
            >
              {val.label}
            </label>
          </LabelValueContainer>
        );
      }

      return <></>;
    });

    return (
      <FullSizeFade>
        <CardQuestionContentContainer>
          <QuizQuestionHeader>
            <MobileBackButton onClick={() => setCurrentPage(currentPage - 1)}>
            Atrás
            </MobileBackButton>
            <p>
              {currentPage + 1} de {QUIZ.quiz.pages.length}
            </p>
          </QuizQuestionHeader>
          <CardQuestion>
            {QUIZ.quiz.pages[currentPage].question}
          </CardQuestion>
          <CardValues>
            {cardValues}
          </CardValues>
          <QuizQuestionFooter>
            <DesktopBackButton onClick={() => setCurrentPage(currentPage - 1)}>
            Atrás
            </DesktopBackButton>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={userAnswers[currentPage] === ''}
            >
            Continuar
            </Button>
          </QuizQuestionFooter>
        </CardQuestionContentContainer>
      </FullSizeFade>
    );
  };

  const renderContent = (): JSX.Element => {
    if (currentPage === -2) {
      return renderIntroCard();
    } else if (currentPage === -1) {
      return renderZipCodeCard();
    } else if (currentPage >= 0 && currentPage < QUIZ.quiz.pages.length) {
      return renderQuizCard();
    }

    return <></>;
  };

  return (
    <Page>
      <QuizCard>
        <FullSizeFade>
          {loading ?
            <LoaderContainer>
              <Loader />
              <LoaderLabel>
              Cargando...
              </LoaderLabel>
            </LoaderContainer> :
            renderContent()}
        </FullSizeFade>
      </QuizCard>
    </Page>
  );
};

export default App;