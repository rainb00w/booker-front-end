import React, { useEffect, useState } from 'react';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';
import s from './training.module.scss';

import DateView from 'react-datepicker';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select, { components } from 'react-select';
import SendPageForm from 'pages/statistics/sendPageForm';
import StatisticsList from 'pages/statistics/statisticsList';
import ChartTraning from 'components/Chart/ChartTraning';
import BookTableTraining from 'components/bookTableTraining/bookTableTraining';
import BookMobileTableTraining from 'components/bookTableTraining/bookMobileTableTraining';
import MyGoal from 'components/MyGoal';
import SelectBooksFirstStyled from 'components/SelectBooks/SelectBooksFirstStyled';
import Timer from 'components/Timer/Timer';
import convertMs from 'components/Timer/convertMs';
import FormikControl from 'components/FormikControl';

const StyledControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Training = () => {
  const { data } = useGetAllBooksQuery();
  // тут получаем все Книги

  const trainingData = useGetAllTrainingsQuery();
  // trainingData это объект, данные доступны  => trainingData.data

  // console.log('DATA', data.payload.books);
  console.log('DATA', trainingData.data);

  let isEmptyTraining = false;
  if (trainingData?.data === undefined) {
    isEmptyTraining = true;
  }

  const [selectedBook, setSelectedBook] = useState(null);
  const [booksArrayToSend, setBooksArrayToSend] = useState([]);
  const [addTraining, { isLoading }] = useAddTrainingMutation();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [daysNumber, setDaysNumber] = useState(0);
  const [disable, setDisable] = useState(false);
  const [endYear, setEndYear] = useState(new Date(2022, 11, 31));
  let bookTableArray = [];

  useEffect(() => {
    const today = new Date(Date.now());
    const year = today.getFullYear();
    setEndYear(new Date(`${year}`, 11, 31));
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const deltaTime = end.valueOf() - start.valueOf();
      const deltaTimeObj = convertMs(deltaTime);
      setDaysNumber(deltaTimeObj.days);
      console.log(deltaTimeObj.days);
    }
  }, [startDate, endDate]);

  const incomeBooks = data?.payload?.books;
  const booksThatHaveReadingStatus = incomeBooks?.filter(
    book => book.status === 'reading'
  );

  const handleSelectBook = selectedOption => {
    const { value } = selectedOption;
    setDisable(false);
    setSelectedBook(value);
  };

  if (booksThatHaveReadingStatus?.length > 0) {
    bookTableArray = booksThatHaveReadingStatus;
  } else {
    bookTableArray = incomeBooks;
  }

  const addBookToSelected = () => {
    setDisable(true);
    const addBooksArray = incomeBooks.filter(
      book => book._id === selectedBook._id
    );
    setBooksArrayToSend([...booksArrayToSend].concat(addBooksArray));
  };

  const booksThatNotSelected = incomeBooks?.filter(
    el => !booksArrayToSend.includes(el)
  );

  const selectedOptions = booksThatNotSelected?.map(({ title, _id }) => ({
    value: { _id },
    label: title,
  }));

  const removeItem = id => {
    const newBooksArrayToSend = booksArrayToSend?.filter(
      book => book._id !== id
    );
    setBooksArrayToSend(newBooksArrayToSend);
  };

  let booksNumber = booksArrayToSend?.length;

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

  const today = new Date();
  const yearTitle = 'До закінчення року залишилось';
  const trainingTitle = 'До досягнення мети залишилось';

  const handleStartSelect = value => {
    console.log(value);
  };

  const handleStartChange = value => {
    console.log(value);
    setStartDate(value);
  };
  const handleEndSelect = value => {
    console.log(value);
    setEndDate(value);
  };
  const handleDateChange = value => {
    console.log(value);
    setEndDate(value);
  };

  return (
    <>
      <div className={s.gridContainer}>
        <div>{isLoading && <p>In process...</p>}</div>
        <div className={s.gridItem1}>
          {isEmptyTraining ? (
            <>
              <h3 className={s.myTrainingHeader}>Моє тренування </h3>
              <div>
                <SelectBooksFirstStyled>
                  <Select
                    defaultValue={{ value: null, label: 'Оберіть книгу' }}
                    options={selectedOptions}
                    placeholder="Choose books from the library"
                    closeMenuOnSelect={true}
                    onChange={handleSelectBook}
                  />
                  <button
                    disabled={disable}
                    className="selectBooksButton"
                    onClick={addBookToSelected}
                  >
                    add
                  </button>
                </SelectBooksFirstStyled>
              </div>
      

              <DatePicker
                selected={startDate}
                onSelect={handleStartSelect} //when day is clicked
                // onChange={handleStartChange} //only when value has changed
              />
               <DatePicker
                selected={endDate}
                onSelect={handleEndSelect} //when day is clicked
                // onChange={handleDateChange} //only when value has changed
              />
            </>
          ) : (
            <div className={s.timerSection}>
              <div>
                <Timer selectedDate={endYear} title={yearTitle} />
              </div>
              <div>
                <Timer selectedDate={endDate} title={trainingTitle} />
              </div>
            </div>
          )}

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

        <div className={s.gridItem2}>
          <MyGoal days={daysNumber} books={booksNumber} />
        </div>

        <div className={s.gridItem3}>
          <ChartTraning />
        </div>

        <div className={s.gridItem4}>
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


  /* 
    startDate={}  
  {booksThatNotSelected?.map(element => (
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

{
  /* <form onSubmit={handleAddBooks}>
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
        </form> */
}

{
  /* {booksThatNotSelected?.map(element => (
                <option key={element._id} value={element._id}>
                  {element.title}
                </option>
              ))} */
}

{
  /* <div className={s.goalMainBox}>
  <div className={s.goalHeader}>Моя мета прочитати</div>
  <div>


  </div>
</div> */
}



        {/* <div>
            <Formik initialValues={{ startDate: new Date() }}>
              {({ values, setFieldValue }) => (
                <div className="row clearfix">
                  <div className="header"></div>
                  <Form>
                    <div className="row ml-4 mr-4">
                      <div className="form-group col-3 mb-2">
                        <DatePicker
                          selected={values.startDate}
                          placeholderText="Початок"
                          dateFormat="dd.MM.yyyy"
                          className={s.datePicker}
                          name="startDate"
                          selectsStart
                          minDate={today}
                          onChange={date => {
                            setFieldValue('startDate', date),
                              setStartDate(date);
                          }}
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
            <Formik initialValues={{ endDate: new Date() }}>
              {({ values, setFieldValue }) => (
                <div className="row clearfix">
                  <div className="header"></div>
                  <Form>
                    <div className="row ml-4 mr-4">
                      <div className="form-group col-3 mb-2">
                        <DatePicker
                          selected={values.endDate}
                          placeholderText="Початок"
                          dateFormat="dd.MM.yyyy"
                          className={s.datePicker}
                          name="endDate"
                          selectsStart
                          minDate={today}
                          onChange={date => {
                            setFieldValue('Кінець', date), setEndDate(date);
                          }}
                        />
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div> */}