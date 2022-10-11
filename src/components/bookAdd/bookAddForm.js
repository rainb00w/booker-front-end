import React from 'react';
import classNames from 'classnames';
import s from './bookAddForm.module.css';
import svgPath from 'services/svgPath';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddBookMutation, useGetAllBooksQuery } from 'redux/books/booksApi';
import { useTranslation } from 'react-i18next';
import { SpinnerCircular } from 'spinners-react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Info from '../../components/EmptyLibrary/EmptyLibrary';

const BookAddForm = ({ handleClickClose, showAdd }) => {
  const [addBook, { isLoading, error }] = useAddBookMutation();
  const { t, i18n } = useTranslation();
  const { data } = useGetAllBooksQuery();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      year: '',
      pages: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(1, t('book_err_title1'))
        .max(50, t('book_err_title2'))
        .matches(/^[^\s-]/, t('book_err_title3'))
        .required(t('book_err_title4')),
      author: Yup.string()
        .min(1, t('book_err_author1'))
        .max(50, t('book_err_author2'))
        .matches(/^[^\s-]/, t('book_err_author3'))
        .matches(/^\D+$/, t('book_err_author4'))
        .required(t('book_err_author5')),
      year: Yup.number()
        .typeError(t('book_err_year1'))
        .min(1000, t('book_err_year2'))
        .max(2022, t('book_err_year3')),
      pages: Yup.number()
        .typeError(t('book_err_pages1'))
        .min(1, t('book_err_pages2'))
        .max(9999, t('book_err_pages3'))
        .required(t('book_err_pages4')),
    }),
    onSubmit: async ({ title, author, year, pages }, { resetForm }) => {
      if (year === '') {
        await addBook({
          title,
          author,
          pages,
        })
          .then(() => {
            Notify.success(t('book__add__message1'));
          })
          .catch(error => {
            Notify.error(t('book__add__message2'));
          });
      } else {
        await addBook({
          title,
          author,
          year,
          pages,
        })
          .then(() => {
            Notify.success(t('book__add__message1'));
          })
          .catch(error => {
            Notify.error(t('book__add__message2'));
          });
      }
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
          <div className={s.wrapper}>
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
          </div>
          <button
            type="submit"
            className={s.btn}
            // onClick={() => window.location.reload(false)}
          >
            {t('btnAdd')}
          </button>
        </form>
        {isLoading ? (
          <SpinnerCircular className={s.spinner} />
        ) : (
          data?.payload.books.length === 0 && <Info />
        )}
      </div>
    </div>
  );
};

export default BookAddForm;
