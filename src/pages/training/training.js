import TrainingForm from '../../components/TrainingFrom';
import MyGoal from '../../components/MyGoal';
import ChartModal from '../../components/Chart/ChartModal';
import BookTableTraining from '../../components/bookTableTraining/bookTableTraining';
import BookMobileTableTraining from '../../components/bookTableTraining/bookMobileTableTraining';
import styled from 'styled-components';

import { useGetAllBooksQuery } from 'redux/books/booksApi';
import * as React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';

const Container = styled.div`
  background-color: #f6f7fb;
`;

const TrainingContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding-top: 40px;
`;

const TrainingMaine = styled.div`
  width: 70%;
`;

const TrainingSidebar = styled.div`
  width: 25%;
`;

const defaultChosenBooks = [
  {
    _id: '633430de05d976545f184b08',
    title: 'The Art of War',
    author: 'Sun Tzu',
    year: 1974,
    pages: 100,
    status: 'readed',
    owner: '6331e0bd7d50cafaf02cf8c8',
  },
  {
    _id: '6331fa40c8e0d7f99f187435',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    pages: 100,
    status: 'toRead',
    owner: '6331e0bd7d50cafaf02cf8c8',
  },
  {
    _id: '633430de05d976545f184b11',
    title: 'The Art of War',
    author: 'Sun Tzu',
    year: 1974,
    pages: 100,
    status: 'toRead',
    owner: '6331e0bd7d50cafaf02cf8c8',
  },
  {
    _id: '6331fa40c8e0d7f99f1874332',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    pages: 100,
    status: 'toRead',
    owner: '6331e0bd7d50cafaf02cf8c8',
  },
  {
    _id: '633430de05d976545f184b88',
    title: 'The Art of War',
    author: 'Sun Tzu',
    year: 1974,
    pages: 100,
    status: 'toRead',
    owner: '6331e0bd7d50cafaf02cf8c8',
  },
  {
    _id: '6331fa40c8e0d7f99f187436',
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    pages: 100,
    status: 'toRead',
    owner: '6331e0bd7d50cafaf02cf8c8',
  },
];

const Training = () => {
  const { data } = useGetAllBooksQuery();
  // тут получаем все Книги

  const trainingData = useGetAllTrainingsQuery();
  // trainingData это объект, данные доступны  => trainingData.data

  const [booksInfo, setBooksInfo] = useState([]);
  const [booksArrayToSend, setBooksArrayToSend] = useState(defaultChosenBooks);
  const [addTraining, { isLoading }] = useAddTrainingMutation();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleAddBooks = e => {
    e.preventDefault();
    setBooksArrayToSend(booksInfo);
  };

  const booksThatNotSelected = data?.payload.books.filter(
    el => !booksArrayToSend.includes(el)
  );

  const removeItem = id => {
    const newBooksArrayToSend = booksArrayToSend.filter(
      book => book._id !== id
    );
    const newBooksInfo = booksInfo.filter(book => book._id !== id);
    setBooksArrayToSend(newBooksArrayToSend);
    setBooksInfo(newBooksInfo);
  };

  const startTraining = () => {
    const array = {
      startDate: startDate.toISOString(),
      finishDate: endDate.toISOString(),
      books: booksArrayToSend.map(element => ({ _id: element._id })),
    };

    addTraining(array)
      .unwrap()
      .then(payload => console.log('fulfilled', payload))
      .catch(error => console.error('rejected', error));
  };

  return (
    <>
      <Container>
        <TrainingContainer>
          <TrainingMaine>
            <TrainingForm />
            <BookTableTraining
              booksList={booksArrayToSend}
              onClick={removeItem}
              isEmptyTraining={!trainingData.data}
            />
            <BookMobileTableTraining
              booksList={booksArrayToSend}
              onClick={removeItem}
              isEmptyTraining={!trainingData.data}
            />
          </TrainingMaine>

          <TrainingSidebar>
            <MyGoal />
            {/* <TrainingTitle text="Моя мета прочитати" /> */}
          </TrainingSidebar>
          {/* <p>asd</p> */}
        </TrainingContainer>
        <ChartModal />
      </Container>
    </>
  );
};

export default Training;
