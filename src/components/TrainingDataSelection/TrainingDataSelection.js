import { Formik, Form, Field, ErrorMessage } from 'formik';
import TrainingTitle from 'components/TrainingTitle/TrainingTitle';
import MyGoal from 'components/MyGoal/MyGoal';
import * as Yup from 'yup';
import FormikControl from '../../FormikControl/FormikControl';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import { useState, useEffect } from 'react';
import {
  StyledControlsWrapper,
  Button,
  Container,
  TrainingContainer,
  TrainingMaine,
  TrainingSidebar,
  TrainingWrapper,
} from './TrainingDataSelection.style';
import convertMs from '../../Timer/convertMs';

const TrainingDataSelection = ({ onStartTraining }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysNumber, setDaysNumber] = useState(0);
  const [booksNumber, setBooksNumber] = useState(0);
  const [booksArray, setBooksArray] = useState([]);

  useEffect(() => {
    // console.log(startDate);

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const deltaTime = end.valueOf() - start.valueOf();
      const deltaTimeObj = convertMs(deltaTime);
      setDaysNumber(deltaTimeObj.days);
      // console.log(deltaTimeObj.days);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setBooksNumber(booksArray.length);
  }, [booksArray]);

  const { data } = useGetAllBooksQuery();
  const booksOptions = data?.payload.books;

  const initialValues = {
    startDate: null,
    endDate: null,
    selectedBooks: [],
  };

  const validationSchema = Yup.object({
    startDate: Yup.date('Required').required('Required'),
    endDate: Yup.date().required('Required'),
    selectedBooks: Yup.array().min(1).required('Required'),
  });

  const onSubmit = values => {
    // console.log('Form data', values);
    onStartTraining(values);
    const [addTraining, { isLoading }] = useAddTrainingMutation();
    addTraining(values)
      .unwrap()
      .then(payload => console.log('fulfilled', payload))
      .catch(error => console.error('rejected', error));
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
    >
      {({ isValid }) => (
        <Form>
          <TrainingContainer>
            <TrainingWrapper>
              <TrainingMaine>
                <TrainingTitle text="Моє тренування" />
                <StyledControlsWrapper>
                  <FormikControl
                    control="data"
                    label="Початок"
                    name="startDate"
                    setValue={setStartDate}
                  />
                  <FormikControl
                    control="data"
                    label="Завершення"
                    name="endDate"
                    setValue={setEndDate}
                  />
                </StyledControlsWrapper>
                <FormikControl
                  control="multiselect"
                  name="selectedBooks"
                  options={booksOptions}
                  setValue={setBooksArray}
                />
              </TrainingMaine>

              <TrainingSidebar>
                <MyGoal days={daysNumber} books={booksNumber} />
              </TrainingSidebar>
            </TrainingWrapper>

            <Button onSubmit={onSubmit} disabled={!isValid} type="submit">
              Почати тренування
            </Button>
          </TrainingContainer>
        </Form>
      )}
    </Formik>
  );
};

export default TrainingDataSelection;
