import React, { useEffect, useState, Suspense } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LangSwitch from '../../components/langSwitch/langSwitch';
import Tooltip from '@mui/material/Tooltip';

import s from './header.module.css';
import home from '../../img/icon_home.svg';
import library from '../../img/icon_library.svg';
import { authOperations } from '../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
};

const Header = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isLoggedInName = useSelector(authSelectors.getUsername);
  const googleAvatar = useSelector(authSelectors.getGoogleAvatar);

  const [user, setUser] = useState(isLoggedInName);

  const { t, i18n } = useTranslation();
  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  // console.log('USER', user, 'googleAvatar', );

  const userLogo = user ? user[0] : 'U';
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExit = () => {
    dispatch(authOperations.logOut());
    setOpen(false);
  };

  const location = useLocation();
  const LINCK_ID = location.pathname;

  const [statistic, setStatistic] = useState(false);

  useEffect(() => {
    if (LINCK_ID === '/statistics') {
      setStatistic(false);
    } else {
      setStatistic(true);
    }
  }, [LINCK_ID]);

  return (
    <div className={s.main_wrapper}>
      <div className="main_container">
        {/* кнопки не удалял, чтобы можно было на формулы посмотреть

      <button onClick={() => changeLanguage('en')}>EN</button>
      <button onClick={() => changeLanguage('ua')}>UA</button>
      <div> {t('text')} </div> */}

        <header className={isLoggedIn ? s.header : s.header_l}>
          <Link to="/" className={s.logo}>
            BR
          </Link>

          <LangSwitch onChangeLanguage={changeLanguage} />

          {isLoggedIn && (
            <div className={s.blok}>
              <div className={s.blok_user}>
                <button className={s.btn_desktop} type="button">
                  {isLoggedIn && userLogo}
                </button>
                <p className={s.user_name}>{isLoggedIn && user}</p>
              </div>

              {statistic && (
                <nav className={s.nav}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? s.active_link : s.link
                    }
                    to="/"
                  >
                    <Tooltip title="library">
                      <img src={library} alt="library" />
                    </Tooltip>
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive ? s.active_link : s.link
                    }
                    to="/training"
                  >
                    <Tooltip title="training">
                      <img src={home} alt="home" />
                    </Tooltip>
                  </NavLink>
                </nav>
              )}
              <div className={s.line}></div>

              <button className={s.button_mobile} type="button">
                {userLogo}
              </button>
              <button
                className={s.button_exit}
                type="button"
                onClick={handleOpen}
              >
                {t('logout')}
              </button>
            </div>
          )}
        </header>

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className={s.modal}>
              <p className={s.modal_text}>{t('modal1_notification')}</p>
              <div className={s.btn_modal}>
                <button type="button" onClick={handleClose}>
                  {t('btnCancel')}
                </button>
                <button type="button" onClick={handleExit}>
                  {t('btnLeave')}
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
