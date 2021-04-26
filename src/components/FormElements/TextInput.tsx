// Bibliotecas
import styled from 'styled-components';

// Colores
import { ACCENT_COLOR_DARK } from 'components/layout/const';

const TextInput = styled.input`
  border: 2px solid ${ACCENT_COLOR_DARK};
  border-radius: 6px;
  padding: 5px;
  width: 200px;
  font-size: 14px;
  color: ${ACCENT_COLOR_DARK};
`;

export default TextInput;