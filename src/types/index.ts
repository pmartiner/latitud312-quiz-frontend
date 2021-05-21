import { ReactNode } from 'react';

export type ChildrenProps = {
  children?: ReactNode;
}

export type InputType = {
  error?: boolean;
  success?: boolean;
}

export type OptionType = {
  id: string | number;
  name: string;
}

type PartyType = {
  id: string;
  name: string;
  logo: string;
}

type SubType = {
  id: string;
  fullName: string;
}

export type RepAnswersType = {
  id: string;
  fullName: string;
  photo: string;
  previousParty: PartyType;
  currentParty: PartyType;
  sub: SubType;
  answers: string[];
  district: string;
}

export type PartyAnswerType = {
  id: string;
  name: string;
  color: string;
  logo: string;
  answers: string[];
}