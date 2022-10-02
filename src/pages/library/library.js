import React from 'react';
import BookAddForm from '../../components/bookAdd/bookAddForm';
import BookTable from '../../components/bookTable/bookTable';
import BookTableMobile from 'components/bookTable/bookMobileTable';
import BtnMyTraining from 'components/BtnLibrary/btnMyTraining';
import { useMediaQuery } from 'react-responsive';
import s from './library.module.css';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import Info from '../../components/EmptyLibrary/EmptyLibrary';

const Library = () => {
  const mobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { data } = useGetAllBooksQuery();
  return (
    <>
      {!data?.payload.books.length > 0 ? (
        <div className={s.section}>
          <BookAddForm />
          <Info />
        </div>
      ) : (
        <div className={s.section}>
          <BookAddForm />
          {mobile ? <BookTableMobile /> : <BookTable />}
          <BtnMyTraining />
        </div>
      )}
    </>
  );
};

export default Library;
