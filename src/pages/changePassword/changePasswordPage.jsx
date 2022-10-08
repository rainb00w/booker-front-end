import React from "react";
import ChangePassword from "components/pages/changePassword/changePassword";
import LoginPhrase from '../../components/pages/login/loginPhrase';
import svgPath from 'services/svgPath';
import styles from "../login/loginPage.module.css";

const ChangePasswordPage = () => {
    return (
        <section className={styles.section}>
            <div className={styles.left__block}>
                <ChangePassword />
            </div>
            <div className={styles.right__block}>
                <div className={styles.log__text}>
                    <svg className={styles.svg__qutation}>
                        <use href={svgPath.quatation + '#quatation'}></use>
                    </svg>
                    <LoginPhrase />
                </div>
            </div>
        </section>
    )
};

export default ChangePasswordPage;