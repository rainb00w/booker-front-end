import React, { useState, useId } from 'react';
import newPasswordAPI from 'services/newPasswordAPI';
import { Formik } from 'formik';
import { loginValidationSchema } from 'services/yupValidationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IconButton, InputAdornment } from '@mui/material';
import { TextField } from '../login/Login.styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from "../login/login.module.css";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const { t } = useTranslation();

  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const disableChange = e => e.preventDefault();


  return (
    <>
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
              setErr("");
              newPasswordAPI(email, password)
                .then(() => {
                  resetForm({ values: '' });
                  Notify.success(t('notify_phrase3'));
                  setTimeout(() => {navigate('/login') }, 2000); 
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
                    style: {fontFamily: "'Montserrat', sans-serif",},
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
    </>
  );
};

export default ChangePassword;