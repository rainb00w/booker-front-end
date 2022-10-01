import { Stack, Autocomplete as MuiAutocomplete, TextField as MuiTextField, Button as MuiButton } from '@mui/material';
import { styled as styledMaterial } from "@mui/material/styles";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TrainingBooksList from '../TrainingBooksList/TrainingBooksList';

const Wrapper = styled.div`
@media screen and (min-width: 768px) {
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: space-around;
}
@media screen and (min-width: 1280px) {
  gap: 32px;
}
`;

export const Button = styledMaterial(MuiButton)((props) => ({
  display: 'block',
  width: '171px',
  height: '42px',
  margin: '0 auto',
  padding: 0,
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.21,
  textTransform: 'initial',
  color: '#000000',
  backgroundColor: 'transparent',
  border: '1px solid #242A37',
  borderRadius: 0,
  '@media screen and (min-width: 768px)': {
    margin: 0,
  },
  '@media screen and (min-width: 1280px)': {
    minWidth: '181px',
  }
}));

export const Autocomplete = styledMaterial(MuiAutocomplete)((props) => ({
  height: '42px',
  marginBottom: '32px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#FFFFFF',
  boxShadow: 'inset 0px 1px 2px rgba(29, 29, 27, 0.15)',
  borderColor: 'transparent',
  outline: 'transparent',
  '@media screen and (min-width: 768px)': {
    margin: 0,
  },
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    height: '42px',
  },
  '& .MuiFormControl-root > .MuiInputBase-root > input': {
    position: 'relative',
    top: -9,
    height: '42px',
    padding: 0,
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.21,
  },
  '& .MuiFormLabel-root': {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 1.21,
    color: '#A6ABB9',
  },
  '& .css-odcobn-MuiAutocomplete-root': {
    border: 'transparent',
    borderRadius: 0,
  },
  '& .MuiAutocomplete-endAdornment > .MuiButtonBase-root.MuiIconButton-root.MuiAutocomplete-popupIndicator': {
    color: '#000000',
  },
  '& .MuiSvgIcon-root.css-i4bv87-MuiSvgIcon-root': {
    fill: 'currentColor',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    height: '47px',
    border: '1px solid rgba(0,0,0,.25)',
    borderRadius: 0,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '2px solid #FF6B08',
    borderRadius: 0,
  },
}));

export const TextField = styledMaterial(MuiTextField)((props) => ({
  height: '42px',
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1.21,
  borderColor: 'transparent',
  borderRadius: 0,
}));

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
