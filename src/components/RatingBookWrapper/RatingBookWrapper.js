import { useState } from 'react';
import RatingBook from 'components/RatingBook';
import NestingModal from 'components/RatingBook/RatingModal/NestingModal/NestingModal';
import { useTranslation } from 'react-i18next';
import s from './RatingBookWrapper.module.css';

export default function RatingBookWrapper({ id, resume = '', rating = 0 }) {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <button
        type="button"
        id={id}
        className={s.btn}
        onClick={toggleModal}
      >
        {t('resume')}
      </button>
      {showModal && (<NestingModal onClose={toggleModal}>
        <RatingBook
          id={id}
          resume={resume}
          rating={rating}
          toggleModal={toggleModal}
        />
      </NestingModal>)}
    </>
  );

}
