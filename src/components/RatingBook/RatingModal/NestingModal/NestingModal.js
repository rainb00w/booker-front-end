import s from './NestingModal.module.css';

const NestingModal = ({ children, handleBackdropClick }) => {
    return (
        <div className={s.modal} onClick={handleBackdropClick}>
            <div className={s.container}>{children}</div>
        </div>
    );
};

export default NestingModal;