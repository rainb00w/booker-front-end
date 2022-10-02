import { useEffect, useState } from 'react';
import TrainingDataSelection from 'components/TrainingDataSelection/TrainingDataSelection';
import ChartModal from '../../components/Chart/ChartModal';
import Timer from 'components/Timer/Timer';
import { StyledTimerContainer } from './training.style';
import BookTableTraining from 'components/bookTableTraining/bookTableTraining';
import BookMobileTableTraining from 'components/bookTableTraining/bookMobileTableTraining';
import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';

const Training = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endYear, setEndYear] = useState(new Date(2022, 11, 31));
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [startTraining, setStartTraining] = useState(false);

  const trainingData = useGetAllTrainingsQuery();
  console.log(trainingData);

  useEffect(() => {
    console.log('useEffect');
    if (trainingData.status === 'fulfilled') {
      const { books, finishDate } = trainingData.data;
      setEndDate(new Date(finishDate));
      setSelectedBooks(books);
      setStartTraining(true);
      console.log('startTraining', startTraining);
    }
  }, [trainingData]);

  // const status = trainingData.status;
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
      if (key === 'selectedBooks') {
        setSelectedBooks(values[key]);
      }
      if (endDate && selectedBooks.length > 0) {
        setStartTraining(true);
      }
    });
  };

  return (
    <>
      {!startTraining && (
        <TrainingDataSelection onStartTraining={onStartTraining} />
      )}
      {startTraining && (
        <>
          <StyledTimerContainer>
            <Timer endDate={endYear} />
            <Timer endDate={endDate} />
          </StyledTimerContainer>
          <BookTableTraining
            booksList={selectedBooks}
            isEmptyTraining={false}
          />
          <BookMobileTableTraining
            booksList={selectedBooks}
            isEmptyTraining={false}
          />
        </>
      )}
      <ChartModal />
    </>
  );
};

export default Training;
