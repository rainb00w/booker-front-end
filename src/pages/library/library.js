import React, { useState } from 'react';
import BookAddForm from '../../components/bookAdd/bookAddForm';
import BookTable from '../../components/bookTable/bookTable';
import BookTableMobile from 'components/bookTable/bookMobileTable';
import BtnMyTraining from 'components/BtnLibrary/btnMyTraining';
import AddBookBtnMobile from '../../components/addBookBtnMobile/addBookBtnMobile';
import { useMediaQuery } from 'react-responsive';
import { useGetAllBooksQuery, useAddBookMutation } from 'redux/books/booksApi';
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
        <div style={{ paddingBottom: mobile ? '100px' : '40px' }}>
          {mobile && (
            <div>
              {!showAdd && <AddBookBtnMobile handleClick={handleClickAdd} />}
            </div>
          )}
          <BookAddForm handleClickClose={handleClickClose} showAdd={showAdd} />
          {mobile ? (
            <div>{!showAdd && <BookTableMobile />}</div>
          ) : (
            <BookTable />
          )}
          <BtnMyTraining />
        </div>
      ) : (
        <div>
          {mobile && (
            <>
              <AddBookBtnMobile handleClick={handleClickAdd} />
              <BookTableMobile />
            </>
          )}
          <BookAddForm handleClickClose={handleClickClose} showAdd={showAdd} />
        </div>
      )}
    </>
  );
};

export default Library;
