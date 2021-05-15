// Bibliotecas
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

// Types
type ProgressSizeMeterProps = {
  progress: number;
  meterColor?: string;
}

type ProgressBarBackgroundProps = {
  backgroundColor?: string;
}

type Props = ProgressBarBackgroundProps & ProgressSizeMeterProps & {
  children?: ReactNode;
};

const ProgressBarBackground = styled.div<ProgressBarBackgroundProps>`
  box-sizing: content-box;
  position: relative;
  background: ${props => props.backgroundColor ? props.backgroundColor : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 25px;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const ProgressBarMeter = styled.span<ProgressSizeMeterProps>`
  display: block;
  height: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: ${props => props.meterColor ? props.meterColor : 'rgb(43,194,83)'};
  position: relative;
  overflow: hidden;
  width: ${props => {
    if (props.progress <= 0) {
      return 1;
    } else if (props.progress > 100) {
      return 100;
    }

    return props.progress;
  }}%;

  :after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-size: 50px 50px;
    animation: move 2s linear infinite;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
  }

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 50px;
    }
  }
`;

const ProgressBar: FC<Props> = (props: Props) => {
  return (
    <ProgressBarBackground>
      <ProgressBarMeter progress={props.progress}/>
      {props.children}
    </ProgressBarBackground>
  );
};

export default ProgressBar;