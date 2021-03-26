import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #135B7B;
  color: #ffff;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  margin-top: 16px;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background: ${shade(0.2, '#135B7B')};
  }
`;
