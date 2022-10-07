import React, { useState } from 'react';
import library from './icon_library.svg';
import flag from './icon_flag.svg';
import vector from './icon_vector.svg';
import { useMediaQuery } from 'react-responsive';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import s from './EmptyLibrary.module.css';
import { useTranslation } from 'react-i18next';
const style = {
  position: 'absolute',
  top: '28%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
};

const Info = () => {
  const mobile = useMediaQuery({ query: '(max-width: 767px)' });
  const [openInfo, setOpenInfo] = useState(true);
  const handleCloseInfo = () => setOpenInfo(false);
  const { t, i18n } = useTranslation();
  return (
    <>
      {mobile ? (
        <Modal open={openInfo} onClose={handleCloseInfo}>
          <Box sx={style} className={s.modalInfo}>
            <div className={s.blok_infoCont}>
              <div className={s.blok_info}>
                <div>
                  <h2 className={s.title}>{t('step1')}</h2>
                  <h3 className={s.subtitle}>
                    <img src={library} alt="library" />
                    {t('step1_title')}
                  </h3>
                  <p className={s.text}>
                    <img src={vector} alt="vector" />
                    {t('step1_text')}
                  </p>
                </div>
                <div>
                  <h2 className={s.title}>{t('step2')}</h2>
                  <h3 className={s.subtitle}>
                    <img src={flag} alt="flag" />
                    {t('step2_title')}
                  </h3>
                  <p className={s.text}>
                    <img src={vector} alt="vector" />
                    {t('step2_text')}
                  </p>
                </div>
              </div>
              <button
                className={s.btn_info}
                type="button"
                onClick={handleCloseInfo}
              >
                Ok
              </button>
            </div>
          </Box>
        </Modal>
      ) : (
        <div className={s.blok_info}>
          <div>
            <h2 className={s.title}>{t('step1')}</h2>
            <h3 className={s.subtitle}>
              <img src={library} alt="library" />
              {t('step1_title')}
            </h3>
            <p className={s.text}>
              <img src={vector} alt="vector" />
              {t('step1_text')}
            </p>
          </div>

          <div>
            <h2 className={s.title}>{t('step2')}</h2>
            <h3 className={s.subtitle}>
              <img src={flag} alt="flag" />
              {t('step2_title')}
            </h3>
            <p className={s.text}>
              <img src={vector} alt="vector" />
              {t('step2_text')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
