import React, { useState } from 'react';
import BookAddForm from '../../components/bookAdd/bookAddForm';
import BookTable from '../../components/bookTable/bookTable';
import BookTableMobile from 'components/bookTable/bookMobileTable';
import BtnMyTraining from 'components/BtnLibrary/btnMyTraining';
import AddBookBtnMobile from '../../components/addBookBtnMobile/addBookBtnMobile';
// import RatingBook from 'components/RatingBook';
import { useMediaQuery } from 'react-responsive';
import s from './library.module.css';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import Info from '../../components/EmptyLibrary/EmptyLibrary';

const Library = () => {
  const [showAdd, setShowAdd] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { data } = useGetAllBooksQuery();
  const handleClickAdd = () => {
    setShowAdd(true);
  };
  const handleClickClose = () => {
    setShowAdd(false);
  };
  return (
    <>
      {data?.payload.books.length > 0 ? (
        <div className={s.section}>
          {mobile && <AddBookBtnMobile handleClick={handleClickAdd} />}
          <BookAddForm handleClickClose={handleClickClose} showAdd={showAdd} />
          {mobile ? <BookTableMobile /> : <BookTable />}
          <BtnMyTraining />
        </div>
      ) : (
        <div className={s.section}>
          {mobile && (
            <>
              <AddBookBtnMobile handleClick={handleClickAdd} />
              <BookTableMobile />
            </>
          )}
          <BookAddForm handleClickClose={handleClickClose} showAdd={showAdd} />
          <Info />
        </div>
      )}
    </>
  );
};

export default Library;
