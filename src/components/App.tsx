// Bibliotecas
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
import { isIE } from 'react-device-detect';
import ReactModal from 'react-modal';
import ImageZoom from 'react-medium-image-zoom';

// Componentes
import Page from 'components/layout/Page/Page';
import Navbar from 'components/layout/Navbar/Navbar';
import QuizCard from 'components/Card/QuizCard';
import Button from 'components/Button/Button';
import BackButton from 'components/Button/BackButton';
import Loader from 'components/Loader/Loader';
import RadioButton from 'components/FormElements/RadioButton';
import TextInput from 'components/FormElements/TextInput';
import ProgressBar from 'components/ProgressBar/ProgressBar';

// API
import { getDiputade } from 'api/distritos';
import { getPreguntas } from 'api/preguntas';
import { setCorreo } from 'api/correos';
import {
  getRespuestasDiputade,
  getRespuestasPartidos,
  setRespuesta
} from 'api/respuestas';

// Tipos
import { AxiosError } from 'axios';
import { URLType } from 'types/index';
import {
  GetDiputadeResponse,
  PartidoResponse,
  PreguntaType,
  QuizQuestionsType,
  RespuestaDP,
  SetPreguntaRequest
} from 'types/api';
import SelectComponent from 'components/Select/Select';

// Constantes
import { ENTIDADES, PARTIDOS, getEmojiByAnswer } from '../const';
import {
  ACCENT_COLOR,
  ACCENT_COLOR_DARK,
  ACCENT_COLOR_LIGHT,
  ERROR_COLOR,
  SUCCESS_COLOR
} from 'components/layout/const';

