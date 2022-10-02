import { Wrapper, Autocomplete, TextField, Button } from './SelectBooks.style';
import { useEffect, useState } from 'react';
import TrainingBooksList from '../TrainingBooksList/TrainingBooksList';

const SelectBooks = ({ options, setArrayValue, ...rest }) => {
  const [value, setValue] = useState(null);
  const bookOptions = options?.map(option => option.title);
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    setArrayValue(booksList);
    console.log('useeffect');
  }, [booksList]);

  const onAddButtonClick = e => {
    const selectBook = options.find(book => book.title === value);
    console.log('selectBook', selectBook);

    setBooksList(prevBooksList => [...prevBooksList, selectBook]);
    console.log('booksList', booksList);
  };

  const onDelete = id => {
    setBooksList(prevState => prevState.filter(book => book._id !== id));
    console.log('booksList', booksList);
  };

  return (
    <>
      <Wrapper>
        <Autocomplete
          onChange={(event, newValue) => setValue(newValue)}
          val={value}
          options={bookOptions ? bookOptions : []}
          renderInput={params => <TextField {...params} label='Обрати книги з бібліотеки' />}
          fullWidth
          clearOnBlur
          clearOnEscape
        />
        <Button variant='text' type="button" onClick={onAddButtonClick}>
          Додати
        </Button>
      </Wrapper>
      <TrainingBooksList books={booksList} onDelete={onDelete} />
    </>
  );
};
export default SelectBooks;
