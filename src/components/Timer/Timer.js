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
import ModalFinish from 'components/ModalFinish/ModalFinish.js';

const Timer = ({ selectedDate, title, openModal }) => {
  const [time, setTime] = useState(() => Date.now());

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleExit = () => {
    setOpen(false);
    // dispatch(setTrainingState(true));
  };

  const intervalId = useRef(null);
  // console.log(intervalId);
  
  // const deltaTime = Object.values(selectedDate)[0] - time;
  const deltaTime = selectedDate - time;
  const timeLeft = convertMs(deltaTime);

  if (deltaTime <= 0) {
    // clearInterval(intervalId);
    // setOpen(true);
    dispatch(setTrainingState(true));
  }

  useEffect(() => {
    if (intervalId.current === null) {
      intervalId.current = setInterval(() => {
        setTime(Date.now());
      }, 1000);
    }
  }, []);

  return (
    <>
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
       {open && <ModalFinish onClose={handleExit} />}  
    </>
  );
};
export default Timer;
