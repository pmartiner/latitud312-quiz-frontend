// Bibliotecas
import styled from 'styled-components';

// Colores
import { ACCENT_COLOR_DARK, ERROR_COLOR } from 'components/layout/const';

// Types
import { InputType } from 'src/types/index';

const TextInput = styled.input<InputType>`
  border: 2px solid ${props => props.error ? ERROR_COLOR : ACCENT_COLOR_DARK};
  border-radius: 6px;
  padding: 10px;
  width: 200px;
  font-size: 14px;
  color: ${ACCENT_COLOR_DARK};
`;

export default TextInput;