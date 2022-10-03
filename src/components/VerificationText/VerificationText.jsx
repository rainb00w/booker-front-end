import { Box, Typography, Link } from './VerificationText.styled';
import { Divider } from '@mui/material';

export default function VerificationText() {
  return (
    <Box>
      <Typography>Шановний користувач!</Typography>
      <Typography>Ви успішно створили обліковий запис Books Reading Application.</Typography>
      <Typography>Для входу в застосунок Books Reading натисніть наведену нижче кнопку.</Typography>
      <Divider sx={{marginBottom: '25px'}} />
      <Typography>Dear User,</Typography>
      <Typography>You are successfully created account for Books Reading Application.</Typography>
      <Typography>To login into Books Reading press the button below.</Typography>
      <Link to='/login'>Сторінка входу / Login Page</Link>
    </Box>
  );
}
