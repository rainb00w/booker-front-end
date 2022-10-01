import React from 'react';
import s from './bookAddForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddBookMutation } from 'redux/books/booksApi';

const BookAddForm = () => {
  const [addBook, { isLoading }] = useAddBookMutation();

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
      year: Yup.string().min(1, 'Too Short!').max(5, 'Too Long!'),
      pages: Yup.string()
        .min(1, 'Too Short!')
        .max(4, 'Too Long!')
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
    <>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <label htmlFor="title" className={s.label}>
          Book title *
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
          Author *
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
          Publication date
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
          Amount of pages *
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
          Add
        </button>
      </form>
      {isLoading && <p>Is Adding</p>}
    </>
  );
};

export default BookAddForm;
