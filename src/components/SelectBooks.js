import { Stack, Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import TrainingBooksList from './TrainingBooksList ';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SelectBooks = ({ options, setArrayValue, ...rest }) => {
  const [value, setValue] = useState(null);
  const bookOptions = options.map(option => option.title);
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    setArrayValue(booksList);
    console.log('useeffect');
  }, [booksList]);

  const onAddButtonClick = e => {
    const selectBook = options.find(book => book.title === value);
    console.log('selectBook', selectBook);
    setBooksList(booksList => {
      booksList.push(selectBook);
      return booksList;
    });
    console.log('booksList', booksList);
  };

  const onDelete = id => {
    setBooksList(prevState => prevState.filter(book => book.id !== id));
    console.log('booksList', booksList);
  };

  return (
    <>
      <Wrapper>
        <Autocomplete
          onChange={(event, newValue) => setValue(newValue)}
          val={value}
          options={bookOptions}
          renderInput={params => <TextField {...params} />}
        />

        <button type="button" onClick={onAddButtonClick}>
          Додати
        </button>
      </Wrapper>
      <TrainingBooksList books={booksList} onDelete={onDelete} />
    </>
  );
};
export default SelectBooks;
