import React, { useState, useEffect, useId } from 'react';
import queryString from 'query-string';
import Media from 'react-media';
import { IconButton, InputAdornment } from '@mui/material';
import { TextField } from './Login.styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthModal from '../../authModal/authModal';
import RepeatVerify from '../repeatVerify/repeatVerify';
import { useTranslation } from 'react-i18next';

import { Formik } from 'formik';
import { loginValidationSchema } from 'services/yupValidationSchema';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { authOperations } from '../../../redux/auth';
import { useDispatch } from 'react-redux';

import { googleLogIn } from 'redux/auth/auth-slice';

import svgPath from 'services/svgPath';
import styles from './login.module.css';


const Login = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState('');
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();

  const [verifyModal, setVerifyModal] = useState(false);
  const location = useLocation();
  const query = queryString.parse(location.search);
  const navigate = useNavigate();

  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    const hide = localStorage.getItem('AuthModal');
    location.state === 'modal' || hide === 'hide'
      ? setModal(false)
      : setModal(true);
  }, []);

  useEffect(() => {
    if (query.token) {
      const { name, token, avatar } = query;
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

  const disableChange = e => e.preventDefault();
  

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
                  else {
                    resetForm({ values: '' });
                  }
                })
                .catch(error => {
                  setErr(error);
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
                <p className={styles.label__title}>
                  {t('email')}
                  <span className={styles.label__star}>*</span>
                  {err && <span className={styles.error}>{t(`${err}`)}</span>}
                </p>
                <input
                  style={{border: err && '1px solid #F25137'}}
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
                  <TextField
                    style={{border: err && '1px solid #F25137'}}
                    required
                    fullWidth
                    autoComplete='new-password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    inputProps={{ maxLength: 30 }}
                    id={id + 'password'}
                    placeholder='Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onCut={disableChange}
                    onCopy={disableChange}
                    onPaste={disableChange}
                    value={values.password}
                    variant='standard'
                    InputProps={{
                      style: { fontFamily: "'Montserrat', sans-serif", },
                      disableUnderline: true,
                      endAdornment: <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility sx={{ color: '#FF6B08' }} /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>,
                    }}
                  />
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
            {t('signUp')}
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
    </>
  );
};

export default Login;
