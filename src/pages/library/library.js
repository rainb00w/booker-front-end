import React from 'react';
import BookAddForm from '../../components/bookAdd/bookAddForm';
import BookTable from '../../components/bookTable/bookTable';
import BookTableMobile from 'components/bookTable/bookMobileTable';
import BtnMyTraining from 'components/BtnLibrary/btnMyTraining';
import { useMediaQuery } from 'react-responsive';

const Library = () => {
  const mobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <>
      <BookAddForm />
      {mobile ? (
        <BookTableMobile text="Already read" />
      ) : (
        <BookTable text="Already read" />
      )}
      {mobile ? (
        <BookTableMobile text="Reading now" />
      ) : (
        <BookTable text="Reading now" />
      )}
      {mobile ? (
        <BookTableMobile text="Going to read" />
      ) : (
        <BookTable text="Going to read" />
      )}
      <BtnMyTraining />
    </>
  );
};

export default Library;
