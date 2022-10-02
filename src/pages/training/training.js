import { useState } from 'react';
import TrainingDataSelection from 'components/TrainingDataSelection/TrainingDataSelection';
import ChartModal from '../../components/Chart/ChartModal';
import Timer from 'components/Timer/Timer';
import { StyledTimerContainer } from './training.style';
// import RatingBook from 'components/RatingBook';

import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';

const Training = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endYear, setEndYear] = useState(new Date(2022, 11, 31));
  const [selectedBooks, setSelectedBooks] = useState([]);
  // const [startTraining, setStartTraining] = useState(false);
  // const { data } = useGetAllBooksQuery();
  const trainingData = useGetAllTrainingsQuery();
  console.log(trainingData);

  const status = trainingData.status;
  // const onStartTraining = values => {
  //   // console.log('start', values);
  //   const keys = Object.keys(values);
  //   console.log(keys);
  //   keys.forEach(key => {
  //     if (key === 'startDate') {
  //       setStartDate(values[key]);
  //     }
  //     if (key === 'endDate') {
  //       setEndDate(values[key]);
  //     }
  //     if (key === 'selectedBooks') {
  //       setSelectedBooks(values[key]);
  //     }
  //     if (endDate && selectedBooks.length > 0) {
  //       setStartTraining('true');
  //     }
  //   });
  // };

  return (
    <>
      {status !== 'fulfilled' && <TrainingDataSelection />}
      {status === 'fulfilled' && (
        <StyledTimerContainer>
          <Timer endDate={endYear} />
          <Timer endDate={endDate} />
        </StyledTimerContainer>
      )}
      <ChartModal />
    </>
  );
};

export default Training;
