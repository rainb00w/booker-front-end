import React from 'react';
import PropTypes from 'prop-types';
import { Box, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import s from './deleteModal.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  outline: 0,
};

export default function DeleteModal({
  open,
  handleClose,
  handleDelete,
  isDeleting,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          backgroundColor: 'rgba(43, 43, 43, 0.1)',
          outline: 0,
          '&:focus': { outline: 'none' },
        }}
      >
        <Box sx={style} className={s.modal}>
          <p className={s.modal_text}>{t('modalDelete_notification')}</p>
          <div className={s.btn_modal}>
            <button
              className={s.btn_modal_cancel}
              type="button"
              onClick={handleClose}
            >
              {t('btnCancel')}
            </button>
            <button
              className={s.btn_modal_exit}
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {t('btnDelete')}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
DeleteModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func,
  isDeleting: PropTypes.bool,
};
