import React from "react";
import Login from "../../components/pages/login/login";
import LoginPhrase from '../../components/pages/login/loginPhrase';
import svgPath from 'services/svgPath';
import styles from "./loginPage.module.css";

const LoginPage = () => {
    return (
        <section className={styles.section}>
            <div className={styles.left__block}>
                <Login />
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

export default LoginPage;
