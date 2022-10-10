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
  const deltaTime = Date.parse(selectedDate) - time;
  const timeLeft = convertMs(deltaTime);
  const deltaTimeAfterEnd = -(Date.parse(selectedDate) - time);
  const timeAfterEnd = convertMs(deltaTimeAfterEnd);
  const timeToShow = deltaTime >= 0 ? timeLeft : timeAfterEnd;

  const [openModal, setOpenModal] = useState(false);

  // console.log('intervalId.current', intervalId.current);
  const handleExit = () => {
    setOpenModal(false);
    dispatch(setTrainingState('false'));
    clearInterval(intervalId.current);
    // refetchFucntion();
  };

  // console.log(typeof selectedDate, selectedDate)
  // const trainingStatusCompleted = useSelector(
  //   authSelectors.getTrainingStatusJustCompleted
  // );

  // if (deltaTime < 0) {
  //   clearInterval(intervalId.current);
  // }

  //Эта опция меняет статус тренировки и перерендеривается страница
  // dispatch(setTrainingState('false'));

  // Эта опция добавляет в редакс что тренировка закончена по вермени. Не обязательно это делать но вдруг пригодится
  // dispatch(setTrainingStatusJustCompleted('completedByTime'));

  useEffect(() => {
    if (intervalId.current === null) {
      intervalId.current = setInterval(() => {
        setTime(Date.now());
        // console.log(intervalId.current);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (deltaTime <= 1000 && deltaTime >= 0) {
      setOpenModal(true);
      // clearInterval(intervalId.current);
      // intervalId.current = setInterval(() => {
      //   setTime(Date.now());
      //   console.log('new interval');
      // }, 1000);
      // return () => {
      //   console.log('unmount');
      //   console.log(intervalId.current);
      //   clearInterval(intervalId.current);
      // };
    }
  });

  return (
    <>
      <StyledTimerWrapper>
        <TimerTitle>{title}</TimerTitle>
        <StyledContainer>
          <StyledItem>
            <StyledValue>
              {timeToShow?.days < 10
                ? '0' + timeToShow?.days
                : timeToShow?.days}
            </StyledValue>
            <StyledSpan>{t('days')}</StyledSpan>
          </StyledItem>

          <StyledItem>
            <StyledValue>
              <StyledSeparator>:</StyledSeparator>
              {timeToShow?.hours < 10
                ? '0' + timeToShow?.hours
                : timeToShow?.hours}
            </StyledValue>
            <StyledSpan>{t('hrs')}</StyledSpan>
          </StyledItem>

          <StyledItem>
            <StyledValue>
              <StyledSeparator>:</StyledSeparator>
              {timeToShow?.minutes < 10
                ? '0' + timeToShow?.minutes
                : timeToShow?.minutes}
            </StyledValue>
            <StyledSpan>{t('mins')}</StyledSpan>
          </StyledItem>

          <StyledItem>
            <StyledValue>
              <StyledSeparator>:</StyledSeparator>
              {timeToShow?.seconds < 10
                ? '0' + timeToShow?.seconds
                : timeToShow?.seconds}
            </StyledValue>
            <StyledSpan>{t('secs')}</StyledSpan>
          </StyledItem>
        </StyledContainer>
      </StyledTimerWrapper>{' '}
      {openModal && <ModalFinishByTime onClose={handleExit} />}
    </>
  );
};
export default Timer;
