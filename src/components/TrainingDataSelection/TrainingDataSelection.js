import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import FormikControl from '../FormikControl/FormikControl';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import calendarIcon from './calendar.svg';
// import { classNames } from 'classnames';

const StyledControlsWrapper = styled.div`
  & input {
    position: relative;
    display: block;
    width: 100%;
    height: 40px;
    padding: 2px 31px 2px 45px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.21;
    background-color: #F6F7FB;
    border: 1px solid #A6ABB9;
    margin-bottom: 20px;
    @media screen and (min-width: 768px) {
      width: 250px;
      margin: 0;
    }
    &::after {
      position: absolute;
      top: 12px;
      left: 12px;
      content: ' ';
      background: no-repeat top left / 17px 17px url('${calendarIcon}');
    }
  }
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 40px;
    margin-bottom: 24px;
  }
  @media screen and (min-width: 1280px) {
    justify-content: center;
    gap: 44px;
  }
`;

// const booksOptions = [
//   { id: 1, title: 'book1' },
//   { id: 2, title: 'book2' },
//   { id: 3, title: 'book3' },
//   { id: 4, title: 'book4' },
//   { id: 5, title: 'book5' },
// ];

const TrainingDataSelection = ({ onStartTraining }) => {
  const { data } = useGetAllBooksQuery();

  const booksOptions = data?.payload.books;
  // console.log('booksOptions - ', booksOptions);

  const initialValues = {
    startDate: null,
    endDate: null,
    selectedBooks: [],
  };

  const validationSchema = Yup.object({
    startDate: Yup.date().required('required'),
    endDate: Yup.date().required('required'),
    selectedBooks: Yup.array().required('required'),
  });

  const onSubmit = values => {
    console.log('Form data', values);
    onStartTraining(values);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <StyledControlsWrapper>
            <FormikControl control="data" label="Початок" name="startDate" />
            <FormikControl control="data" label="Завершення" name="endDate" />
          </StyledControlsWrapper>
          <FormikControl
            control="multiselect"
            name="selectedBooks"
            options={booksOptions}
          />

          <button onSubmit={onSubmit} type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TrainingDataSelection;
