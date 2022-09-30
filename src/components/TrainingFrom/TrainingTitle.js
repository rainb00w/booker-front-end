import styled from 'styled-components';

const StyledTitle = styled.h2`
  color: white;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;

  background-color: #b1b5c2;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TrainingTitle = ({ text }) => {
  return <StyledTitle>{text}</StyledTitle>;
};
