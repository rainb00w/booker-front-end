import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Formik } from 'formik';
import { repeatVerifyValidationSchema } from 'services/yupValidationSchema';
import styles from "./repeatVerify.module.css";

const modalRoot = document.querySelector('#modal__root');


const RepeatVerify = ({ switchFunc }) => {
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
        <div className={styles.verify__overlay} onClick={handleClick}>
            <div className={styles.verify__modal}>
                <div className={styles.verify__container}>
                    <h2 className={styles.verify__title}>Please enter the email of the account you want to verify</h2>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={repeatVerifyValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values)
                            resetForm({ values: '' });
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
                                    Email for verify
                                </p>
                                <input
                                    className={styles.verify__input}
                                    type="email"
                                    placeholder="your@email.com"
                                    name="email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email ?
                                    (<p className={styles.verify__warning}>{errors.email}</p>)
                                    : (<span className={styles.verify__default}></span>)}
                                <button className={styles.verify__button} type="submit">
                                    Send for verify
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>,
        modalRoot 
    )
};

export default RepeatVerify;