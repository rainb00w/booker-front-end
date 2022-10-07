import React, { useState } from 'react';
import BookAddForm from '../../components/bookAdd/bookAddForm';
import BookTable from '../../components/bookTable/bookTable';
import BookTableMobile from 'components/bookTable/bookMobileTable';
import BtnMyTraining from 'components/BtnLibrary/btnMyTraining';
import AddBookBtnMobile from '../../components/addBookBtnMobile/addBookBtnMobile';
import Section from '../../components/Section/Section';
import { useMediaQuery } from 'react-responsive';

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
        <Section>
          {mobile && <AddBookBtnMobile handleClick={handleClickAdd} />}
          <BookAddForm handleClickClose={handleClickClose} showAdd={showAdd} />
          {mobile ? (
            <div>{!showAdd && <BookTableMobile />}</div>
          ) : (
            <BookTable />
          )}
          <BtnMyTraining />
        </Section>
      ) : (
        <div>
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
