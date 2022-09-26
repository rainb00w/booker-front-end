import React from "react";
import { Link } from "react-router-dom";
import styles from "./buttonsContainer.module.css";

const ButtonsContainer = () => {
    return (
        <>
            <div className={styles.buttons__container}>
                <button className={styles.login__button}>
                    <Link className={styles.login__link}>Log in</Link>
                </button>
                <button className={styles.register__button}>
                    <Link className={styles.register__link}>Register</Link>
                </button>
            </div>
        </>
    )
};

export default ButtonsContainer;