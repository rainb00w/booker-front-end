import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerTrainingStyled from "./DatePickerTrainingStyled";
import { ThemeContext } from "../../../App";
import { useContext } from "react";
import {
  addPreplanningEndtDate,
  addPreplanningStartDate,
} from "../../../../redux/target/targetActions";
import sprite from "../../../../images/sprite.svg";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const initialState = {
  startDate: "",
  endDate: "",
};

const DatePickerTraining = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(initialState.startDate);
  const [endDate, setEndDate] = useState(initialState.endDate);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const today = new Date();

  const onHandleStartDateChange = (date) => {
    setStartDate(date);

    let newDate = new Date(date);
    const firstDate = newDate.toLocaleDateString().slice(0, 10);

    dispatch(addPreplanningStartDate(firstDate));
  };

  const onHandleEndDateChange = (date) => {
    setEndDate(date);
    let newDate = new Date(date);
    const lastDate = newDate.toLocaleDateString().slice(0, 10);
    dispatch(addPreplanningEndtDate(lastDate));
  };

  return (
    <DatePickerTrainingStyled className="datePicker" colors={theme}>
      <div className="datePickerWrapper">
        <DatePicker
          className="datePickerTraining"
          placeholderText={t("Start")}
          dateFormat="dd.MM.yyyy"
          selected={startDate}
          onChange={onHandleStartDateChange}
          selectsStart
          minDate={today}
          startDate={startDate}
          endDate={endDate}
        />
        <svg className="datePickerIcon">
          <use href={sprite + "#icon-calendar"} />
        </svg>
        <svg className="datePickerIconPolygon">
          <use href={sprite + "#icon-polygon"} />
        </svg>
      </div>
      <div className="datePickerWrapper">
        <DatePicker
          className="datePickerTraining"
          dateFormat="dd.MM.yyyy"
          placeholderText={t("Finish")}
          selected={endDate}
          onChange={onHandleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={addDays(startDate, 31)}
        />
        <svg className="datePickerIcon">
          <use href={sprite + "#icon-calendar"} />
        </svg>
        <svg className="datePickerIconPolygon">
          <use href={sprite + "#icon-polygon"} />
        </svg>
      </div>
    </DatePickerTrainingStyled>
  );
};

export default DatePickerTraining;
