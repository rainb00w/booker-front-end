import React from 'react';
// import { ReactComponent as ThumbUp } from '../../../img/thumb_up-24px.svg';
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

const ModalFinishByTime = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={s.modal}>
          <p className={s.modal_text}>
          {t('Youre_doing_fine')}
          </p>
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
export default ModalFinishByTime;
