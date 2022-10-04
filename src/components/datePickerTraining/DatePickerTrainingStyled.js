import styled from "styled-components";

const DatePickerTrainingStyled = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
  }

  @media screen and (min-width: 1280px) {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }

  .datePickerWrapper {
    position: relative;

    @media screen and (min-width: 1280px) {
      &:not(:first-child) {
        margin-left: 45px;
      }
    }
  }
  .datePickerIcon {
    position: absolute;
    left: 17px;
    top: 11px;
    width: 17px;
    height: 17px;
  }
  .datePickerIconPolygon {
    position: absolute;
    right: 18px;
    top: 17px;
    width: 13px;
    height: 7px;
  }
  .datePickerTraining {
    font-size: 14px;
    line-height: 2.71;

    color: black;

    padding-left: 47px;
    width: 270px;
    height: 42px;
    margin-bottom: 20px;
    border: 1px solid black;

    @media screen and (min-width: 768px) {
      width: 250px;
    }
    .datePicker .datePickerTraining {
      background-color: black;
    }
  }
`;

export default DatePickerTrainingStyled;
