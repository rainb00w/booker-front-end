import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import schemaValidChooseRating from '../../services/schemaValidChooseRating';
import ChooseRating from './ChooseRating/ChooseRating';
import { useTranslation } from 'react-i18next';
import { useUpdateBookResumeMutation } from 'redux/books/booksApi';
import s from './RatingBook.module.css';

const RatingBook = ({ toggleModal, id, resume = '', rating = 0 }) => {
  const [ratingValue, setRatingValue] = useState(rating);
  const { t } = useTranslation();
  const [updateBookResume] = useUpdateBookResumeMutation();

  return (
    <Formik
      initialValues={{ resume: resume }}
      validationSchema={schemaValidChooseRating}
      onSubmit={async ({ resume }) => {
        await updateBookResume({ id, rating: ratingValue, resume });
        toggleModal();
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <div className={s.container}>
            <h2 className={s.title}>{t('chooseRating')}</h2>
            <ChooseRating
              setRating={setRatingValue}
              rating={rating}
              name="rating"
            />
            <h2 className={s.title}>{t('resumeRating')}</h2>
            <Field
              as="textarea"
              placeholder="..."
              type="text"
              name="resume"
              maxLength={1000}
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
                {t('btnBack')}
              </button>
              <button type="submit" className={s.btnSave}>
                {t('btnSave')}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RatingBook;
