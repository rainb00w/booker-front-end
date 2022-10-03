import styled from 'styled-components';
const StyledError = styled.div`
  color: red;
  width: 100px;
  white-space: pre-wrap;
`;

const TextError = props => {
  return;
  <StyledError>{props.children}</StyledError>;
};
export default TextError;
