import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import s from './header.module.css';
import home from './icon_home.svg';
import library from './icon_library.svg';
import Info from './info';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
};

const Header = () => {
  const user = 'Martha Stewart';
  const userLogo = user[0];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExit = () => setOpen(false);

  const [openInfo, setOpenInfo] = React.useState(true);
  const handleCloseInfo = () => setOpenInfo(false);

  const location = useLocation();
  const LINCK_ID = location.pathname;

  const [login, setLogin] = useState(true);
  const [statistic, setStatistic] = useState(false);

  useEffect(() => {
    if (LINCK_ID === '/statistics') {
      setStatistic(false);
    } else {
      setStatistic(true);
    }
  }, [LINCK_ID]);

  useEffect(() => {
    if (LINCK_ID === ('/' || '/register')) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, [LINCK_ID]);

  return (
    <>
      <header className={login ? s.header : s.header_l}>
        <Link to="/" className={s.logo}>
          BR
        </Link>

        {/* {login && ( */}
        <div className={s.blok}>
          <div className={s.blok_user}>
            <button className={s.btn_desktop} type="button">
              {userLogo}
            </button>
            <p className={s.user_name}>{user}</p>
          </div>

          {/* {statistic && ( */}
          <nav className={s.nav}>
            <NavLink
              className={({ isActive }) => (isActive ? s.active_link : s.link)}
              to="/library"
            >
              <img src={library} alt="library" />
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? s.active_link : s.link)}
              to="/training"
            >
              <img src={home} alt="home" />
            </NavLink>
          </nav>
          {/* )} */}
          <div className={s.line}></div>

          <button className={s.button_mobile} type="button">
            {userLogo}
          </button>
          <button className={s.button_exit} type="button" onClick={handleOpen}>
            Вихід
          </button>
        </div>
        {/* )} */}
      </header>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className={s.modal}>
            <p className={s.modal_text}>
              Якщо Ви вийдете з програми незбережені дані будуть втрачені
            </p>
            <div className={s.btn_modal}>
              <button type="button" onClick={handleClose}>
                Відміна
              </button>
              <button type="button" onClick={handleExit}>
                Вийти
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal open={openInfo} onClose={handleCloseInfo}>
          <Box sx={style} className={s.modalInfo}>
            <Info />
            <button
              className={s.btn_info}
              type="button"
              onClick={handleCloseInfo}
            >
              Ok
            </button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Header;
