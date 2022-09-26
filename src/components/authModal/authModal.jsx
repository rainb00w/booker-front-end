import React from "react";
import { createPortal } from "react-dom";
import RegistrationText from "../registrationText/registrationText";
import styles from "./authModal.module.css";

const modalRoot = document.querySelector('#modal__root');

const AuthModal = () => {
    return createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <RegistrationText />
            </div>
        </div>,
        modalRoot
    )
};

export default AuthModal;