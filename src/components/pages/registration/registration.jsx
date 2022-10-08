import React, { useState, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import { TextField } from '../login/Login.styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik } from 'formik';
import { registrationValidationSchema } from 'services/yupValidationSchema';

import svgPath from 'services/svgPath';
import styles from '../login/login.module.css';
import { useTranslation } from 'react-i18next';

import { authOperations } from '../../../redux/auth';
import { useDispatch } from 'react-redux';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  timeout: 3000,
  success: {
    background: 'rgb(255, 107, 8)',
    textColor: 'rgb(255, 255, 255)',
    notiflixIconColor: 'rgb(255, 255, 255)',
  },
});

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errName, setErrName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const { t } = useTranslation();
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirm = () => setShowConfirm(!showConfirm);
  const handleMouseDownConfirm = () => setShowConfirm(!showConfirm);

  const disableChange = e => event.preventDefault();

  
  return (
    <>
      <div className={styles.registr__form}>
        <div className={styles.form__border}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={registrationValidationSchema}
            onSubmit={(values, { resetForm }) => {
              const { name, email, password } = values;

              dispatch(authOperations.register({ name, email, password }))
                .then(answer => {
                  const { data, response } = answer.payload
                  if (data) {
                    resetForm({ values: '' });
                    setErrName('');
                    setErrEmail('');
                    Notify.success(
                      t(`notify_phrase1`)
                    );
                    setTimeout(() => {
                      navigate('/login');
                    }, 2000);
                  } else if (response) {
                    throw response.data.message;
                  }
                })
                .catch(error => {
                  switch (error) {
                    case 'name':
                      setErrName('this name is already taken, choose other');
                      setErrEmail('');
                      return;
                    case 'email':
                      setErrName('');
                      setErrEmail(
                        'this email is already taken, choose other'
                      );
                      return;
                    case 'name&email':
                      setErrName('this name is already taken, choose other');
                      setErrEmail(
                        'this email is already taken, choose other'
                      );
                      return;
                    default:
                      return;
                  }
                });
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
                <p className={styles.label__title}>
                  {t('name')}
                  <span className={styles.label__star}>*</span>
                  {errName && (
                    <span className={styles.error}>{t(`${errName}`)}</span>
                  )}
                </p>
                <input
                  style={{border: errName && '1px solid #F25137'}}
                  className={styles.input}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.name && touched.name ? (
                  <p className={styles.warning}>{t(`${errors.name}`)}</p>
                ) : (
                  <span className={styles.default__count}></span>
                )}
                <p className={styles.label__title}>
                  {t('email')}
                  <span className={styles.label__star}>*</span>
                  {errEmail && (
                    <span className={styles.error}>{t(`${errEmail}`)}</span>
                  )}
                </p>
                <input
                  style={{border: errEmail && '1px solid #F25137'}}
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
                  <TextField
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
                <label className={styles.label_password}>
                  <p className={styles.label__title}>
                    {t('confirmPassword')}
                    <span className={styles.label__star}>*</span>
                  </p>
                  <TextField
                    required
                    fullWidth
                    autoComplete='new-password'
                    type={showConfirm ? 'text' : 'password'}
                    name='confirmPassword'
                    inputProps={{ maxLength: 30 }}
                    id={id + 'password'}
                    placeholder='Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onCut={disableChange}
                    onCopy={disableChange}
                    onPaste={disableChange}
                    value={values.confirmPassword}
                    variant='standard'
                    InputProps={{
                      style: { fontFamily: "'Montserrat', sans-serif", },
                      disableUnderline: true,
                      endAdornment: <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirm}
                          onMouseDown={handleMouseDownConfirm}
                          edge="end"
                        >
                          {showConfirm ? <Visibility sx={{ color: '#FF6B08' }} /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>,
                    }}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className={styles.warning}>
                      {t(`${errors.confirmPassword}`)}
                    </p>
                  ) : (
                    <span className={styles.default__count}></span>
                  )}
                </label>
                <button className={styles.form__button} type="submit">
                  {t('signUp')}
                </button>
              </form>
            )}
          </Formik>
          <p className={styles.auth__describe}>
            {t('alreadyHaveAnAccount')}
            <Link className={styles.loginauth__link} to="/">
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
