import React from 'react';
import classNames from 'classnames';
import s from './bookAddForm.module.css';
import svgPath from 'services/svgPath';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddBookMutation } from 'redux/books/booksApi';
import { useTranslation } from 'react-i18next';

const BookAddForm = ({ handleClickClose, showAdd }) => {
  const [addBook, { isLoading }] = useAddBookMutation();
  const { t, i18n } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      year: '',
      pages: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(1, 'Book name must be more than 1!')
        .max(50, 'Book title should be less than 50')
        .matches(/^[^\s-]/, 'Name should not start from space or dash')
        .required('Book title is required'),
      author: Yup.string()
        .min(1, 'Author name must be more than 1!')
        .max(50, 'Author name should be less than 50')
        .matches(/^[^\s-]/, 'Name should not start from space or dash')
        .matches(
          /^[a-zA-Zа-яА-ЯіІїЇєЄ]+(([' -][a-zA-Zа-яА-ЯіІїЇєЄ])?[a-zA-Zа-яА-ЯіІїЇєЄ]*)*$/,
          'THIS FIELD CANNOT CONTAIN NUMBERS'
        )
        .required('Author is required'),
      year: Yup.number()
        .typeError('Year should be a number')
        .min(1000, 'Books have been publishing since 1000!')
        .max(2022, 'Year should be less than currentYear!'),
      pages: Yup.number()
        .typeError('Pages should be a number')
        .min(10, 'Too Short!')
        .max(9999, 'Must be no more than 4 characters')
        .required('Pages is required'),
    }),
    onSubmit: async ({ title, author, year, pages }, { resetForm }) => {
      await addBook({
        title,
        author,
        year,
        pages,
      });
      resetForm();
      handleClickClose();
    },
  });

  return (
    <div
      className={showAdd ? s.formCont : classNames(s.formCont, s.formHidden)}
    >
      <div>
        <span onClick={handleClickClose} className={s.backBtn}>
          <svg>
            <use href={svgPath.back + '#back'}></use>
          </svg>
        </span>
        <form onSubmit={formik.handleSubmit} className={s.form}>
          <label htmlFor="title" className={s.labelTitle}>
            {t('bookTitle')} *
            <input
              id="title"
              name="title"
              type="text"
              placeholder="..."
              onChange={formik.handleChange}
              value={formik.values.title}
              className={s.inputTitle}
            />
            {formik.errors.title && formik.touched.title ? (
              <div className={s.message}>{formik.errors.title}</div>
            ) : null}
          </label>
          <label htmlFor="author" className={s.labelAuthor}>
            {t('author')} *
            <input
              id="author"
              name="author"
              type="text"
              placeholder="..."
              onChange={formik.handleChange}
              value={formik.values.author}
              className={s.inputAuthor}
            />
            {formik.errors.author && formik.touched.author ? (
              <div className={s.message}>{formik.errors.author}</div>
            ) : null}
          </label>
          <label htmlFor="year" className={s.labelDate}>
            {t('publicationDate')}
            <input
              id="year"
              name="year"
              type="text"
              placeholder="..."
              onChange={formik.handleChange}
              value={formik.values.year}
              className={s.inputDate}
            />
            {formik.errors.year && formik.touched.year ? (
              <div className={s.message}>{formik.errors.year}</div>
            ) : null}
          </label>
          <label htmlFor="pages" className={s.labelPages}>
            {t('amountOfPages')} *
            <input
              id="pages"
              name="pages"
              type="text"
              placeholder="..."
              onChange={formik.handleChange}
              value={formik.values.pages}
              className={s.inputPages}
            />
            {formik.errors.pages && formik.touched.pages ? (
              <div className={s.message}>{formik.errors.pages}</div>
            ) : null}
          </label>
          <button
            type="submit"
            className={s.btn}
            // onClick={() => window.location.reload(false)}
          >
            {t('btnAdd')}
          </button>
        </form>
        {isLoading && <p>Is Adding</p>}
      </div>
    </div>
  );
};

export default BookAddForm;
