import styled from 'styled-components';
import calendarIcon from './calendar.svg';

export const Button = styled.button`
  background-color: #ff6b08;
  width: 171px;
  height: 42px;
  color: #fff;
  align-self: center;
`;

export const TrainingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;

export const StyledControlsWrapper = styled.div`
  & input {
    position: relative;
    display: block;
    width: 100%;
    height: 40px;
    padding: 2px 31px 2px 45px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.21;
    background-color: #f6f7fb;
    border: 1px solid #a6abb9;
    margin-bottom: 20px;
    @media screen and (min-width: 768px) {
      width: 250px;
      margin: 0;
    }
    &::after {
      position: absolute;
      top: 12px;
      left: 12px;
      content: ' ';
      background: no-repeat top left / 17px 17px url('${calendarIcon}');
    }
  }
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 40px;
    margin-bottom: 24px;
  }
  @media screen and (min-width: 1280px) {
    justify-content: center;
    gap: 44px;
  }
`;
export const Container = styled.div`
  background-color: #f6f7fb;
`;

export const TrainingContainer = styled.div`
  padding-top: 40px;
`;

export const TrainingMaine = styled.div`
  width: 70%;
`;

export const TrainingSidebar = styled.div`
  width: 25%;
`;
