import React from "react";
import ButtonsContainer from "../buttonsContainer/buttonsContainer";
import styles from "../pages/login/login.module.css"


const RegistrationText = () => {
    return (
        <div className={styles.registration__text}>
                <h1 className={styles.title }>Books Reading</h1>
                <h2 className={styles.subtitle}>Will help you to</h2>
                <ul className={styles.registration__list}>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Create your goal faster and proceed to read</p>
                    </li>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Divide process proportionally for each day</p>
                    </li>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Track your success</p>
                    </li>
                </ul>
                <h2 className={styles.subtitle}>You may also</h2>
                <ul className={styles.registration__list2}>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Pose your own independent point of view</p>
                    </li>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Improve your professional skills according to new knowledge</p>
                    </li>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Become an interesting interlocutor</p>
                    </li>
                </ul>
                <ButtonsContainer />
            </div>
    )
};

export default RegistrationText;