import React from 'react';
import BookAddForm from '../../components/bookAdd/bookAddForm';
import BookTable from '../../components/bookTable/bookTable';
import BookTableMobile from 'components/bookTable/bookMobileTable';
import BtnMyTraining from 'components/BtnLibrary/btnMyTraining';
import { useMediaQuery } from 'react-responsive';
import s from './library.module.css';

const Library = () => {
  const mobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <>
      <div className={s.section}>
        <BookAddForm />
        {mobile ? <BookTableMobile /> : <BookTable />}
        <BtnMyTraining />
      </div>
    </>
  );
};

export default Library;
