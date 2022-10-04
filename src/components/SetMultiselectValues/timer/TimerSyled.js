import styled from "styled-components";

export const TimerStyled = styled.div`
  display: flex;
  margin-bottom: 30px;
  padding-top: 25px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  @media screen and (min-width: 768px) {
    padding-top: 35px;
  }

  @media (min-width: 1280px) {
    margin-bottom: 40px;
    padding-top: 0;
  }
`;
