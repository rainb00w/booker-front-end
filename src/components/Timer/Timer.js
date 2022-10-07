import {
  StyledContainer,
  StyledItem,
  StyledValue,
  StyledTimerWrapper,
  TimerTitle,
  StyledSpan,
  StyledSeparator,
} from './Timer.style.js';
import { useState, useEffect, useRef } from 'react';
import convertMs from './convertMs';
import { useDispatch, useSelector } from 'react-redux';
import { setTrainingState } from 'redux/auth/auth-slice';

const Timer = ({ selectedDate, title }) => {
  const [time, setTime] = useState(() => Date.now());
  const dispatch = useDispatch();


  const intervalId = useRef(null);
  // const deltaTime = Object.values(selectedDate)[0] - time;
  const deltaTime = selectedDate - time;
  const timeLeft = convertMs(deltaTime);


 if (deltaTime <= 0 ) {
  dispatch(setTrainingState(true));
 }

  useEffect(() => {
    if (intervalId.current === null) {
      intervalId.current = setInterval(() => {
        setTime(Date.now());
      }, 1000);
  
      return;
    }

    return clearInterval(intervalId);
  }, []);

  return (
    <StyledTimerWrapper>
      <TimerTitle>{title}</TimerTitle>
      <StyledContainer>
        <StyledItem>
          <StyledValue>{timeLeft.days}</StyledValue>
          <StyledSpan>дн</StyledSpan>
        </StyledItem>

        <StyledItem>
          <StyledValue>
            <StyledSeparator>:</StyledSeparator>
            {timeLeft.hours}
          </StyledValue>
          <StyledSpan>год</StyledSpan>
        </StyledItem>

        <StyledItem>
          <StyledValue>
            <StyledSeparator>:</StyledSeparator>
            {timeLeft.minutes}
          </StyledValue>
          <StyledSpan>хв</StyledSpan>
        </StyledItem>

        <StyledItem>
          <StyledValue>
            <StyledSeparator>:</StyledSeparator>
            {timeLeft.seconds}
          </StyledValue>
          <StyledSpan>сек</StyledSpan>
        </StyledItem>
      </StyledContainer>
    </StyledTimerWrapper>
  );
};
export default Timer;
