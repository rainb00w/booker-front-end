import styled from 'styled-components';

const StyledTitle = styled.h2`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  color: #FFFFFF;
  background-color: #b1b5c2;
  box-shadow: 0px 2px 3px rgba(9, 30, 63, 0.1);
  @media screen and (min-width: 768px) {
    margin-bottom: 28px;
  }
  @media screen and (min-width: 1280px) {
    margin-bottom: 24px;
  }
`;
const TrainingTitle = ({ text }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export default TrainingTitle;
