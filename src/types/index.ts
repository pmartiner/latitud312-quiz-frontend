import { ReactNode } from 'react';

export type ChildrenProps = {
  children?: ReactNode;
}

export type InputType = {
  error: boolean;
}

type QuizInputType = {
  label: string;
  value: string;
};

type QuizPagesType = {
  question: string;
  input: {
    type: string;
    values: QuizInputType[];
  };
}

export type QuizQuestionsType = {
  quiz: {
    pages: QuizPagesType[];
  };
}