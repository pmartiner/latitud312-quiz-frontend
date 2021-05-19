// Bibliotecas
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
import { isIE } from 'react-device-detect';
import ReactModal from 'react-modal';
import ImageZoom from 'react-medium-image-zoom';

// Componentes
import Page from 'components/layout/Page';
import QuizCard from 'components/Card/QuizCard';
import Button from 'components/Button/Button';
import BackButton from 'components/Button/BackButton';
import Loader from 'components/Loader/Loader';
import RadioButton from 'components/FormElements/RadioButton';
import TextInput from 'components/FormElements/TextInput';
import ProgressBar from 'components/ProgressBar/ProgressBar';

// API
import { getDiputade } from 'api/distritos';

// Tipos
import { QuizQuestionsType } from 'types/index';
import {
  ACCENT_COLOR,
  ACCENT_COLOR_DARK,
  ACCENT_COLOR_LIGHT,
  ERROR_COLOR,
  SUCCESS_COLOR
} from 'components/layout/const';
import { AxiosError } from 'axios';
import { GetDiputadeResponse } from 'types/api';
import SelectComponent from './Select/Select';

// Constantes
import { ENTIDADES, PARTIDOS } from '../const';

// Assets
import INE_Seccion from 'src/assets/images/partidos/INE_Seccion.jpg';

const CardQuestion = styled.legend`
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

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: ${ACCENT_COLOR_DARK};
  padding-bottom: 5px;
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
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  & span {
    align-self: flex-start;
  }

  @media screen and (max-width: 768px) {
    font-size: 24px;
    flex-flow: column wrap;
    justify-content: center;
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
  border-radius: 25px;

  @media screen and (max-width: 768px) {
    max-width: 120px;
    max-height: 120px;
  }
`;

const DiputadePhotoContainer = styled.div`
  padding: 5px 50px;
`;

const PartyPhoto = styled.img`
  max-width: 50px;
  max-height: 50px;
  padding: 10px;
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

const ErrorText = styled.p`
  color: ${ERROR_COLOR};
  padding: 15px 0;
`;

const UnderlinedSpan = styled.span`
  border-bottom: 6px solid ${ACCENT_COLOR_LIGHT};
`;

const INEContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: ${ACCENT_COLOR_DARK};
`;