// Assets
import INE_Seccion from 'src/assets/images/partidos/INE_Seccion.jpg';
import NoPhoto from 'src/assets/images/no-photo.png';
import Logo from 'src/assets/images/logo.png';
import LinkButton from './Button/LinkButton';

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
  padding: 15px 5px;
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
  padding-bottom: 15px;

  @media screen and (min-width: 769px) {
    justify-content: flex-end;
    padding-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 16px;
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
    align-self: center;
  }

  @media screen and (max-width: 768px) {
    font-size: 24px;
    flex-flow: column wrap;
    justify-content: center;

    & span {
      align-self: flex-start;
    }
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

const RepresentativeAnswer = styled.li`
  font-size: 24px;
  font-weight: 500;
  max-width: 100%;
  font-weight: normal;
  padding-top: 15px;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const DiputadeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;

  @media screen and (max-width: 1024px) {
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

  @media screen and (max-width: 1024px) {
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
  max-width: 72px;
  max-height: 72px;
  padding: 10px;

  @media screen and (max-width: 768px) {
    max-width: 72px;
    max-height: 72px;
    margin-left: auto;
    margin-right: auto;
  }
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

const AnswersWrapper = styled.ul`
  list-style-type: none;
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
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
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
  font-weight: bolder;
  line-height: 32px;
  border-bottom: 6px solid ${ACCENT_COLOR_LIGHT};
`;

const YourAnswerSpan = styled(UnderlinedSpan)`
  font-weight: bold;
  padding: 0 10px;
  font-size: 16px;
  line-height: 32px;
  border: 0;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
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

const URLs: URLType[] = [
  {
    label: 'Inicio',
    url: 'https://www.latitud312.com/'
  },
  {
    label: 'Calendario electoral',
    url: 'https://www.latitud312.com/calendario_electoral/'
  },
  {
    label: 'Federal',
    url: 'https://www.latitud312.com/federal/'
  },
  {
    label: 'Estados',
    url: 'https://www.latitud312.com/local/'
  },
  {
    label: 'Alcaldías',
    url: 'https://www.latitud312.com/#'
  }
];

const App: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(-2);
  const [seccion, setSeccion] = useState('');
  const [entidad, setEntidad] = useState('');
  const [email, setEmail] = useState('');
  const [preguntasQuiz, setPreguntasQuiz] = useState<QuizQuestionsType | undefined>();
  const [hasGetPreguntasError, setHasGetPreguntasError] = useState(false);
  const [getPreguntasError, setGetPreguntasError] = useState('');
  const [userAnswers, setUserAnswers] = useState<SetPreguntaRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSeccionError, setHasSeccionError] = useState(false);
  const [seccionError, setSeccionError] = useState('');
  const [sendingError, setSendingError] = useState('');
  const [hasSendingError, setHasSendingError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasEmailSubmit, sethasEmailSubmit] = useState(false);
  const [diputade, setDiputade] = useState<GetDiputadeResponse | undefined>();
  const [distrito, setDistrito] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [respuestasPartidos, setRespuestasPartidos] = useState<PartidoResponse[]>([]);
  const [hasRespuestasPartidoError, setHasRespuestasPartidoError] = useState(false);
  const [respuestasPartidoError, setRespuestasPartidoError] = useState('');
  const [respuestasDiputade, setRespuestasDiputade] = useState<RespuestaDP[]>([]);
  const [hasRespuestasDiputadeError, setHasRespuestasDiputadeError] = useState(false);
  const [respuestasDiputadeError, setRespuestasDiputadeError] = useState('');

  // Effects handlers
  useEffect(() => {
    ReactModal.setAppElement(document.getElementById('root-latitud312') as HTMLElement);
  }, []);
  
  useEffect(() => {
    if (preguntasQuiz) {
      const initUserAnswers: ('')[] = [];
      for (let i = 0; i < preguntasQuiz.quiz.pages.length; i++) {
        initUserAnswers.push('');
      }

      setUserAnswers(initUserAnswers);
    }
  }, [preguntasQuiz]);

  useEffect(() => {
    document.getElementById('card-container')?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  // Event handlers
  const handleInitQuizClick = () => {
    setHasGetPreguntasError(false);
    setLoading(true);
    getPreguntas()
      .then(data => {
        setPreguntasQuiz(data.data);
        setCurrentPage(currentPage + 1);
      })
      .catch((err: AxiosError) => {
        console.error(`${err.response?.statusText} ${err.response?.status}: ${err.response?.data.description}`);
        setGetPreguntasError(`${err.response?.data.description}`);
        setHasGetPreguntasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSeccionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (hasSeccionError) {
      setHasSeccionError(false);
    }
    setSeccion(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (hasEmailError) {
      setHasEmailError(false);
    }
    setEmail(e.target.value);
  };

  const handleZipCodeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSeccionError(false);
    setLoading(true);
    getDiputade({
      seccion,
      entidad
    })
      .then(response => {
        setHasSeccionError(false);
        setDiputade(response.data);
        setDistrito(response.data.distrito);
        setCurrentPage(currentPage + 1);
      })
      .catch((err: AxiosError) => {
        console.error(`${err.response?.statusText} ${err.response?.status}: ${err.response?.data.description}`);
        setSeccionError(`${err.response?.data.description}`);
        setHasSeccionError(true);
        setSeccion('');
        setEntidad('');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleQuestionsSubmit = () => {
    setLoading(true);
    setRespuesta(userAnswers)
      .then(() => {
        setHasSendingError(false);
        setCurrentPage(currentPage + 1);
      })
      .catch((err: AxiosError) => {
        console.error(`${err.response?.statusText} ${err.response?.status}: ${err.response?.data.description}`);
        setSendingError(`${err.response?.data.description}`);
        setHasSendingError(true);
      });
    getRespuestasDiputade(diputade?.id_legislativo || 0)
      .then(data => {
        setRespuestasDiputade(data.data);
      })
      .catch((err: AxiosError) => {
        console.error(`${err.response?.statusText} ${err.response?.status}: ${err.response?.data.description}`);
        setRespuestasDiputadeError(`${err.response?.data.description}`);
        setHasRespuestasDiputadeError(true);
      });
    getRespuestasPartidos()
      .then(data => {
        setRespuestasPartidos(data.data);
      })
      .catch((err: AxiosError) => {
        console.error(`${err.response?.statusText} ${err.response?.status}: ${err.response?.data.description}`);
        setRespuestasPartidoError(`${err.response?.data.description}`);
        setHasRespuestasPartidoError(true);
      });
    setLoading(false);
  };

  const handleEmailSubmit = () => {
    setLoading(true);
    setCorreo({
      correo: email
    })
      .then(() => {
        setHasEmailError(false);
        sethasEmailSubmit(true);
      })
      .catch((err: AxiosError) => {
        console.error(`${err.response?.statusText} ${err.response?.status}: ${err.response?.data.description}`);
        setEmailError(`${err.response?.data.description}`);
        setHasEmailError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUserAnswer = (e: ChangeEvent<HTMLInputElement>, distrito: number, id_pregunta: number) => {
    const currentUserAnswers = [...userAnswers];

    if (currentPage >= 0 && currentPage < currentUserAnswers.length) {
      currentUserAnswers[currentPage] = {
        id_pregunta,
        distrito_usuarie: distrito,
        respuesta: e.target.value
      };
      setUserAnswers(currentUserAnswers);
    }
  };

  // Component rendering functions
  const renderIntroCard = () => {
    return (
      <FullSizeFade>
        <CardContentContainer>
          <ParagraphContainer>
            <IntroCardHeader>
              ¿Sabías que estas son las primeras elecciones en las que tu diputado/a puede reelegirse?
            </IntroCardHeader>
            <IntroCardHeader>
              Descubre si el diputado/a electo/a de tu distrito te ha representado bien o si necesitas buscar una alternativa. 
            </IntroCardHeader>
            <IntroCardHeader>
              Contesta estas 10 preguntas para descubrir la respuesta.  
            </IntroCardHeader>
          </ParagraphContainer>
          <Button onClick={handleInitQuizClick}>
            Empieza aquí
          </Button>
          {hasGetPreguntasError &&
          <ErrorText>
            {getPreguntasError}
          </ErrorText>}
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
              Para poder comenzar, escribe tu sección electoral (que encontrarás en tu credencial de elector) y tu estado.
            </IntroCardHeader>
            <IntroCardHeader>
              Únicamente utilizaremos estos datos para determinar al diputado/a que actualmente representa a tu distrito en el Congreso.
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
            placeholder={'Elige el estado donde resides'}
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
    if (preguntasQuiz) {
      const cardValues = preguntasQuiz.quiz.pages[currentPage].input.values.map((val, i) => {
        if (preguntasQuiz.quiz.pages[currentPage].input.type === 'radio') {
          return (
            <LabelValueContainer key={`${preguntasQuiz.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}-${i}-${preguntasQuiz.quiz.pages[currentPage].id_pregunta}`}>
              <RadioButton
                id={`${preguntasQuiz.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}-${preguntasQuiz.quiz.pages[currentPage].id_pregunta}`}
                value={val.value}
                onChange={(e) => handleUserAnswer(e, distrito, preguntasQuiz.quiz.pages[currentPage].id_pregunta)}
                name={`question-${preguntasQuiz.quiz.pages[currentPage].id_pregunta}`}
              />
              <label
                htmlFor={`${preguntasQuiz.quiz.pages[currentPage].input.type}-${val.value.split(' ').join('-')}-${preguntasQuiz.quiz.pages[currentPage].id_pregunta}`}
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
                {currentPage + 1} de {preguntasQuiz.quiz.pages.length}
              </p>
            </QuizQuestionHeader>
            <fieldset>
              <CardQuestion>
                {preguntasQuiz.quiz.pages[currentPage].pregunta}
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
                  if (currentPage === preguntasQuiz.quiz.pages.length - 1) {
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
              {hasSendingError &&
              <ErrorText>
                {sendingError}  
              </ErrorText>}
              {hasRespuestasDiputadeError &&
              <ErrorText>
                {respuestasDiputadeError}  
              </ErrorText>}
              {hasRespuestasPartidoError &&
              <ErrorText>
                {respuestasPartidoError}  
              </ErrorText>}
            </QuizQuestionFooter>
          </CardQuestionContentContainer>
        </FullSizeFade>
      );
    }
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
            <ReadyHeader>
              Te mostraremos qué tanto te representó el diputado/a electo/a en el periodo 2018-2021 en tu distrito.
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
    const total = respuestasDiputade.length;

    for (let i = 0; i < userAnswers.length; i += 1) {
      if (
        ((userAnswers[i] as PreguntaType).respuesta as string).toLowerCase().trim()
          === respuestasDiputade[i].votacion.toLowerCase().trim()
      ) {
        percentageResult += 1;
      }
    }

    if (total > 0) {
      percentageResult = Math.round((percentageResult / total) * 100);
    }

    const partidoActualDiputade = PARTIDOS.find(p => p.name === diputade?.bancada_actual.toUpperCase())
      || PARTIDOS.find(p => p.name === 'SP');

    const partidoAnteriorDiputade = PARTIDOS.find(p => p.name === diputade?.bancada_original.toUpperCase())
      || PARTIDOS.find(p => p.name === 'SP');

    return (
      <FullSizeFade>
        <CardContentContainer>
          <ResHeader>
            Vives en el distrito {diputade?.distrito || -1} y el diputado/a actualmente electo/a ahí es...
          </ResHeader>
          <DiputadeContainer>
            <DiputadePhotoContainer>
              <DiputadePhoto
                alt='Foto del representante de tu distrito'
                src={diputade?.foto && isUrl(diputade.foto) ? diputade.foto : NoPhoto} 
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
            <span>
              <strong>De acuerdo con tus respuestas, el diputado/a de tu distrito se parece a ti en...</strong>
            </span>
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
    if (preguntasQuiz) {
      const resp = preguntasQuiz.quiz.pages.map((q, i)=> (
        <RepresentativeAnswer key={q.id_pregunta}>
          {q.pregunta_corta}: <UnderlinedSpan>
            {respuestasDiputade[i].votacion.toUpperCase().trim() === 'NA'
              ? 'SIN INFORMACIÓN SOBRE SU VOTO'
              : `${
                respuestasDiputade[i].votacion.toUpperCase().trim()
              } ${
                getEmojiByAnswer(respuestasDiputade[i].votacion.toUpperCase().trim())
              }`
            }
          </UnderlinedSpan>
          <YourAnswerSpan>
            (Tú votaste: {
              ((userAnswers[i] as PreguntaType).respuesta as string).toUpperCase().trim()
            } {
              getEmojiByAnswer(((userAnswers[i] as PreguntaType).respuesta as string).toUpperCase().trim())
            })
          </YourAnswerSpan>
        </RepresentativeAnswer>
      ));
  
      return (
        <FullSizeFade>
          <CardContentContainer>
            <RepAnswersHeader>
              Así votó el diputado/a electo/a en el periodo 2018-2021 de tu distrito (distrito {diputade?.distrito || '-1'}):
            </RepAnswersHeader>
            <AnswersWrapper>
              {resp}
            </AnswersWrapper>
            <Button onClick={() => setCurrentPage(currentPage + 1)}>
              Ver resultados por partido
            </Button>
          </CardContentContainer>
        </FullSizeFade>
      );
    }
  };
  
  const renderPartyAnswers = () => {
    const resp = respuestasPartidos.map((r) => {
      let percentageResult = 0;
      const total = respuestasPartidos.length;

      const partido = PARTIDOS.find(p => p.name === r.name.toUpperCase())
        || PARTIDOS.find(p => p.name === 'SP');

      for (let i = 0; i < userAnswers.length; i += 1) {
        if (
          ((userAnswers[i] as PreguntaType).respuesta as string).toLowerCase().trim()
            === r.answers[i].votacion.toLowerCase().trim()
        ) {
          percentageResult += 1;
        }
      }
  
      if (total > 0) {
        percentageResult = Math.round((percentageResult / total) * 100);
      }

      return (
        <PartyPercentageContainer key={r.id}>
          <PartyPhoto
            src={partido?.photo || ''}
            alt={partido?.longName || 'Partido político'}
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
              Si estás interesado/a en recibir más información sobre los votos del diputado/a electo/a, ¡regístrate aquí! 👇
            </IntroCardHeader>
          </ParagraphContainer>
          {!hasEmailSubmit && <InputZipCodeContainer>
            <label htmlFor='correo-electronico'>Correo electrónico:</label>
            <TextInput
              id='correo-electronico'
              type='email'
              onChange={handleEmailChange}
              error={hasEmailError}
              success={hasEmailSubmit}
              placeholder='Escribe aquí tu correo electrónico: '
              required
            />
          </InputZipCodeContainer>}
          {hasEmailSubmit &&
          <>
            <SuccessfulRegistrationText>
              ¡Registro exitoso!
            </SuccessfulRegistrationText>
            <LinkButton
              target='_blank'
              href='https://www.latitud312.com'
              rel='noopener'
            >
              Ir a Latitud 3°12
            </LinkButton>
          </>}
          {hasEmailError &&
          <ErrorText>
            {emailError}
          </ErrorText>}
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
    } else if (currentPage >= 0 && preguntasQuiz && currentPage < preguntasQuiz.quiz.pages.length) {
      return renderQuizCard();
    } else if (preguntasQuiz && currentPage === preguntasQuiz.quiz.pages.length) {
      return renderReadyCard();
    } else if (preguntasQuiz && currentPage === preguntasQuiz.quiz.pages.length + 1) {
      return renderRepResultsCard();
    } else if (preguntasQuiz && currentPage === preguntasQuiz.quiz.pages.length + 2) {
      return renderRepAnswersCard();
    } else if (preguntasQuiz && currentPage === preguntasQuiz.quiz.pages.length + 3) {
      return renderPartyAnswers();
    } else if (preguntasQuiz && currentPage === preguntasQuiz.quiz.pages.length + 4) {
      return renderRegisterEmailCard();
    }

    return <h1>Hubo un error. Intenta nuevamente.</h1>;
  };

  return (
    <main>
      <Navbar menuURLs={URLs} brandUrl={'https://www.latitud312.com/'} brandImgSrc={Logo} />
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
    </main>
  );
};

export default App;