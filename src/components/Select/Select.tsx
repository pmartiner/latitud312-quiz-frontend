// Bibliotecas
import React, { ChangeEvent, FC, SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

// Types
import { OptionType } from 'types/index';
import { ACCENT_COLOR_DARK } from '../layout/const';

const SelectWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 400px;
  padding: 15px 5px;
`;

const SelectLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: ${ACCENT_COLOR_DARK};
  padding-bottom: 5px;
`;

const Select = styled.select`
  font-size: 16px;
  color: ${ACCENT_COLOR_DARK};
  border: 2px solid ${ACCENT_COLOR_DARK};
  border-radius: 6px;
  padding: 10px;
  width: 200px;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;
  appearance: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 15px;
  cursor: pointer;
`;

type Props = {
  label: string;
  id: string;
  options: OptionType[];
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent) => void;
} & SelectHTMLAttributes<HTMLSelectElement>

const SelectComponent: FC<Props> = (props: Props) => {
  const options = props.options.map(opt => (
    <option key={opt.id} value={opt.id}>
      { opt.name }
    </option>
  ));

  return (
    <SelectWrapper>
      <SelectLabel htmlFor={props.id} >{ props.label ? props.label : '' }</SelectLabel>
      <Select id={props.id} onChange={props.onChange} defaultValue=''>
        <option value='' disabled>
          { props.placeholder ? props.placeholder : 'Seleccione una opción' }
        </option>
        {options}
      </Select>
    </SelectWrapper>
  );
};

export default SelectComponent;