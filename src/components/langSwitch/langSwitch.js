import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
        //  backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
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

// #A6ABB9;

export default function CustomizedSwitches({ onChangeLanguage }) {
  const [lang, setLang] = React.useState(false);

  const handleChange = event => {
    // console.log(event.target.checked);

    if (event.target.checked) {
      onChangeLanguage('ua');
      console.log('ua');
    } else {
      console.log('en');
      onChangeLanguage('en');
    }

    /* true - ua, false - en */

    setLang(event.target.checked);
  };

  return (
    // <FormGroup>
    //   <FormControlLabel
    //     control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
    //     label="MUI switch"
    //   />
    //   <FormControlLabel
    //     control={<Android12Switch defaultChecked />}
    //     label="Android 12"
    //   />
    //   <FormControlLabel
    //     control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
    //     label="iOS style"
    //   />
    <FormGroup>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{lang ? 'UA' : 'EN'}</Typography>
        <AntSwitch
          //   defaultChecked
          inputProps={{ 'aria-label': 'ant design' }}
          onChange={handleChange}
          name="checkedA"
        />
        {/* <Typography>ua</Typography> */}
      </Stack>
    </FormGroup>
  );
}
