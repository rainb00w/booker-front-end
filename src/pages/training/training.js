import { useEffect, useState } from 'react';
import TrainingDataSelection from 'components/TrainingDataSelection/TrainingDataSelection';
import ChartModal from '../../components/Chart/ChartModal';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';
import SendPageForm from '../statistics/sendPageForm';
import Statistics from '../statistics/statistics';

const Training = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endYear, setEndYear] = useState(new Date(2022, 11, 31));
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [startTraining, setStartTraining] = useState(false);

  const trainingData = useGetAllTrainingsQuery();
  console.log(trainingData);

  const { data } = useGetAllBooksQuery();
  const booksOptions = data?.payload.books;

  useEffect(() => {
    console.log('useEffect');
    if (trainingData.status === 'fulfilled') {
      const { books, finishDate } = trainingData.data;
      setEndDate(new Date(finishDate));

      const findBooks = books.reduce((acc, { _id }) => {
        const findBook = booksOptions.find(
          bookOption => bookOption._id === _id
        );
        return [...acc, findBook];
      }, []);

      setSelectedBooks(findBooks);
      setStartTraining(true);
    }
    console.log('startTraining', selectedBooks);
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
        <Statistics
          endDate={endDate}
          endYear={endYear}
          selectedBooks={selectedBooks}
        />
      )}
      <ChartModal />
    </>
  );
};

export default Training;
