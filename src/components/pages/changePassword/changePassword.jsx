import React, { useState } from 'react';
import classNames from 'classnames';
import newPasswordAPI from 'services/newPasswordAPI';
import { Formik } from 'formik';
import { loginValidationSchema } from 'services/yupValidationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import svgPath from 'services/svgPath';
import styles from "../login/login.module.css";


const ChangePassword = () => {
  const [inputType, setInputType] = useState('password');
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const { t } = useTranslation();

  const handleClickShowIcon = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <>
        <section className={styles.section}>
            <div className={styles.login__form}>
                <div className={styles.form__border}>
                    <h2 className={styles.subtitle}>Change password</h2>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={loginValidationSchema}
                onSubmit={(values, { resetForm }) => {
                  const { email, password } = values;
                  setErr("")
                  newPasswordAPI(email, password)
                    .then(() => {
                      Notify.success('To confirm the password change, follow the link that we sent you by mail.');
                      setTimeout(() => {
                        navigate('/login');
                      }, 2000); 
                    })
                    .catch(err => {
                      const errorMessage = err.response.data.message;
                      setErr(errorMessage);
                    })

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
                    <p className={styles.label__title}>
                    Email
                    <span className={styles.label__star}>*</span>
                    {err && <span className={styles.error}>{t(`${err}`)}</span>}
                  </p>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="your@email.com"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <p className={styles.warning}>{t(`${errors.email}`)}</p>
                  ) : (
                    <span className={styles.default__count}></span>
                  )}
                  <label className={styles.label_password}>
                    <p className={styles.label__title}>
                      Password
                      <span className={styles.label__star}>*</span>
                    </p>
                    <input
                      className={styles.input}
                      type={inputType}
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <span
                      onClick={handleClickShowIcon}
                      className={
                        inputType === 'text'
                          ? classNames(
                              styles.svg__eyeOffCont,
                              styles.svg__eyeOffContActive
                            )
                          : styles.svg__eyeOffCont
                      }
                    >
                      <svg className={styles.svg__eyeOff}>
                        <use href={svgPath.eyeOff + '#eyeOff'}></use>
                      </svg>
                    </span>

                    {errors.password && touched.password ? (
                      <p className={styles.warning}>{t(`${errors.password}`)}</p>
                    ) : (
                      <span className={styles.default__count}></span>
                    )}
                  </label>
                  <button className={styles.form__button} type="submit">
                        Change Password
                  </button>
                </form>
              )}
            </Formik>
            <Link className={styles.auth__link} to="/login">
              Login
            </Link>
          </div>
        </div>
        <div className={styles.log__text}>
          <svg className={styles.svg__qutation}>
            <use href={svgPath.quatation + '#quatation'}></use>
          </svg>
          <p className={styles.quote}>
            Books are the ships of thoughts, wandering through the waves of
            time.
          </p>
          <hr className={styles.hr} />
          <h2 className={styles.author}>Francis Bacon</h2>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
