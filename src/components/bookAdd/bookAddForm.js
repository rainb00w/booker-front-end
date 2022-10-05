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
        .max(50, 'Book title should be less than 50')
        .matches(/^[^\s-]/, 'Name should not start from space or dash')
        .required('Book title is required'),
      author: Yup.string()
        .max(50, 'Author name should be less than 50')
        .matches(
          /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$/,
          'Author name must contain letters'
        )
        .required('Author is required'),
      year: Yup.string()
        .typeError('Year should be a number')
        .min(4, 'Year must consist of 4 digits!')
        .max(4, 'Year should be less than currentYear!'),
      pages: Yup.string()
        .typeError('Pages should be a number')
        .min(1, 'Too Short!')
        .max(4, 'Must be no more than 4 characters')
        .required('Pages is required'),
    }),
    onSubmit: ({ title, author, year, pages }, { resetForm }) => {
      addBook({
        title,
        author,
        year,
        pages,
      }).then(resetForm({ values: '' }));
      // resetForm({ values: '' });
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
        <form
          onSubmit={() => {
            formik.handleSubmit();
            handleClickClose();
          }}
          className={s.form}
        >
          <label htmlFor="title" className={s.label}>
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
              <div>{formik.errors.title}</div>
            ) : null}
          </label>
          <label htmlFor="author" className={s.label}>
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
              <div>{formik.errors.author}</div>
            ) : null}
          </label>
          <label htmlFor="year" className={s.label}>
            {t('publicationDate')}
            <input
              id="year"
              name="year"
              type="text"
              placeholder="..."
              onChange={formik.handleChange}
              value={formik.values.date}
              className={s.inputDate}
            />
            {formik.errors.year && formik.touched.year ? (
              <div>{formik.errors.year}</div>
            ) : null}
          </label>
          <label htmlFor="pages" className={s.label}>
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
              <div>{formik.errors.pages}</div>
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
