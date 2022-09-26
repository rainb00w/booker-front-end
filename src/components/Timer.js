import {
  StyledContainer,
  StyledItem,
  StyledValue,
  StyledTimerWrapper,
} from './Timer.style';
import { useState, useEffect, useRef } from 'react';

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

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    //  Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

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
