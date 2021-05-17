// Bibliotecas
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
import { isIE } from 'react-device-detect';

// Componentes
import Page from 'components/layout/Page';
import QuizCard from 'components/Card/QuizCard';
import Button from 'components/Button/Button';
import BackButton from 'components/Button/BackButton';
import Loader from 'components/Loader/Loader';
import RadioButton from 'components/FormElements/RadioButton';
import TextInput from 'components/FormElements/TextInput';
import ProgressBar from 'components/ProgressBar/ProgressBar';

// Tipos
import { QuizQuestionsType } from 'types/index';
import { ACCENT_COLOR_LIGHT, SUCCESS_COLOR } from 'components/layout/const';

const CardQuestion = styled.label`
  font-size: 30px;
  padding-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
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
  justify-content: space-evenly;
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
  justify-content: space-evenly;
  padding: 40px;
  height: 100%;
`;

const ParagraphContainer = styled.div`
  width: 100%;
`;

const CardValues = styled.div`
  margin-top: auto;
`;

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
  margin-top: auto;

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
  margin-bottom: auto;

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

const FullSizeFade = styled(Fade)<{ fullSize?: boolean; }>`
  ${props => (isIE || props.fullSize) &&
    `width: 100%;
    height: 100%;`}
  flex: 1 1 auto;
`;

const ReadyHeader = styled(IntroCardHeader)`
  text-align: center;
`;

const ResHeader = styled.h3`
  align-self: flex-start;
  font-size: 40px;
  padding-bottom: 20px;
  font-weight: bold;
  max-width: 100%;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const DiputadeHeader = styled.h3`
  font-size: 48px;
  font-weight: bold;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 768px) {
    font-size: 32px;
    padding-top: 10px;
  }
`;

const DiputadeSubHeader = styled.h5`
  font-size: 28px;
  font-weight: normal;
  max-width: 100%;
  font-weight: normal;
  padding: 10px 0;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const RepresentationLabel = styled.p`
  font-size: 28px;
  font-weight: 500;
  max-width: 100%;
  font-weight: normal;
  padding-top: 15px;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const RepresentativeAnswer = styled(RepresentationLabel)`
  font-weight: bold;
  padding: 10px 0;
`;

const DiputadeContainer = styled.div`
  display: flex;
  
  justify-content: space-around;
  width: 100%;
  align-items: center;

  @media screen and (max-width: 768px) {
    justify-content: center;
    flex-flow: column nowrap;
  }
`;

const DiputadeTextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 100%;
  padding: 25px;

  @media screen and (max-width: 768px) {
    padding: 0px;
  }
`;

const DiputadePhoto = styled.img`
  max-width: 200px;
  max-height: 200px;

  @media screen and (max-width: 768px) {
    max-width: 120px;
    max-height: 120px;
  }
`;

const PartyPhoto = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

const MeterContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 20px 0;
`;

const RepAnswersHeader = styled(ResHeader)`
  font-size: 32px;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const AnswersWrapper = styled.div`
  padding-bottom: 20px;
  width: 100%;
`;

const PartyPercentageContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const Percentage = styled.p`
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
`;

const SuccessfulRegistrationText = styled.p`
  color: ${SUCCESS_COLOR};
  padding: 15px 0;
`;

