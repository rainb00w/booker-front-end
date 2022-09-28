import React from 'react';
import s from './bookAddForm.module.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const BookAddForm = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      year: '',
      pages: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Book title is required'),
      author: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Author is required'),
      year: Yup.string()
        .min(1, 'Too Short!')
        .max(5, 'Too Long!')
        .required('Year is required'),
      pages: Yup.string().max(5, 'Too Long!').required('Pages is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm({ values: '' });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <label htmlFor="title" className={s.label}>
          Book title
          {formik.errors.title && formik.touched.title ? (
            <div>{formik.errors.title}</div>
          ) : null}
          <input
            id="title"
            name="title"
            type="text"
            placeholder="..."
            onChange={formik.handleChange}
            value={formik.values.title}
            className={s.inputTitle}
          />
        </label>
        <label htmlFor="author" className={s.label}>
          Author
          {formik.errors.author && formik.touched.author ? (
            <div>{formik.errors.author}</div>
          ) : null}
          <input
            id="author"
            name="author"
            type="text"
            placeholder="..."
            onChange={formik.handleChange}
            value={formik.values.author}
            className={s.inputAuthor}
          />
        </label>
        <label htmlFor="year" className={s.label}>
          Publication date
          {formik.errors.year && formik.touched.year ? (
            <div>{formik.errors.year}</div>
          ) : null}
          <input
            id="year"
            name="year"
            type="text"
            placeholder="..."
            onChange={formik.handleChange}
            value={formik.values.date}
            className={s.inputDate}
          />
        </label>
        <label htmlFor="pages" className={s.label}>
          Amount of pages
          {formik.errors.pages && formik.touched.pages ? (
            <div>{formik.errors.pages}</div>
          ) : null}
          <input
            id="pages"
            name="pages"
            type="text"
            placeholder="..."
            onChange={formik.handleChange}
            value={formik.values.pages}
            className={s.inputPages}
          />
        </label>
        <button
          type="submit"
          className={s.btn}
          onClick={() => window.location.reload(false)}
        >
          Add
        </button>
      </form>
    </>
  );
};

export default BookAddForm;
