import React, { useState } from 'react';
import library from './icon_library.svg';
import flag from './icon_flag.svg';
import vector from './icon_vector.svg';
import { useMediaQuery } from 'react-responsive';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import s from './EmptyLibrary.module.css';
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
  return (
    <>
      {mobile ? (
        <Modal open={openInfo} onClose={handleCloseInfo}>
          <Box sx={style} className={s.modalInfo}>
            <div className={s.blok_info}>
              <div>
                <h2 className={s.title}>Крок 1.</h2>
                <h3 className={s.subtitle}>
                  <img src={library} alt="library" />
                  Створіть особисту бібліотеку
                </h3>
                <p className={s.text}>
                  <img src={vector} alt="vector" />
                  Додайте до неї книжки, які маєте намір прочитати.
                </p>
              </div>
              <div>
                <h2 className={s.title}>Крок 2.</h2>
                <h3 className={s.subtitle}>
                  <img src={flag} alt="flag" />
                  Сформуйте своє перше тренування
                </h3>
                <p className={s.text}>
                  <img src={vector} alt="vector" />
                  Визначте ціль, оберіть період, розпочинайте тренування.
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
          </Box>
        </Modal>
      ) : (
        <div className={s.blok_info}>
          <div>
            <h2 className={s.title}>Крок 1.</h2>
            <h3 className={s.subtitle}>
              <img src={library} alt="library" />
              Створіть особисту бібліотеку
            </h3>
            <p className={s.text}>
              <img src={vector} alt="vector" />
              Додайте до неї книжки, які маєте намір прочитати.
            </p>
          </div>

          <div>
            <h2 className={s.title}>Крок 2.</h2>
            <h3 className={s.subtitle}>
              <img src={flag} alt="flag" />
              Сформуйте своє перше тренування
            </h3>
            <p className={s.text}>
              <img src={vector} alt="vector" />
              Визначте ціль, оберіть період, розпочинайте тренування.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
