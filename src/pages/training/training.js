import React, { useEffect, useState } from 'react';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import { useAddTrainingMutation } from 'redux/books/trainingApi';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';
import s from './training.module.scss';
// import ModalFinish from 'components/ModalFinish/ModalFinish';

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
import { setTrainingStatusJustCompleted } from 'redux/auth/auth-slice';
import ModalFinish from 'components/ModalFinish/ModalFinish';

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
    gap: 40px;
    margin-top: 30px;
  }

  @media screen and (min-width: 1280px) {
    justify-content: center;
    gap: 44px;
    margin-top: 25px;
  }

  .datePickerWrapper {
    position: relative;

    &:first-of-type {
      margin-bottom: 20px;

      @media screen and (min-width: 768px) {
        margin-bottom: 0;
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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [addTraining] = useAddTrainingMutation();
  const trainingStatus = useSelector(authSelectors.getTrainingStatus);
  const trainingStatusCompleted = useSelector(
    authSelectors.getTrainingStatusJustCompleted
  );

  const nowDate = new Date();
  const [startDate, setStartDate] = useState(initialState.startDate);
  const [endDate, setEndDate] = useState(initialState.endDate);
  const [endYear, setEndYear] = useState(new Date(2023, 0, 1).toString());

  const [daysNumber, setDaysNumber] = useState(0);
  const [disable, setDisable] = useState(false);

  const incomeBooksData = useGetAllBooksQuery();
  const incomeBooks = incomeBooksData?.data?.payload?.books;
  const booksThatHaveToReadStatus = incomeBooks?.filter(
    book => book.status === 'toRead'
  );

  const { currentData, isLoading, isError, refetch } =
    useGetAllTrainingsQuery();
  //  console.log(currentData)
  const finishDateFromTraining = new Date(currentData?.finishDate);
  const startDateFromTraining = new Date(currentData?.startDate);
  const booksLeftFromTraining = currentData?.books.length;
  const resultsFromTraining = currentData?.results;
  const booksFromTraining = currentData?.books;

  // console.log('resultsFromTraining', resultsFromTraining);

  if (!currentData?.completed && finishDateFromTraining > nowDate) {
    dispatch(setTrainingState('true'));
  }
  // if (currentData?.completed) {
  //   dispatch(setTrainingState('false'));
  // }

  const oneDay = 24 * 60 * 60 * 1000;
  let trainingDisable = true;
  let bookTableArray = [];
  let booksNumbeFromBack = 0;

  let daysLeftFromBackEnd = Math.ceil(
    Math.abs((finishDateFromTraining - nowDate) / oneDay) - 1
  );

  // console.log('endYear', endYear);
  // console.log('daysLeftFromBackEnd', daysLeftFromBackEnd);

  const [selectedBook, setSelectedBook] = useState(null);
  const [booksArrayToSend, setBooksArrayToSend] = useState([]);
  const booksNumber = booksArrayToSend?.length;

  if (!trainingStatus) {
    bookTableArray = booksArrayToSend;
  } else {
    bookTableArray = booksFromTraining;
    booksNumbeFromBack = booksFromTraining?.length;
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

  let selectRef = null;

  const addBookToSelected = () => {
    setDisable(true);
    const addBooksArray = booksThatHaveToReadStatus.filter(
      book => book._id === selectedBook._id
    );
    setBooksArrayToSend([...booksArrayToSend].concat(addBooksArray));

    selectRef.clearValue();
  };

  const booksThatNotSelected = booksThatHaveToReadStatus?.filter(
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

  if (startDate && endDate && booksArrayToSend.length > 0) {
    trainingDisable = false;
  }

  const startTraining = () => {
    const array = {
      startDate: startDate,
      finishDate: endDate,
      books: booksArrayToSend.map(element => ({ _id: element._id })),
    };
    console.log(array);

    addTraining(array)
      .unwrap()
      .then(
        console.log('then')
        // dispatch(setTrainingState('true')),
        // setTimeout(() => {
        //   setDaysNumber(0);
        //   setBooksArrayToSend([]);
        //   incomeBooksData.refetch();
        //   setStartDate(initialState.startDate);
        //   setEndDate(initialState.endDate);
        //   setTrainingStatusJustCompleted('false');
        // }, 2000)
      )
      .catch(error => Notify.success(error.data.message));
  };

  // setDaysNumber(0)

  const today = new Date();
  // let nextDayToStart = new Date(startDate);
  // nextDayToStart?.setDate(nextDayToStart.getDate()+1);

  const yearTitle = t('yearsCountdown');
  const trainingTitle = t('goalsCountdown');

  const handleStartSelect = value => {
    setStartDate(value);
  };
  const handleEndSelect = value => {
    setEndDate(value);
  };

  const handleSelectBook = selectedOption => {
    if (!selectedOption) {
      return;
    }

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
            {trainingStatus && (
              <div className={s.gridItem5}>
                <div>
                  <Timer selectedDate={endYear} title={yearTitle} />
                </div>
                {finishDateFromTraining && (
                  <div>
                    <Timer
                      selectedDate={finishDateFromTraining}
                      title={trainingTitle}
                    />
                  </div>
                )}
              </div>
            )}
            <div className={s.gridItem2}>
              {!trainingStatus ? (
                <>
                  <MyGoal
                    days={daysNumber}
                    books={booksNumber}
                    isTrainigEmpty={trainingStatus}
                  />
                </>
              ) : (
                <>
                  <MyGoal
                    days={daysLeftFromBackEnd}
                    books={booksNumbeFromBack}
                    booksLeft={booksLeftFromTraining}
                    isTrainigEmpty={trainingStatus}
                  />
                </>
              )}
            </div>

            <div className={s.gridItem1}>
              {!trainingStatus && (
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
                          minDate={today}
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
                        ref={ref => {
                          selectRef = ref;
                        }}
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
              )}

              {bookTableArray && (
                <div className={s.myTrainingContainer}>
                  <BookTableTraining
                    booksList={bookTableArray}
                    isEmptyTraining={!trainingStatus}
                    onClick={removeItem}
                  />
                  <BookMobileTableTraining
                    booksList={bookTableArray}
                    onClick={removeItem}
                    isEmptyTraining={!trainingStatus}
                  />

                  {!trainingStatus && (
                    <>
                      <button
                        disabled={trainingDisable}
                        className={s.startTrainingButton}
                        onClick={() => startTraining()}
                      >
                        {t('startTraning')}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className={s.gridItem3}>
              <ChartTraning trainingData={currentData} />
            </div>

            {trainingStatus && (
              <>
                <div className={s.gridItem4}>
                  <h2 className={s.resultsHeader}> {t('results')}</h2>
                  <SendPageForm
                    startDate={startDateFromTraining}
                    refetchFucntion={refetch}
                  />

                  <h2 className={s.statisticsHeader}> {t('statistics')}</h2>
                  <StatisticsList results={resultsFromTraining} />
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
