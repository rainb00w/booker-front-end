import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import classNames from 'classnames';
import Media from 'react-media';
import AuthModal from '../../authModal/authModal';
import RepeatVerify from '../repeatVerify/repeatVerify';
//  import getPhrases from '../../phrases/getPhrases';
import LoginPhrase from './loginPhrase';
import { useTranslation } from 'react-i18next';

import { Formik } from 'formik';
import { loginValidationSchema } from 'services/yupValidationSchema';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import svgPath from 'services/svgPath';
import styles from './login.module.css';

import { authOperations, authSelectors } from '../../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';

import { googleLogIn } from 'redux/auth/auth-slice';

const Login = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState('');
  const [modal, setModal] = useState(false);
  // const [phrase, setPhrase] = useState(getPhrases());
  const { t } = useTranslation();

  const [verifyModal, setVerifyModal] = useState(false);
  const [inputType, setInputType] = useState('password');
  const location = useLocation();
  const query = queryString.parse(location.search);

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const hide = localStorage.getItem('AuthModal');
    location.state === 'modal' || hide === 'hide'
      ? setModal(false)
      : setModal(true);
  }, []);

  useEffect(() => {
    if (query.token) {
      const { name, token, avatar } = query;
      // console.log('useEffect', name, token, avatar );
      dispatch(googleLogIn({ token, name, avatar }));
    }
  });

  const modalBtnRegisterClick = () => {
    localStorage.setItem('AuthModal', 'hide');
    navigate('/register', { state: 'modal' });
  };

  const modalBtnLoginClick = () => {
    localStorage.setItem('AuthModal', 'hide');
    setModal(false);
  };

  const modalSwitch = () => setVerifyModal(!verifyModal);

  const handleClickShowIcon = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };
  return (
    <>
      {verifyModal && <RepeatVerify switchFunc={modalSwitch} />}
      {modal && (
        <Media queries={{ small: '(max-width: 768px)' }}>
          {matches => (
            <>
              {matches.small && (
                <AuthModal
                  modalBtnRegisterClick={modalBtnRegisterClick}
                  modalBtnLoginClick={modalBtnLoginClick}
                />
              )}
            </>
          )}
        </Media>
      )}
      <section className={styles.section}>
        <div className={styles.login__form}>
          <div className={styles.form__border}>
            <a
              className={styles.google__auth}
              href="https://booker-back-end.herokuapp.com/api/user/google"
            >
              <div className={styles.google__container}>
                <svg className={styles.svg__google}>
                  <use href={svgPath.google + '#google'}></use>
                </svg>
                <p className={styles.google__text}>Google</p>
              </div>
            </a>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginValidationSchema}
              onSubmit={(values, { resetForm }) => {
                const { email, password } = values;
                dispatch(authOperations.logIn({ email, password }))
                  .then(answer => {
                    const { response } = answer.payload;
                    if (response) {
                      throw response.data.message;
                    }
                  })
                  .catch(error => {
                    setErr(error);
                  });

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
                      {err && (
                        <span className={styles.error}>{t(`${err}`)}</span>
                      )}
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
                      <p className={styles.warning}>
                        {t(`${errors.password}`)}
                      </p>
                    ) : (
                      <span className={styles.default__count}></span>
                    )}
                  </label>
                  <button className={styles.form__button} type="submit">
                    {t('login')}
                  </button>
                </form>
              )}
            </Formik>
            <Link className={styles.auth__link} to="/register">
              {t('register')}
            </Link>
            <p className={styles.auth__verify}>
              {t('didnt_receive_an_email')}
              <button
                className={styles.button__verify}
                type="button"
                onClick={() => {
                  modalSwitch();
                }}
              >
                {t('Repeat_Verify')}
              </button>
            </p>
            <p className={styles.auth__verify}>
              {t('Click_if_you_forgot_your_password')}
              <Link className={styles.authforgot__link} to="/changePassword">
                {t('Forgot_Password')}
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.log__text}>
          <svg className={styles.svg__qutation}>
            <use href={svgPath.quatation + '#quatation'}></use>
          </svg>
          <LoginPhrase />
        </div>
      </section>
    </>
  );
};

export default Login;
