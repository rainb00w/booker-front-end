import React, { useEffect, useState } from 'react';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';
import s from './training.module.scss';

import { useTranslation } from 'react-i18next';
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
import sprite from '../../img/sprite.svg';

const DatePickerTrainingStyled = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 40px;
  }

  @media screen and (min-width: 1280px) {
    display: flex;
    justify-content: center;
  }

  .datePickerWrapper {
    position: relative;
    @media screen and (max-width: 767px) {
      &:first-of-type {
        margin-bottom: 20px;
      }
    }
  }

  .datePickerIcon {
    position: absolute;
    left: 17px;
    top: 11px;
    width: 17px;
    height: 17px;
  }

  .datePickerIconPolygon {
    position: absolute;
    right: 18px;
    top: 17px;
    width: 13px;
    height: 7px;
  }
`;

const applicationStyles = {
  control: (provided) => ({
    ...provided,
    width: 280,
    height: 42,
    marginBottom: 32,
    borderRadius: 0,
    cursor: 'pointer',
    '@media screen and (min-width: 768px)': {
      width: 483,
      marginBottom: 0,
    },
    '@media screen and (min-width: 1280px)': {
      width: 715,
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#A6ABB9',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    fill: '#242A37',
    padding: 12,
  })
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width='13px' height='7px' className="datePickerIconPolygon">
        <use href={sprite + '#icon-polygon'} />
      </svg>
    </components.DropdownIndicator>
  );
};

const Training = () => {
  const { data } = useGetAllBooksQuery();
  // тут получаем все Книги

  const trainingData = useGetAllTrainingsQuery();
  // trainingData это объект, данные доступны  => trainingData.data

 console.log('DATA', trainingData.data);
  const sendToStatisticStartDate = trainingData?.data?.startDate;
  const sendToStatisticResults = trainingData?.data?.results
  // console.log('startDate', trainingData.data.startDate ,'array', trainingData.data.results );


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
  const { t } = useTranslation();
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
  const yearTitle = t('yearsCountdown');
  const trainingTitle = t('goalsCountdown');

  const handleStartSelect = value => {
    console.log(value);
    setStartDate(value);
  };

  const handleEndSelect = value => {
    console.log(value);
    setEndDate(value);
  };


  return (
    <>
      <div className={s.gridContainer}>
        <div>{isLoading && <p>In process...</p>}</div>
        <div className={s.gridItem1}>
          {isEmptyTraining ? (
            <div className={s.myTrainingContainer}>
              <h3 className={s.myTrainingHeader}>   {t('myTraining')}</h3>
              <div className={s.datePicker_wrapper}>
                <DatePickerTrainingStyled className="datePicker">
                  <div className="datePickerWrapper">
                    <DatePicker
                      className={s.datePicker}
                      placeholderText="Start"
                      dateFormat="dd.MM.yyyy"
                      selected={startDate}
                      onChange={handleStartSelect}
                      selectsStart
                      minDate={today}
                      startDate={startDate}
                      endDate={endDate}
                    />
                    <svg className="datePickerIcon">
                      <use href={sprite + '#icon-calendar'} />
                    </svg>
                    <svg className="datePickerIconPolygon">
                      <use href={sprite + '#icon-polygon'} />
                    </svg>
                  </div>
                  <div className="datePickerWrapper">
                    <DatePicker
                      className={s.datePicker}
                      dateFormat="dd.MM.yyyy"
                      placeholderText="Finish"
                      selected={endDate}
                      onChange={handleEndSelect}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                    <svg className="datePickerIcon">
                      <use href={sprite + '#icon-calendar'} />
                    </svg>
                    <svg className="datePickerIconPolygon">
                      <use href={sprite + '#icon-polygon'} />
                    </svg>
                  </div>
                </DatePickerTrainingStyled>
              </div>
              <div className={s.select_container}>
                <SelectBooksFirstStyled>
                  <Select
                    defaultValue={{ value: null, label: t('chooseBooks') }}
                    options={selectedOptions}
                    placeholder="Choose books from the library"
                    closeMenuOnSelect={true}
                    onChange={handleSelectBook}
                    styles={applicationStyles}
                    components={{ DropdownIndicator }}
                  />
                  <button
                    disabled={disable}
                    className={s.selectButton}
                    onClick={addBookToSelected}
                  >
                       {t('btnAdd')}
                  </button>
                </SelectBooksFirstStyled>
              </div>
            </div>
          ) : (
            <div className={s.gridItem5}>
              <div>
                <Timer selectedDate={endYear} title={yearTitle} />
              </div>
              <div>
                <Timer selectedDate={endDate} title={trainingTitle} />
              </div>
            </div>
          )}

          {booksArrayToSend && (
            <div className={s.myTrainingContainer}>
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
              {isEmptyTraining && <button
                className={s.startTrainingButton}
                onClick={() => startTraining()}
              >
              
                {t('startTraning')}
              </button>}
            </div>
          )}
        </div>

        <div className={s.gridItem2}>
          <MyGoal days={daysNumber} books={booksNumber} />
        </div>

        <div className={s.gridItem3}>
          <ChartTraning trainingData={trainingData.data}/>
        </div>

        <div className={s.gridItem4}>
          <h2 className={s.resultsHeader}> {t('results')}</h2>   
          <SendPageForm startDate={sendToStatisticStartDate}/>

          <h2 className={s.statisticsHeader}> {t('statistics')}</h2>   
          <StatisticsList results={sendToStatisticResults} />
        </div>
      </div>
    </>
  );
};

export default Training;
