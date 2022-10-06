import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import schemaValidChooseRating from '../../services/schemaValidChooseRating';
import ChooseRating from './ChooseRating/ChooseRating';
import s from './RatingBook.module.css';
import { useUpdateBookResumeMutation } from 'redux/books/booksApi';

const RatingBook = ({ toggleModal, id, resume = '', rating = 0 }) => {
  const [ratingValue, setRatingValue] = useState(rating);

  const [updateBookResume] = useUpdateBookResumeMutation();

  // const onSave = ({ resume, rating }) => {
  //   updateBookResume({ id, rating, resume });
  //   toggleModal();
  // };

  return (
    <Formik
      initialValues={{ resume: resume, rating: rating }}
      validationSchema={schemaValidChooseRating}
      onSubmit={async({ resume, rating }) => {
        await updateBookResume({ id, rating: ratingValue, resume })
        toggleModal();
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <div className={s.container}>
            <h2 className={s.title}>Обрати рейтинг книги</h2>
            <ChooseRating
              setRating={setRatingValue}
              rating={rating}
              name="rating"
            />
            <h2 className={s.title}>Резюме</h2>
            <Field
              as="textarea"
              placeholder="..."
              type="text"
              name="resume"
              className={
                `${touched.resume && errors.resume}` ? `${s.textarea}` : ''
              }
            />
            <ErrorMessage
              component="div"
              name="resume"
              className={s.errorMessage}
            />
            <div className={s.centered}>
              <button type="button" className={s.btnBack} onClick={toggleModal}>
                Назад
              </button>
              <button type="submit" className={s.btnSave}>
                Зберегти
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RatingBook;
