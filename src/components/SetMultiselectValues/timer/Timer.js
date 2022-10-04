import React from "react";
import TimerLogicOfGoal from "./TimerLogicOfGoal/TimerLogicOfGoal";
import TimerLogicOfYear from "./TimerLogicOfYear/TimerLogicOfYear";
import { TimerStyled } from "./TimerSyled";

const Timer = () => {
  return (
    <TimerStyled>
      <TimerLogicOfYear />
      <TimerLogicOfGoal />
    </TimerStyled>
  );
};

export default Timer;
