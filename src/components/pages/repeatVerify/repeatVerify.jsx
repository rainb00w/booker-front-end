import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Formik } from 'formik';
import { repeatVerifyValidationSchema } from 'services/yupValidationSchema';
import { useTranslation } from 'react-i18next';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { RemoveScroll } from 'react-remove-scroll';
import verifyAPI from 'services/verifyAPI';
import styles from "./repeatVerify.module.css";


const modalRoot = document.querySelector('#modal__root');

const RepeatVerify = ({ switchFunc }) => {
    const [err, setErr] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);

    return () => {
        window.removeEventListener('keydown', handleKeyboard);
        };
    });

    const handleKeyboard = e => {
        if (e.code === 'Escape') switchFunc();
    };

    const handleClick = e => {
        if (e.currentTarget === e.target) switchFunc();
    };

    return createPortal(
        <RemoveScroll>
            <div className={styles.verify__overlay} onClick={handleClick}>
                <div className={styles.verify__modal}>
                    <div className={styles.verify__container}>
                        <h2 className={styles.verify__title}>
                            {t('verify_phrase')}
                        </h2>
                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            validationSchema={repeatVerifyValidationSchema}
                            onSubmit={(values, { resetForm }) => {
                                setErr("");
                                const { email } = values;
                                verifyAPI(email)
                                    .then(() => {
                                        resetForm({ values: '' });
                                        Notify.success(t('notify_phrase2'));
                                        switchFunc();
                                    })
                                    .catch(err => {
                                        const errorMessage = err.response.data.message;
                                        setErr(errorMessage);
                                    })
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <p className={styles.verify__label}>
                                        {t('email_verify')}
                                        {err && <span className={styles.verify__error}>{t(`${err}`)}</span>}
                                    </p>
                                    <input
                                        style={{border: err && '1px solid #F25137'}}
                                        className={styles.verify__input}
                                        type="email"
                                        placeholder="your@email.com"
                                        name="email"
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {errors.email && touched.email ?
                                        (<p className={styles.verify__warning}>{t(`${errors.email}`)}</p>)
                                        : (<span className={styles.verify__default}></span>)}
                                    <button className={styles.verify__button} type="submit">
                                        {t('send_verify')}
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </RemoveScroll>,
        modalRoot 
    )
};

export default RepeatVerify;