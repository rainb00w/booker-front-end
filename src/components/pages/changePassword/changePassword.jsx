import React, { useState } from 'react';
import classNames from 'classnames';
import newPasswordAPI from 'services/newPasswordAPI';
import LoginPhrase from '../login/loginPhrase';
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
        <div className={styles.left__block}>
            <div className={styles.login__form}>
                <div className={styles.form__border}>
                    <h2 className={styles.subtitle}>{t('changePassword')}</h2>
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
                      Notify.success(t('notify_phrase3'));
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
                    {t('email')}
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
                      {t('password')}
                      <span className={styles.label__star}>*</span>
                    </p>
                    <input
                      className={styles.input}
                      type={inputType}
                      placeholder="Password"
                      name="password"
                      maxLength="30"
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
                    {t('changePassword')}
                  </button>
                </form>
              )}
            </Formik>
            <Link className={styles.auth__link} to="/login">
              {t('login')}
            </Link>
          </div>
          </div>
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
    </>
  );
};

export default ChangePassword;
