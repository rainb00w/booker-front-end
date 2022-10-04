import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimerLogicOfGoalStyled } from "./TimerLogicOfGoalStyled";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { useSelector } from "react-redux";
import { getTargetEndDate } from "../../../redux/target/targetSelectors";

const TimerLogicOfGoal = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const end = useSelector(getTargetEndDate);

  let endDate;

  if (!end) {
    endDate = "0000-00-00";
  } else {
    endDate = end.split(".").reverse().join("-");
  }

  const goal = new Date(endDate).getTime();

  const [, setDateTime] = useState(new Date());
  const oneDay = 86400000;

  const diff = Math.abs(goal + oneDay - new Date().getTime());

  const days = () => {
    if (Math.floor(diff / (1000 * 60 * 60 * 24)) > 9) {
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    return "0" + Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const hours = () => {
    if (Math.floor((diff / (1000 * 60 * 60)) % 24) > 9) {
      return Math.floor((diff / (1000 * 60 * 60)) % 24);
    }
    return "0" + Math.floor((diff / (1000 * 60 * 60)) % 24);
  };

  const minutes = () => {
    if (Math.floor((diff / 1000 / 60) % 60) > 9) {
      return Math.floor((diff / 1000 / 60) % 60);
    }
    return "0" + Math.floor((diff / 1000 / 60) % 60);
  };

  const seconds = () => {
    if (Math.floor((diff / 1000) % 60) > 9) {
      return Math.floor((diff / 1000) % 60);
    }
    return "0" + Math.floor((diff / 1000) % 60);
  };

  const time = {
    days: days(),
    hours: hours(),
    minutes: minutes(),
    seconds: seconds(),
  };

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <TimerLogicOfGoalStyled colors={theme}>
      <div className="time">
        {`${time.days || "00"}`}
        <p className="text">{t("DAYS")}</p>
      </div>
      <p className="upText">{t("Goal countdown")}</p>
      <div className="time">{`:`}</div>
      <div className="time">
        {`${time.hours || "00"}`} <p className="text">{t("HRS")}</p>
      </div>
      <div className="time">{`:`}</div>
      <div className="time">
        {`${time.minutes || "00"}`} <p className="text">{t("MINS")}</p>
      </div>
      <div className="time">{`:`}</div>
      <div className="time">
        {`${time.seconds || "00"}`} <p className="text">{t("SECS")}</p>
      </div>
    </TimerLogicOfGoalStyled>
  );
};

export default TimerLogicOfGoal;