const QUIZ: QuizQuestionsType = {
  quiz: {
    pages: [
      {
        id: '1',
        question: 'Los datos biométricos son datos únicos que están asociados a tus rasgos físicos, como tu huella digital, tu iris, la forma de tu cara, entre otros. ¿Estás de acuerdo con que se tengan que recolectar estos datos para contratar un servicio de telefonía celular?',
        shortQuestion: 'Almacenamiento de los datos biométricos para el registro contratar un servicio de telefonía celular',
        input: {
          type: 'radio',
          values: [
            {
              label: 'A favor ✅',
              value: 'A favor'
            },
            {
              label: 'Indeciso/a 🤔',
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
        id: '2',
        question: 'A finales de 2020 el Congreso aprobó la reducción de semanas cotizadas requeridas para la jubilación. ¿Cuál es tu opinión?',
        shortQuestion: 'Reducción de semanas cotizadas requeridas para la jubilación',
        input: {
          type: 'radio',
          values: [
            {
              label: 'A favor ✅',
              value: 'A favor'
            },
            {
              label: 'Indeciso/a 🤔',
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
        id: '3',
        question: 'En 2019 el Congreso aprobó la creación de la Guardia Nacional para proporcionar seguridad pública al país. ¿Cuál es tu opinión?',
        shortQuestion: 'Aprobación de la Guardia Nacional',
        input: {
          type: 'radio',
          values: [
            {
              label: 'A favor ✅',
              value: 'A favor'
            },
            {
              label: 'Indeciso/a 🤔',
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
        id: '4',
        question: 'Este año entró en vigor la ley que regula y prohibe la subcontratación laboral, también conocida como outsourcing. ¿Qué opinas sobre la aprobación de esta ley?',
        shortQuestion: 'Ley que regula y prohibe la subcontratación laboral',
        input: {
          type: 'radio',
          values: [
            {
              label: 'A favor ✅',
              value: 'A favor'
            },
            {
              label: 'Indeciso/a 🤔',
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
        id: '5',
        question: 'La actual propuesta de ley para la despenalización de la marihuana prohibe su consumo en vía pública. ¿Qué opinas al respecto?',
        shortQuestion: 'Consumo de marihuana en vía pública',
        input: {
          type: 'radio',
          values: [
            {
              label: 'A favor ✅',
              value: 'A favor'
            },
            {
              label: 'Indeciso/a 🤔',
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
        id: '6',
        question: 'El año pasado el Congreso aprobó un nuevo impuesto para las plataformas digitales. ¿Qué opinas sobre esto?',
        shortQuestion: 'Impuesto a las plataformas digitales',
        input: {
          type: 'radio',
          values: [
            {
              label: 'A favor ✅',
              value: 'A favor'
            },
            {
              label: 'Indeciso/a 🤔',
              value: 'Indecisión'
            },
            {
              label: 'En contra ❌',
              value: 'En contra'
            }
          ]
        },
      },
    ]
  }
};

const RESPUESTAS_REPRESENTANTE = {
  id: '12345',
  fullName: 'Representante de prueba',
  photo: 'https://www.pngarts.com/files/5/User-Avatar-Transparent.png',
  previousParty: {
    id: '21435',
    name: 'Partido anterior',
    logo: 'https://iowastartingline.com/wp-content/uploads/2016/09/Political-Party-Logo.png'
  },
  currentParty: {
    id: '54246',
    name: 'Partido de prueba',
    logo: 'https://iowastartingline.com/wp-content/uploads/2016/09/Political-Party-Logo.png'
  },
  sub: {
    id: '12345',
    fullName: 'Representante suplente de prueba',
  },
  answers: ['A favor', 'En contra', 'Abstención', 'A favor', 'En contra', 'No se presentó'],
  district: '15',
  reelection: true
};

const RESPUESTAS_PARTIDOS = [
  {
    id: '7657',
    name: 'Partido 1',
    color: '#731717',
    logo: 'https://iowastartingline.com/wp-content/uploads/2016/09/Political-Party-Logo.png',
    answers: ['A favor', 'En contra', 'Abstención', 'A favor', 'En contra', 'No se presentó'],
  },
  {
    id: '908',
    color: '#FF0000',
    name: 'Partido 2',
    logo: 'https://iowastartingline.com/wp-content/uploads/2016/09/Political-Party-Logo.png',
    answers: ['A favor', 'A favor', 'A favor', 'A favor', 'En contra', 'A favor'],
  },
  {
    id: '123',
    name: 'Partido 3',
    color: '#0037DB',
    logo: 'https://iowastartingline.com/wp-content/uploads/2016/09/Political-Party-Logo.png',
    answers: ['A favor', 'En contra', 'Abstención', 'Abstención', 'En contra', 'A favor'],
  },
  {
    id: '2186435',
    name: 'Partido 4',
    color: '#FF6D24',
    logo: 'https://iowastartingline.com/wp-content/uploads/2016/09/Political-Party-Logo.png',
    answers: ['En contra', 'En contra', 'En contra', 'A favor', 'En contra', 'En contra'],
  },
  {
    id: '2454',
    name: 'Partido 5',
    color: '#EDE731',
    logo: 'https://iowastartingline.com/wp-content/uploads/2016/09/Political-Party-Logo.png',
    answers: ['Abstención', 'Abstención', 'Abstención', 'A favor', 'A favor', 'A favor'],
  }
];

const App: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(-2);
  const [zipCode, setZipCode] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasZipCodeError, setHasZipCodeError] = useState<boolean>(false);
  const [hasSendingError, setHasSendingError] = useState<boolean>(false);
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [hasEmailSubmit, sethasEmailSubmit] = useState<boolean>(false);
  
  useEffect(() => {
    const initUserAnswers: string[] = [];
    for (let i = 0; i < QUIZ.quiz.pages.length; i++) {
      initUserAnswers.push('');
    }

    setUserAnswers(initUserAnswers);
  }, []);

  useEffect(() => {
    document.getElementById('card-container')?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  // Temp
  const later = (delay, value) => {
    let timeout = 0;
    let reject: (() => void) | null = null;
    const promise = new Promise((resolve, _reject) => {
      reject = _reject;
      timeout = window.setTimeout(resolve, delay, value);
    });
    return {
      get promise() { return promise; },
      cancel() {
        if (typeof timeout === 'number' && timeout && reject && Math.random() <= 0.2) {
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

  const handleQuestionsSubmit = () => {
    setLoading(true);
    later(500, false).promise
      .then(val => {
        setHasSendingError(val as boolean);
        setCurrentPage(currentPage + 1);
      })
      .catch(err => {
        console.error(err);
        setHasSendingError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEmailSubmit = () => {
    setLoading(true);
    later(500, false).promise
      .then(val => {
        setHasEmailError(val as boolean);
        sethasEmailSubmit(true);
      })
      .catch(err => {
        console.error(err);
        setHasEmailError(true);
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

  const renderIntroCard = () => {
    return (
      <FullSizeFade>
        <CardContentContainer>
          <ParagraphContainer>
            <IntroCardHeader>
              ¿Sabías que éstas son las primeras elecciones en las que tu diputado/a puede reelegirse?
            </IntroCardHeader>
            <IntroCardHeader>
              Descubre si tu diputado/a te ha representado bien o si necesitas buscar una alternativa. 
            </IntroCardHeader>
            <IntroCardHeader>
              Contesta estas 5 preguntas para descubrir la respuesta.  
            </IntroCardHeader>
          </ParagraphContainer>
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
            Empieza aquí
          </Button>
        </CardContentContainer>
      </FullSizeFade>
    );
  };

  const renderZipCodeCard = () => {
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

  const renderQuizCard = () => {
    const cardValues = QUIZ.quiz.pages[currentPage].input.values.map((val, i) => {
      if (QUIZ.quiz.pages[currentPage].input.type === 'radio') {
        return (
          <LabelValueContainer key={`${QUIZ.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}-${i}-${QUIZ.quiz.pages[currentPage].id}`}>
            <RadioButton
              id={`${QUIZ.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}-${QUIZ.quiz.pages[currentPage].id}`}
              value={val.value}
              onChange={handleUserAnswer}
              name={`question-${QUIZ.quiz.pages[currentPage].id}`}
            />
            <label
              htmlFor={`${QUIZ.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}-${QUIZ.quiz.pages[currentPage].id}`}
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
              onClick={() => {
                if (currentPage === QUIZ.quiz.pages.length - 1) {
                  handleQuestionsSubmit();
                }

                if (!hasSendingError) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              disabled={userAnswers[currentPage] === ''}
            >
              Continuar
            </Button>
          </QuizQuestionFooter>
        </CardQuestionContentContainer>
      </FullSizeFade>
    );
  };

  const renderReadyCard = () => {
    return (
      <FullSizeFade fullSize>
        <CardContentContainer>
          <ParagraphContainer>
            <ReadyHeader>
              ¡Listo!
            </ReadyHeader>
            <ReadyHeader>
              ¡Tenemos tus resultados!
            </ReadyHeader>
          </ParagraphContainer>
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
            Continuar
          </Button>
        </CardContentContainer>
      </FullSizeFade>
    );
  };

  const renderRepResultsCard = () => {
    let percentageResult = 0;

    for (let i = 0; i < userAnswers.length; i += 1) {
      if (userAnswers[i] === RESPUESTAS_REPRESENTANTE.answers[i]) {
        percentageResult += 1;
      }
    }

    if (userAnswers.length > 0) {
      percentageResult = Math.round((percentageResult / userAnswers.length) * 100);
    }

    return (
      <FullSizeFade>
        <CardContentContainer>
          <ResHeader>
            Diputado/a federal de tu distrito:
          </ResHeader>
          <DiputadeContainer>
            <DiputadePhoto src={RESPUESTAS_REPRESENTANTE.photo} alt='Foto del representante de tu distrito'/>
            <DiputadeTextContainer>
              <DiputadeHeader>
                {RESPUESTAS_REPRESENTANTE.fullName}
              </DiputadeHeader>
              <DiputadeSubHeader>
                Suplente: {RESPUESTAS_REPRESENTANTE.sub.fullName}
              </DiputadeSubHeader>
              <DiputadeSubHeader>
                Bancada actual: <PartyPhoto
                  src={RESPUESTAS_REPRESENTANTE.currentParty.logo}
                  alt={`Partido ${RESPUESTAS_REPRESENTANTE.currentParty.name}`}
                />
              </DiputadeSubHeader>
              <DiputadeSubHeader>
                Partido por el que fue electo: <PartyPhoto
                  src={RESPUESTAS_REPRESENTANTE.previousParty.logo}
                  alt={`Partido ${RESPUESTAS_REPRESENTANTE.previousParty.name}`}
                />
              </DiputadeSubHeader>
              <DiputadeSubHeader>
                Este diputado/a <em>{RESPUESTAS_REPRESENTANTE.reelection === true ? 'Sí' : 'No'}</em> reelección.
              </DiputadeSubHeader>
            </DiputadeTextContainer>
          </DiputadeContainer>
          <RepresentationLabel>
            De acuerdo con tus respuestas, el diputado/a de tu distrito te representa en este porcentaje:
          </RepresentationLabel>
          <MeterContainer>
            <ProgressBar
              progress={percentageResult}
              meterColor={ACCENT_COLOR_LIGHT}
              backgroundColor='transparent'
            >
              <Percentage>
                {percentageResult}%
              </Percentage>
            </ProgressBar>
          </MeterContainer>
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
            Continuar
          </Button>
        </CardContentContainer>
      </FullSizeFade>
    );
  };

  const renderRepAnswersCard = () => {
    const resp = QUIZ.quiz.pages.map((q, i) => (
      <RepresentativeAnswer key={q.id}>
        {q.shortQuestion}: {RESPUESTAS_REPRESENTANTE.answers[i]}
      </RepresentativeAnswer>
    ));

    return (
      <FullSizeFade>
        <CardContentContainer>
          <RepAnswersHeader>
            Así fue cómo voto el diputado/a de tu distrito:
          </RepAnswersHeader>
          <AnswersWrapper>
            {resp}
          </AnswersWrapper>
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
            Ver más resultados
          </Button>
        </CardContentContainer>
      </FullSizeFade>
    );
  };
  
  const renderPartyAnswers = () => {
    const resp = RESPUESTAS_PARTIDOS.map((r) => {
      let percentageResult = 0;

      for (let i = 0; i < userAnswers.length; i += 1) {
        if (userAnswers[i] === r.answers[i]) {
          percentageResult += 1;
        }
      }
  
      if (userAnswers.length > 0) {
        percentageResult = Math.round((percentageResult / userAnswers.length) * 100);
      }

      return (
        <PartyPercentageContainer key={r.id}>
          <PartyPhoto
            src={r.logo}
            alt={`Partido ${r.name}`}
          />
          <MeterContainer>
            <ProgressBar
              progress={percentageResult}
              meterColor={r.color}
              backgroundColor='transparent'
            >
              <Percentage>
                {percentageResult}%
              </Percentage>
            </ProgressBar>
          </MeterContainer>
        </PartyPercentageContainer>
      );
    });

    return (
      <FullSizeFade>
        <CardContentContainer>
          <RepAnswersHeader>
            Con base en tus respuestas, así te representan la mayoría de las bancadas de los partidos:
          </RepAnswersHeader>
          <AnswersWrapper>
            {resp}
          </AnswersWrapper>
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
            ¡Listo!
          </Button>
        </CardContentContainer>
      </FullSizeFade>
    );
  };

  const renderRegisterEmailCard = () => {
    return (
      <FullSizeFade>
        <CardZipCodeContentContainer onSubmit={handleEmailSubmit}>
          <ParagraphContainer>
            <IntroCardHeader>
              ¡Gracias por participar!
            </IntroCardHeader>
            <IntroCardHeader>
              Juntos y juntas podemos construir una democracia más saludable.
            </IntroCardHeader>
            <IntroCardHeader>
              Si estás interesado/a en recibir más noticias e información para entender la política, ¡regístrate aquí! 👇
            </IntroCardHeader>
          </ParagraphContainer>
          <InputZipCodeContainer>
            <label htmlFor='correo-electronico'>Correo electrónico:</label>
            <TextInput
              id='correo-electronico'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              error={hasEmailError}
              success={hasEmailSubmit}
              placeholder='Escribe aquí tu correo electrónico: '
              required
            />
          </InputZipCodeContainer>
          {hasEmailSubmit &&
          <SuccessfulRegistrationText>
            ¡Registro exitoso!
          </SuccessfulRegistrationText>}
          {!hasEmailSubmit &&
          <Button
            type='submit'
            disabled={hasEmailError || email === ''}
          >
            ¡Regístrame!
          </Button>}
        </CardZipCodeContentContainer>
      </FullSizeFade>
    );
  };

  const renderContent = () => {
    if (currentPage === -2) {
      return renderIntroCard();
    } else if (currentPage === -1) {
      return renderZipCodeCard();
    } else if (currentPage >= 0 && currentPage < QUIZ.quiz.pages.length) {
      return renderQuizCard();
    } else if (currentPage === QUIZ.quiz.pages.length) {
      return renderReadyCard();
    } else if (currentPage === QUIZ.quiz.pages.length + 1) {
      return renderRepResultsCard();
    } else if (currentPage === QUIZ.quiz.pages.length + 2) {
      return renderRepAnswersCard();
    } else if (currentPage === QUIZ.quiz.pages.length + 3) {
      return renderPartyAnswers();
    } else if (currentPage === QUIZ.quiz.pages.length + 4) {
      return renderRegisterEmailCard();
    }

    return <></>;
  };

  return (
    <Page>
      <QuizCard id='card-container'>
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