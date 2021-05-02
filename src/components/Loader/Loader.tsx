// Bibliotecas
import styled from 'styled-components';

const LOADER_SIZE = 50;

const Loader = styled.i`
  position: relative;
  &:before,
  &:after {
    content: '';
    width: ${LOADER_SIZE}px;
    height: ${LOADER_SIZE}px;
    top: ${LOADER_SIZE / 2}px;
    left: ${LOADER_SIZE / 2}px;
    border-radius: 50%;
    background-color: white;
    opacity: 0.6;
    position: absolute;
    animation: loader 2.0s infinite ease-in-out;
  }
  &:after {
    animation-delay: -1.0s;
  }


  @keyframes loader {
    0%,
    100% {
      transform: scale(0.0);
    }
    50% {
      transform: scale(1.0);
    }
  }
`;

export default Loader;
