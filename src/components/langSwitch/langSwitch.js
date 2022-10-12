import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import s from './langSwitch.module.css';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177dd' : '#ff6b08',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#A6ABB9',
    boxSizing: 'border-box',
  },
}));

export default function CustomizedSwitches({ onChangeLanguage }) {
  const [lang, setLang] = React.useState(false);

  React.useEffect(() => {
    const lang = localStorage.getItem('i18nextLng');
    if (lang === 'ua') {
      setLang(true);
    }
  });

  const handleChange = event => {
    if (event.target.checked) {
      onChangeLanguage('ua');
    } else {
      onChangeLanguage('en');
    }

    /* true - ua, false - en */

    setLang(event.target.checked);
  };

  return (
    <FormGroup>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography className={s.textContainer}>
          <span className={s.switchText}>{lang ? 'UA' : 'EN'}</span>
        </Typography>
        <AntSwitch
          inputProps={{ 'aria-label': 'ant design' }}
          onChange={handleChange}
          name="checkedA"
          checked={localStorage.getItem('i18nextLng') === 'ua' && true}
          className={s.switch}
        />
      </Stack>
    </FormGroup>
  );
}
