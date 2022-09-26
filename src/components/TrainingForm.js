import { useState } from 'react';
import PeriodSelection from './PeriodSelection';
import { TrainingTitle } from 'components/TrainingTitle';
import Timer from 'components/Timer';
import { StyledTimerContainer } from './Timer.style';

const TrainingForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endYear, setEndYear] = useState(new Date(2022, 11, 31));

  const onStartTraining = values => {
    const keys = Object.keys(values);
    console.log(keys);
    keys.forEach(key => {
      if (key === 'startDate') {
        setStartDate(values[key]);
      }
      if (key === 'endDate') {
        setEndDate(values[key]);
      }
    });
  };

  return (
    <>
      {!endDate && (
        <div>
          <TrainingTitle text="Моє тренування" />
          <div>
            <PeriodSelection onStartTraining={onStartTraining} />
          </div>
        </div>
      )}
      {endDate && (
        <StyledTimerContainer>
          <Timer endDate={endYear} />
          <Timer endDate={endDate} />
        </StyledTimerContainer>
      )}
    </>
  );
};
export default TrainingForm;