const EmptyUnderlinedButton = styled.button`
  border: 0;
  padding: 0 10px;
  background-color: transparent;
  display: inline-block;
  font-size: 48px;
  font-weight: bold;
  max-width: 100%;
  border-bottom: 8px solid ${ACCENT_COLOR_LIGHT};
  color: ${ACCENT_COLOR_DARK};
  cursor: pointer;
  transition: all 0.1s ease;

  :hover {
    border-bottom: 8px solid ${ACCENT_COLOR};
  }

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
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
  const [seccion, setSeccion] = useState<string>('');
  const [entidad, setEntidad] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSeccionError, setHasSeccionError] = useState<boolean>(false);
  const [seccionError, setSeccionError] = useState<string>('');
  const [hasSendingError, setHasSendingError] = useState<boolean>(false);
  const [hasEmailError, setHasEmailError] = useState<boolean>(false);
  const [hasEmailSubmit, sethasEmailSubmit] = useState<boolean>(false);
  const [diputade, setDiputade] = useState<GetDiputadeResponse | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  useEffect(() => {
    const initUserAnswers: string[] = [];
    for (let i = 0; i < QUIZ.quiz.pages.length; i++) {
      initUserAnswers.push('');
    }

    setUserAnswers(initUserAnswers);
    ReactModal.setAppElement(document.getElementById('root-latitud312') as HTMLElement);
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

  const handleSeccionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (hasSeccionError) {
      setHasSeccionError(false);
    }
    setSeccion(e.target.value);
  };

  const handleZipCodeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    getDiputade({
      seccion,
      entidad
    })
      .then(response => {
        setHasSeccionError(false);
        setDiputade(response.data);
        setCurrentPage(currentPage + 1);
      })
      .catch((err: AxiosError) => {
        console.error(`${err.response?.statusText} ${err.response?.status}: ${err.response?.data.description}`);
        setSeccionError(`${err.response?.data.description}`);
        setHasSeccionError(true);
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
              Para poder comenzar, te pedimos escribas tu sección electoral, que encontrarás en tu INE, y tu estado.
            </IntroCardHeader>
            <IntroCardHeader>
              Únicamente utilizaremos estos datos para determinar a los y las representantes de tu distrito.
            </IntroCardHeader>
            <IntroCardHeader>
              Haz clic
              <EmptyUnderlinedButton
                type='button'
                onClick={() => setIsModalOpen(true)}
              >
                aquí
              </EmptyUnderlinedButton>
              si tienes dudas sobre dónde encontrar tu sección electoral.
            </IntroCardHeader>
          </ParagraphContainer>
          <SelectComponent
            id='entidades'
            label='Estado:'
            options={ENTIDADES}
            placeholder={'Elija el estado en donde reside, por favor.'}
            onChange={(e) => setEntidad(e.target.value)}
          />
          <InputZipCodeContainer>
            <Label htmlFor='seccion-electoral'>Sección electoral:</Label>
            <TextInput
              id='seccion-electoral'
              maxLength={4}
              onChange={handleSeccionChange}
              error={hasSeccionError}
              placeholder='Escribe aquí tu sección electoral: '
              required
            />
          </InputZipCodeContainer>
          {hasSeccionError &&
          <ErrorText>
            {seccionError}
          </ErrorText>}
          <Button
            type='submit'
            disabled={hasSeccionError || (seccion === '' && entidad === '')}
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
          <fieldset>
            <CardQuestion>
              {QUIZ.quiz.pages[currentPage].question}
            </CardQuestion>
            <CardValues>
              {cardValues}
            </CardValues>
          </fieldset>
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

  const isUrl = (str: string): boolean => {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    return regexp.test(str);
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

    const partidoActualDiputade = PARTIDOS.find(p => p.name === diputade?.bancada_actual)
      || PARTIDOS.find(p => p.name === 'SP');

    const partidoAnteriorDiputade = PARTIDOS.find(p => p.name === diputade?.bancada_original)
      || PARTIDOS.find(p => p.name === 'SP');

    return (
      <FullSizeFade>
        <CardContentContainer>
          <ResHeader>
            Diputado/a federal de tu distrito:
          </ResHeader>
          <DiputadeContainer>
            <DiputadePhotoContainer>
              <DiputadePhoto
                alt='Foto del representante de tu distrito'
                src={diputade?.foto && isUrl(diputade.foto) ? diputade.foto : RESPUESTAS_REPRESENTANTE.photo} 
              />
            </DiputadePhotoContainer>
            <DiputadeTextContainer>
              <DiputadeHeader>
                <span>{diputade?.nombre_diputade || ''}</span>
              </DiputadeHeader>
              <DiputadeSubHeader>
                <span>Suplente: {diputade?.nombre_suplente || ''}</span>
              </DiputadeSubHeader>
              <DiputadeSubHeader>
                <span>Bancada actual:</span>
                <PartyPhoto
                  src={partidoActualDiputade?.photo || ''}
                  alt={partidoActualDiputade?.longName || 'Foto del partido de la bancada actual'}
                />
              </DiputadeSubHeader>
              <DiputadeSubHeader>
                <span>Partido por el que fue electo:</span>
                <PartyPhoto
                  src={partidoAnteriorDiputade?.photo || ''}
                  alt={partidoAnteriorDiputade?.longName || 'Foto del partido de la bancada anterior'}
                />
              </DiputadeSubHeader>
              <DiputadeSubHeader>
                <span>Este diputado/a <strong>{diputade?.reeleccion ? 'sí' : 'no'}</strong> busca reelección y <strong>{diputade?.licencia || diputade?.licencia_deceso ? 'sí' : 'no'}</strong> solicitó licencia</span>
              </DiputadeSubHeader>
              <DiputadeSubHeader>
                <span>El/la suplente del diputado/a <strong>{diputade?.reeleccion_suplente ? 'sí' : 'no'}</strong> busca reelección.</span>
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
        {q.shortQuestion}: <UnderlinedSpan>{RESPUESTAS_REPRESENTANTE.answers[i]}</UnderlinedSpan>
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
      <ReactModal
        isOpen={isModalOpen}
        contentLabel='¿Dónde encuentro mi sección electoral?'
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick={true}
        aria={{
          labelledby: 'heading',
          describedby: 'ine-img'
        }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            borderRadius: '10px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxHeight: '550px'
          }
        }}
      >
        <INEContainer>
          <h2 id='heading'>¿Dónde encuentro mi sección electoral?</h2>
          <p>¡Da clic para ver la imagen más cerca!</p>
          <ImageZoom
            image={{
              id: 'ine-img',
              src: INE_Seccion,
              alt: 'En la esquina inferior derecha se encuentra un campo llamado "SECCION", donde encontrarás tu sección electoral',
              style: {
                maxWidth: '100%',
                borderRadius: '25px',
                padding: '20px'
              }
            }}
            zoomImage={{
              src: INE_Seccion,
              alt: 'En la esquina inferior derecha se encuentra un campo llamado "SECCION", donde encontrarás tu sección electoral',
            }}
          />
          <Button onClick={() => setIsModalOpen(false)}>
            Cerrar
          </Button>
        </INEContainer>
      </ReactModal>
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