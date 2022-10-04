import React, { useEffect, useState } from 'react';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';
import s from './training.module.scss';

import Select, { components } from "react-select";
import SendPageForm from 'pages/statistics/sendPageForm';
import StatisticsList from 'pages/statistics/statisticsList';
import ChartTraning from 'components/Chart/ChartTraning';
import BookTableTraining from 'components/bookTableTraining/bookTableTraining';
import BookMobileTableTraining from 'components/bookTableTraining/bookMobileTableTraining';
import MyGoal from 'components/MyGoal';
import SelectBooksStyled from 'components/selectBooks/SelectBooksStyled';

const Training = () => {
  const { data } = useGetAllBooksQuery();
  // тут получаем все Книги

  const trainingData = useGetAllTrainingsQuery();
  // trainingData это объект, данные доступны  => trainingData.data

  // console.log('DATA', data.payload.books);

  let isEmptyTraining = false;
  if (trainingData?.data === undefined) {
    isEmptyTraining = true;
  }
  // console.log('isEmptyTraining', isEmptyTraining);





  const [booksInfo, setBooksInfo] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [booksArrayToSend, setBooksArrayToSend] = useState([]);
  const [addTraining, { isLoading }] = useAddTrainingMutation();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  let bookTableArray = [];

  const incomeBooks = data?.payload?.books;
  const booksThatHaveReadingStatus = incomeBooks?.filter(
    book => book.status === 'reading'
  );

  const handleSelectBook = (selectedOption) => {
    const { value } = selectedOption;
    setSelectedBook(value);
  };


  const selectedOptions = incomeBooks?.map(({ title, _id }) => ({
    value: { _id },
    label: title,
  }));




  // console.log('booksThatHaveReadingStatus', booksThatHaveReadingStatus);
  // console.log('booksArrayToSend', incomeBooks);
  // console.log('selectedOptions', selectedOptions);
  // console.log('selectedBook', selectedBook);


  if (booksThatHaveReadingStatus?.length > 0) {
    bookTableArray = booksThatHaveReadingStatus;
  } else {
    bookTableArray = incomeBooks;
  }

  const addBookToSelected = () => {
    const temporaryArray = incomeBooks.filter(book => book._id === selectedBook._id)
    setBooksArrayToSend([...booksArrayToSend].concat(temporaryArray))
    console.log(booksArrayToSend);
  };

  // const handleAddBooks = e => {
  //   e.preventDefault();
  //   console.log('selectedBook', selectedBook);
  //   const arrayToSend = data?.payload.books.filter(
  //     el => el._id === selectedBook
  //   );
  //   setBooksArrayToSend(booksArrayToSend.concat(arrayToSend));
  // };

  // const booksThatNotSelected = data?.payload.books.filter(
  //   el => !booksArrayToSend.includes(el)
  // );

  const removeItem = id => {
    // const newBooksArrayToSend = booksArrayToSend.filter(
    //   book => book._id !== id
    // );
    // const newBooksInfo = booksInfo.filter(book => book._id !== id);
    // setBooksArrayToSend(newBooksArrayToSend);
    // setBooksInfo(newBooksInfo);
  };

  const startTraining = () => {
    const array = {
      startDate: startDate.toISOString(),
      finishDate: endDate.toISOString(),
      books: booksArrayToSend.map(element => ({ _id: element._id })),
    };

    addTraining(array)
      .unwrap()
      .catch(error => console.error('rejected', error));

    // .then(payload => console.log('fulfilled', payload))
  };

  return (
    <>
      <div>
        {/* <div><Timer/></div> */}

        {/* <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} /> */}
      </div>
      <div>
        <div></div>
        {isLoading && <p>In process...</p>}
      </div>

      <div className={s.gridContainer}>
        {/* <div className={s.gridItem1}>1</div> */}

        {/* <form onSubmit={handleAddBooks}>
          <select
            className={s.addField}
            onChange={e => setSelectedBook(e.currentTarget.value)}
          >
            <option disabled></option>
            {booksThatNotSelected?.map(element => (
              <option key={element._id} value={element._id} name={element._id}>
                {element.title}
              </option>
            ))}
          </select>
          <button className={s.addButton} type="Submit">
            Додати
          </button>
        </form> */}

        {/* {booksThatNotSelected?.map(element => (
                <option key={element._id} value={element._id}>
                  {element.title}
                </option>
              ))} */}

      

        {/* <div className={s.goalMainBox}>
  <div className={s.goalHeader}>Моя мета прочитати</div>
  <div>


  </div>
</div> */}

        <div className={s.gridItem2}>
          <MyGoal />
        </div>
        <div>
          <SelectBooksStyled>
            <Select
              options={selectedOptions}
              placeholder="Choose books from the library"
              closeMenuOnSelect={true}
              onChange={handleSelectBook}
               
            />
            <button
              // disabled={disable}
              className="selectBooksButton"
               onClick={addBookToSelected}
            >
              add
            </button>
          </SelectBooksStyled>
        </div>

        <div className={s.gridItem3}>
          {booksArrayToSend && (
            <div>
              <BookTableTraining
                booksList={booksArrayToSend}
                isEmptyTraining={isEmptyTraining}
                onClick={removeItem}
              />
              <BookMobileTableTraining
                booksList={booksArrayToSend}
                onClick={removeItem}
                isEmptyTraining={isEmptyTraining}
              />
              <button
                className={s.startTraingButton}
                onClick={() => startTraining()}
              >
                Почати тренування
              </button>
            </div>
          )}
        </div>
        <div className={s.gridItem4}>
          <ChartTraning />
        </div>
        <div className={s.gridItem5}>
          <h2 className={s.resultsHeader}>Результати</h2>
          <SendPageForm />
          <h2 className={s.statisticsHeader}>Статистика</h2>
          <StatisticsList />
        </div>
      </div>
    </>
  );
};

export default Training;

{
  /* {booksThatNotSelected?.map(element => (
          <div key={element._id}>
            <input
              onChange={e => {
                if (e.target.checked) {
                  setBooksInfo([...booksInfo, element]);
                } else {
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
        ))} */
}
