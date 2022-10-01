import TrainingForm from '../../components/TrainingFrom';
import MyGoal from '../../components/MyGoal';
import ChartModal from '../../components/Chart/ChartModal';
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

const Training = () => {
  const { data } = useGetAllBooksQuery();
  // тут получаем все Книги

  const trainingData = useGetAllTrainingsQuery();
  // trainingData это объект, данные доступны  => trainingData.data

  const [booksInfo, setBooksInfo] = useState([]);
  const [booksArrayToSend, setBooksArrayToSend] = useState([]);
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
          </TrainingMaine>

          <TrainingSidebar>
            <MyGoal />
            {/* <TrainingTitle text="Моя мета прочитати" /> */}
          </TrainingSidebar>
          {/* <p>asd</p> */}
        </TrainingContainer>
        <ChartModal />
      </Container>

      <div>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

        {booksThatNotSelected?.map(element => (
          <div key={element._id}>
            <input
              onChange={e => {
                // add to list
                if (e.target.checked) {
                  setBooksInfo([...booksInfo, element]);
                } else {
                  // remove from list
                  console.log('remove from list');
                  setBooksInfo(
                    booksInfo.filter(books => books._id !== element._id)
                  );
                }
              }}
              value={booksInfo}
              style={{ margin: '20px' }}
              type="checkbox"
            />
            <label htmlFor={element.title}>
              {element.title} , Автор : {element.author} , Страниц :{' '}
              {element.pages} , Год : {element.year}
            </label>
          </div>
        ))}
        <button onClick={handleAddBooks}>Додати в список</button>
      </div>
      <div>
        <p>Книги на отправку</p>
        {booksArrayToSend?.map(element => (
          <div key={element._id + 1}>
            <label htmlFor={element.title}>
              {element.title} , Автор : {element.author} , Страниц :{' '}
              {element.pages} , Год : {element.year}
              <button onClick={() => removeItem(element._id)}> Удалить </button>
            </label>
          </div>
        ))}

        <div>
          <button onClick={() => startTraining()}> Почати тренування </button>
        </div>
        {isLoading && <p>In process...</p>}
      </div>
    </>
  );
};

export default Training;
