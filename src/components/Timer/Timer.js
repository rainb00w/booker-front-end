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
import { useTranslation } from 'react-i18next';

const Timer = ({ selectedDate, title, openModal }) => {
  const [time, setTime] = useState(() => Date.now());
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    <StyledTimerWrapper>
      <TimerTitle>{title}</TimerTitle>
      <StyledContainer>
        <StyledItem>
          <StyledValue>{timeLeft.days}</StyledValue>
          <StyledSpan>{t('days')}</StyledSpan>
        </StyledItem>

        <StyledItem>
          <StyledValue>
            <StyledSeparator>:</StyledSeparator>
            {timeLeft.hours}
          </StyledValue>
          <StyledSpan>{t('hrs')}</StyledSpan>
        </StyledItem>

        <StyledItem>
          <StyledValue>
            <StyledSeparator>:</StyledSeparator>
            {timeLeft.minutes}
          </StyledValue>
          <StyledSpan>{t('mins')}</StyledSpan>
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
      //  {open && <ModalFinish onClose={handleExit} />}  
    </>
  );
};
export default Timer;
