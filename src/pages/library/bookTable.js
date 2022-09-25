import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTable.module.css';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export default function BookTable({
  text,
  title,
  author,
  year,
  pages,
  rating,
}) {
  return (
    <>
      <Typography variant="h3" gutterBottom className={s.title}>
        {text}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Book title</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Year</TableCell>
              <TableCell align="left">Pages</TableCell>
              {text === 'Already read' && (
                <TableCell align="left">Rating</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{title} </TableCell>
              <TableCell align="left">{author}</TableCell>
              <TableCell align="left">{year}</TableCell>
              <TableCell align="left">{pages}</TableCell>
              {text === 'Already read' && (
                <TableCell align="left">{rating}</TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
BookTable.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
