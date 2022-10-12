import React from 'react';
import { ReactComponent as ThumbUp } from '../../img/thumb_up-24px.svg';
import s from './ModalFinish.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
};

const ModalFinish = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          backgroundColor: 'rgba(43, 43, 43, 0.1)',
          outline: 0,
          '&:focus': { outline: 'none' },
        }}
      >
        <Box sx={style} className={s.modal}>
        <ThumbUp className={s.thumbUp} />
          <p className={s.modal_text}>{t('You_are_the_best')}</p>
          <div className={s.btn_modal}>
            <button type="button" onClick={onClose}>
              {t('new_training_after_finish')}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalFinish;
