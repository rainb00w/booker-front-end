import styled from 'styled-components';
import calendarIcon from './calendar.svg';

export const Button = styled.button`
  display: block;
  width: 171px;
  height: 42px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  background-color: #ff6b08;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: #D15807;
  }
  &:disabled {
    color: #b1b5c2;
    background-color: transparent;
    border-color: #b1b5c2;
  }
  @media screen and (min-width: 768px) {
    width: 200px;
    height: 40px;
  }
  @media screen and (min-width: 1280px) {
    margin-left: 380px;
    margin-right: 0;
  }
`;

export const TrainingWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media screen and (min-width: 1280px) {
    flex-direction: row;
    gap: 32px;
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
  min-width: 320px;
  margin-left: auto;
  margin-right: auto;
  padding: 32px 20px;
  background-color: #F6F7FB;
  @media screen and (min-width: 768px) {
    min-width: 768px;
    padding: 40px 32px;
  }
  @media screen and (min-width: 1280px) {
    width: 1280px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const TrainingMaine = styled.div`
  @media screen and (min-width: 1280px) {
    width: 928px;
  }
`;

export const TrainingSidebar = styled.div`
  @media screen and (min-width: 1280px) {
    width: 288px;
  }
`;
