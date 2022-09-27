import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import s from './statisticsTable.module.css';

function createData(date, time, page) {
  return { date, time, page };
}

const rows = [
  createData('10.10.2019', '08:08:00', 32),
  createData('10.10.2019', '08:08:00', 154),
  createData('10.10.2019', '08:08:00', 6),
  createData('10.10.2019', '08:08:00', 17),
  createData('10.10.2019', '08:08:00', 18),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} className={s.tableContainer}>
      <Table
        sx={{ minWidth: 288 }}
        aria-label="simple table"
        className={s.table}
      >
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.date}
              sx={{
                border: 0,
              }}
              className={s.tableRow}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
                className={s.cellDate}
              >
                {row.date}
              </TableCell>
              <TableCell align="right" className={s.cellTime}>
                {row.time}
              </TableCell>
              <TableCell align="right" className={s.cellPage}>
                {row.page}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
