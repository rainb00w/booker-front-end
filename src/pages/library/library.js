import React from 'react';
import BookAddForm from './bookAddForm';
import BookTable from './bookTable';

const Library = () => {
  return (
    <>
      <h2>Library Section -------- </h2>
      <BookAddForm />
      <BookTable text="Already read" />
      <BookTable text="Reading now" />
      <BookTable text="Going to read" />
    </>
  );
};

export default Library;
