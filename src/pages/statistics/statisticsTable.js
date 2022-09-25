import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    <TableContainer component={Paper}>
      <Table sx={{ width: 288 }} aria-label="simple table">
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.date}
              sx={{
                border: 0,
              }}
            >
              <TableCell
                sx={{
                  fontFamily: 'Montserrat',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.21,
                  color: '#242A37',
                  p: 0,
                }}
                component="th"
                scope="row"
                align="center"
              >
                {row.date}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  lineHeight: 1.21,
                  color: '#898F9F',
                  p: 0,
                }}
                align="right"
              >
                {row.time}
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  lineHeight: 1.21,
                  color: '#242A37',
                  p: 0,
                }}
                align="right"
              >
                {row.page}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
