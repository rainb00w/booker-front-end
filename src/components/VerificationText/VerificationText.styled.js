import { Box as MuiBox, Typography as MuiTypography, Button as MuiButton } from '@mui/material';
import { styled } from "@mui/material/styles";
import { Link as DomLink } from 'react-router-dom';

export const Box = styled(MuiBox)((props) => ({
  maxWidth: 320,
  margin: '32px auto',
  padding: '0px 20px',
  '@media screen and (min-width: 768px)': {
    maxWidth: 500,
    margin: '64px auto',
  },
  '@media screen and (min-width: 1280px)': {
    maxWidth: 900,
    margin: '90px auto'
  }
}));

export const Typography = styled(MuiTypography)((props) => ({
  marginBottom: '20px',
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 500,
  fontSize: 13,
  lineHeight: 1.23,
  color: '#242A37',
  '@media screen and (min-width: 768px)': {
    fontSize: 24,
    lineHeight: 1.58,
  },
  '@media screen and (min-width: 1280px)': {
    lineHeight: 1.67,
  }
}));

export const Link = styled(DomLink)((props) => ({
  display: 'block',
  margin: '0 auto',
  padding: '20px 60px',
  fontFamily: '"Montserrat", sans-serif',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: 1.25,
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: '#ff6b08',
  borderColor: 'transparent',
  borderRadius: 0,
  cursor: 'pointer',
  transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: '#D15807',
  },
  '@media screen and (min-width: 768px)': {
    // width: 200,
  },
  '@media screen and (min-width: 1280px)': {
    // minWidth: 181,
  }
}));
