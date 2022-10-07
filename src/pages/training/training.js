import React, { useEffect, useState } from 'react';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';
import s from './training.module.scss';

import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
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
import { setTrainingState } from 'redux/auth/auth-slice';


import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import sprite from '../../img/sprite.svg';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const MyTrainingStyled = styled.div`
  @media screen and (min-width: 768px) {
    margin-bottom: 40px;
  }

  @media screen and (min-width: 1280px) {
    margin-bottom: 25px;
  }

  .trainingTitle {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.9;
    padding: 11px 47px;
    text-align: center;
    margin-bottom: 20px;

    color: red;
    background: red;
    box-shadow: 0px 2px 3px rgba(9, 30, 63, 0.1);
  }
`;

const DatePickerTrainingStyled = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
  }

  @media screen and (min-width: 1280px) {
    display: flex;
    justify-content: center;
    margin-top: 25px;
  }

  .datePickerWrapper {
    position: relative;

    @media screen and (min-width: 1280px) {
      &:not(:first-child) {
        margin-left: 45px;
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
  .datePickerTraining {
    font-size: 14px;
    line-height: 2.71;

    color: #red;

    padding-left: 47px;
    width: 270px;
    height: 42px;
    margin-bottom: 20px;
    border: 1px solid red;

    @media screen and (min-width: 768px) {
      width: 250px;
    }
    .datePicker .datePickerTraining {
      background-color: red;
    }
  }
`;

const applicationStyles = {
  control: provided => ({
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

  singleValue: (provided, state) => {
    return { ...provided, color: '#A6ABB9' };
  },

  dropdownIndicator: provided => ({
    ...provided,
    fill: '#242A37',
    padding: 12,
  }),
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="13px" height="7px" className="datePickerIconPolygon">
        <use href={sprite + '#icon-polygon'} />
      </svg>
    </components.DropdownIndicator>
  );
};

const initialState = {
  startDate: '',
  endDate: '',
};

const Training = () => {
  const { data } = useGetAllBooksQuery();
  const trainingData = useGetAllTrainingsQuery();
  const { isLoading } = useGetAllTrainingsQuery();
  const trainingStatus = useSelector(authSelectors.getTrainingStatus);
  const dispatch = useDispatch();
  // trainingData это объект, данные доступны  => trainingData.data


  //  console.log('DATA', trainingData.data);
  const sendToStatisticStartDate = trainingData?.data?.startDate;
  const sendToStatisticResults = trainingData?.data?.results;
  // console.log('startDate', trainingData.data.startDate ,'array', trainingData.data.results );

  const [selectedBook, setSelectedBook] = useState(null);
  const [booksArrayToSend, setBooksArrayToSend] = useState([]);
  const [addTraining] = useAddTrainingMutation();

  const [startDate, setStartDate] = useState(initialState.startDate);
  const [endDate, setEndDate] = useState(initialState.endDate);
  const [daysNumber, setDaysNumber] = useState(0);
  const [disable, setDisable] = useState(false);
  const [endYear, setEndYear] = useState(new Date(2022, 11, 31));
  const { t } = useTranslation();
  let bookTableArray = [];
  let isEmptyTraining = false;
  let booksNumbeFromBack = 0;

  if (trainingData?.data === undefined) {
    isEmptyTraining = true;
  }

  if (trainingStatus) {
    isEmptyTraining = true;
  }

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const deltaTime = end.valueOf() - start.valueOf();
      const deltaTimeObj = convertMs(deltaTime);
      setDaysNumber(deltaTimeObj.days);
    }
  }, [startDate, endDate]);

  const oneDay = 24 * 60 * 60 * 1000;
  const trainingDayEnd = new Date(trainingData?.data?.finishDate);
  const nowDate = new Date();

  const daysLeftFromBackEnd = Math.round(
    Math.abs((trainingDayEnd - nowDate) / oneDay) - 1
  );

  //  console.log(trainingData?.data.books.length);

  const incomeBooks = data?.payload?.books;

  const booksThatHaveToReadStatus = incomeBooks?.filter(
    book => book.status === 'toRead'
  );

  // console.log('booksThatHaveToReadStatus', booksThatHaveToReadStatus);

  const booksThatHaveReadingStatus = incomeBooks?.filter(
    book => book.status === 'reading'
  );

  // console.log('trining data books', trainingData?.data?.books);
  const booksLeft = trainingData?.data?.books.length;

  if (isEmptyTraining) {
    bookTableArray = booksArrayToSend;
    // console.log('Нет тренировки выводим список книг со статусом toRead');
  } else {
    bookTableArray = trainingData?.data?.books;
    booksNumbeFromBack = trainingData?.data?.books.length;
    // console.log('Тренировка есть выводим книги с traning ');
  }

  const addBookToSelected = () => {
    setDisable(true);
    const addBooksArray = booksThatHaveToReadStatus.filter(
      book => book._id === selectedBook._id
    );
    setBooksArrayToSend([...booksArrayToSend].concat(addBooksArray));
  };

  const booksThatNotSelected = booksThatHaveToReadStatus?.filter(
    el => !booksArrayToSend.includes(el)
  );

  const booksNumber = booksArrayToSend?.length;

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

  const startTraining = () => {
    // console.log('start date', startDate)
    // console.log('end date', endDate);
    const array = {
      startDate: startDate,
      finishDate: endDate,
      books: booksArrayToSend.map(element => ({ _id: element._id })),
    };

    // console.log(array)

    dispatch(setTrainingState(false));
    addTraining(array)
      .unwrap()
      .catch(error => Notify.success(error.data.message));

    // .then(payload => console.log('fulfilled', payload))
  };
  const today = new Date();
  const yearTitle = t('yearsCountdown');
  const trainingTitle = t('goalsCountdown');

  const handleStartSelect = value => {

    setStartDate(value);
  };

  const handleEndSelect = value => {

    // const convertedTime = value.setHours(12,4 ,5 4)
    // console.log(convertedTime);

    setEndDate(value);
  };

  // console.log('selectedBook', selectedBook)

  const handleSelectBook = selectedOption => {
    const { value, label } = selectedOption;
    setDisable(false);
    setSelectedBook(value);
  };

  return (
    <>
      {isLoading ? (
        <div className={s.profileMainLoader}>
          <div className={s.loader}>
            <svg className={s.circular_loader} viewBox="25 25 50 50">
              <circle
                className={s.loader_path}
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="#70c542"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className={s.main_container}>
          <div className={s.gridContainer}>
            <div className={s.gridItem1}>
              {isEmptyTraining ? (
                <div className={s.myTrainingContainer}>
                  <h3 className={s.myTrainingHeader}> {t('myTraining')}</h3>
                  <div className={s.datePicker_wrapper}>
                    <DatePickerTrainingStyled className="datePicker">
                      <div className="datePickerWrapper">
                        <DatePicker
                          className={s.datePicker}
                          placeholderText={t('start')}
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
                          placeholderText={t('finish')}
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
                        options={selectedOptions}
                        placeholder={t('chooseBooks')}
                        closeMenuOnSelect={true}
                        onChange={handleSelectBook}
                        clear
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
                    <Timer
                      selectedDate={trainingDayEnd}
                      title={trainingTitle}
                    />
                  </div>
                </div>
              )}

              {bookTableArray && (
                <div className={s.myTrainingContainer}>
                  <BookTableTraining
                    booksList={bookTableArray}
                    isEmptyTraining={isEmptyTraining}
                    onClick={removeItem}
                  />
                  <BookMobileTableTraining
                    booksList={bookTableArray}
                    onClick={removeItem}
                    isEmptyTraining={isEmptyTraining}
                  />
                  {isEmptyTraining && (
                    <button
                      className={s.startTrainingButton}
                      onClick={() => startTraining()}
                    >
                      {t('startTraning')}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className={s.gridItem2}>
              {isEmptyTraining ? (
                <>
                  <MyGoal
                    days={daysNumber}
                    books={booksNumber}
                    isTrainigEmpty={isEmptyTraining}
                  />
                </>
              ) : (
                <>
                  <MyGoal
                    days={daysLeftFromBackEnd}
                    books={booksNumbeFromBack}
                    booksLeft={booksLeft}
                    isTrainigEmpty={isEmptyTraining}
                  />
                </>
              )}
            </div>

            {!isEmptyTraining && (
              <>
                <div className={s.gridItem3}>
                  <ChartTraning trainingData={trainingData.data} />
                </div>
                <div className={s.gridItem4}>
                  <h2 className={s.resultsHeader}> {t('results')}</h2>
                  <SendPageForm startDate={sendToStatisticStartDate} />

                  <h2 className={s.statisticsHeader}> {t('statistics')}</h2>
                  <StatisticsList results={sendToStatisticResults} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Training;
