import React from 'react';
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
import { setTrainingStatusJustCompleted } from 'redux/auth/auth-slice';
import { useTranslation } from 'react-i18next';
import ModalFinishByTime from 'components/ModalFinishByTime/ModalFinishByTime';
import { authSelectors } from '../../redux/auth';

const Timer = ({ selectedDate, title }) => {
  const [time, setTime] = useState(() => Date.now());
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const intervalId = useRef(null);
  // const deltaTime = Object.values(selectedDate)[0] - time;
  const deltaTime = selectedDate - time;
  const timeLeft = convertMs(deltaTime);

  const [openModal, setOpenModal] = useState(false);

  // const handleExit = () => {
  //   setOpenModal(false);
  //   // refetchFucntion();
  //   // dispatch(setTrainingState('false'));
  // };

  const trainingStatusCompleted = useSelector(
    authSelectors.getTrainingStatusJustCompleted
  );

  if (deltaTime < 0) {
    clearInterval(intervalId.current);

    //  setOpenModal(true);
  }

  //Эта опция меняет статус тренировки и перерендеривается страница
  // dispatch(setTrainingState('false'));

  // Эта опция добавляет в редакс что тренировка закончена по вермени. Не обязательно это делать но вдруг пригодится
  // dispatch(setTrainingStatusJustCompleted('completedByTime'));

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
            <StyledSpan>{t('secs')}</StyledSpan>
          </StyledItem>
        </StyledContainer>
      </StyledTimerWrapper>{' '}
      {/* {openModal && <ModalFinishByTime onClose={handleExit} />}  */}
    </>
  );
};
export default Timer;
