import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import classNames from 'classnames';
import Media from 'react-media';
import AuthModal from '../../authModal/authModal';
import RepeatVerify from '../repeatVerify/repeatVerify';
import getPhrases from '../../phrases/getPhrases';
import LoginPhrase from './loginPhrase';

import { Formik } from 'formik';
import { loginValidationSchema } from 'services/yupValidationSchema';
import { Link } from 'react-router-dom';

import svgPath from 'services/svgPath';
import styles from './login.module.css';

import { authOperations, authSelectors } from '../../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';

import { googleLogIn } from 'redux/auth/auth-slice';

const Login = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState('');
  const [modal, setModal] = useState(false);

  const [verifyModal, setVerifyModal] = useState(false);
  const [inputType, setInputType] = useState('password');
  const location = useLocation();
  const query = queryString.parse(location.search);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const phrase = getPhrases();

  useEffect(() => {
    isLoggedIn ? setModal(false) : setModal(true);
  }, [isLoggedIn]);

  useEffect(() => {
    if (query.token) {
      const { name, token, avatar } = query;
      console.log(query);
      dispatch(googleLogIn(token));
    }
  });

  const modalBtnClick = () => {
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
            <>{matches.small && <AuthModal modalBtnClick={modalBtnClick} />}</>
          )}
        </Media>
      )}
      <section className={styles.section}>
        <div className={styles.login__form}>
          <div className={styles.form__border}>
            <a
              className={styles.google__auth}
              href="http://localhost:3001/api/user/google"
            >
              Google
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
                    Email
                    {err && <span className={styles.error}>* {err}</span>}
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
                    <p className={styles.warning}>{errors.email}</p>
                  ) : (
                    <span className={styles.default__count}></span>
                  )}
                  <label className={styles.label_password}>
                    <p className={styles.label__title}>Password</p>
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
                      <p className={styles.warning}>{errors.password}</p>
                    ) : (
                      <span className={styles.default__count}></span>
                    )}
                  </label>
                  <button className={styles.form__button} type="submit">
                    Login
                  </button>
                </form>
              )}
            </Formik>
            <Link className={styles.auth__link} to="/register">
              Register
            </Link>
            <p className={styles.auth__verify}>
              Didnt receive an email to verify your account? Try to send again:
              <button
                className={styles.button__verify}
                type="button"
                onClick={() => {
                  modalSwitch();
                }}
              >
                Repeat Verify
              </button>
            </p>
            <p className={styles.auth__verify}>
              Click if you forgot your password:
              <Link className={styles.authforgot__link} to="/changePassword">
                Forgot Password
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.log__text}>
          <svg className={styles.svg__qutation}>
            <use href={svgPath.quatation + '#quatation'}></use>
          </svg>
          <LoginPhrase phrase={phrase} />
        </div>
      </section>
    </>
  );
};

export default Login;
