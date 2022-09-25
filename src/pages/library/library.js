import React from 'react';
import BookAddForm from './bookAddForm';
import BookTable from './bookTable';

const Library = () => {
  return (
    <>
      <p>Library </p>
      <BookAddForm />
      <BookTable text="Already read" />
      <BookTable text="Reading now" />
      <BookTable text="Going to read" />
    </>
  );
};

export default Library;
