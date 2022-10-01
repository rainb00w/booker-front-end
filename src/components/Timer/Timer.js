import {
  StyledContainer,
  StyledItem,
  StyledValue,
  StyledTimerWrapper,
} from './Timer.style.js';
import { useState, useEffect, useRef } from 'react';
import convertMs from './convertMs';

const Timer = selectedDate => {
  const [time, setTime] = useState(() => Date.now());

  const intervalId = useRef(null);
  const deltaTime = Object.values(selectedDate)[0] - time;
  // const deltaTime = selectedDate - time;
  const timeLeft = convertMs(deltaTime);

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
      <StyledContainer>
        <StyledItem>
          <StyledValue>{timeLeft.days}</StyledValue>
          <span>дн</span>
        </StyledItem>
        <StyledItem>
          <StyledValue>{timeLeft.hours}</StyledValue>
          <span>год</span>
        </StyledItem>
        <StyledItem>
          <StyledValue> {timeLeft.minutes}</StyledValue>
          <span>хв</span>
        </StyledItem>
        <StyledItem>
          <StyledValue>{timeLeft.seconds}</StyledValue>
          <span>сек</span>
        </StyledItem>
      </StyledContainer>
    </StyledTimerWrapper>
  );
};
export default Timer;
