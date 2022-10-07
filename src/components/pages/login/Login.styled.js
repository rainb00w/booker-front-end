import { TextField as MuiTextField } from '@mui/material';
import { styled } from '@mui/material';

export const TextField = styled(MuiTextField)((props) => ({
  padding: '12px 8px',
  minWidth: 280,
  height: 42,
  marginBottom: 10,
  background: '#F5F7FA',
  boxShadow: 'inset 0px 1px 2px rgba(29, 29, 27, 0.15)',
  outline: 'none',
  border: 'none',
  '&:: placeholder': {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.21,
    color: '#A6ABB9',
  },
  '& label': {
    display: 'none',
    // textAlign: 'left',
    // fontSize: 14,
    // color: '#FFFFFF',
    // margin: 0,
    // marginBottom: 8,
  },
  '& .MuiInputAdornment-root': {
    backgroundColor: '#F5F7FA',
  },
  '& input.MuiInputBaseInput.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
    backgroundColor: 'transparent',
    height: 42,
    padding: 0,
  },
  '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root': {
    height: 42,
    border: 'none',
    outline: 'none',
    padding: 0,
    fontFamily: "'Montserrat', sans-serif",
  },
  '& .MuiFormControl-root.MuiTextField-root.css-10g99pg-MuiFormControl-root-MuiTextField-root': {
    border: 'none',
    outline: 'none',
  },
  '& .MuiOutlinedInput': {
    border: 'none',
    outline: 'none',
  },
  '& .MuiInputBase-formControl': {
    marginTop: '-10px',
    padding: 0,
  },
  '& .MuiOutlinedInputBase-root.MuiOutlinedInput-notchedOutline.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
    border: 'none',
    outline: 'none',
  },
}));
