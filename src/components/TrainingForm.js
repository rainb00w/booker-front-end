import { useState } from 'react';
import TrainingDataSelection from './TrainingDataSelection';
import { TrainingTitle } from './TrainingTitle';
import Timer from './Timer';
import { StyledTimerContainer } from './Timer.style';

const TrainingForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endYear, setEndYear] = useState(new Date(2022, 11, 31));
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [startTraining, setStartTraining] = useState(false);

  const onStartTraining = values => {
    console.log('start', values);
    const keys = Object.keys(values);
    console.log(keys);
    keys.forEach(key => {
      if (key === 'startDate') {
        setStartDate(values[key]);
      }
      if (key === 'endDate') {
        setEndDate(values[key]);
      }
      if (key === 'selectedBooks') {
        setSelectedBooks(values[key]);
      }
      if (endDate && selectedBooks.length > 0) {
        setStartTraining('true');
      }
    });
  };

  return (
    <>
      {!startTraining && (
        <div>
          <TrainingTitle text="Моє тренування" />
          <div>
            <TrainingDataSelection onStartTraining={onStartTraining} />
          </div>
        </div>
      )}
      {startTraining && (
        <StyledTimerContainer>
          <Timer endDate={endYear} />
          <Timer endDate={endDate} />
        </StyledTimerContainer>
      )}
    </>
  );
};
export default TrainingForm;
