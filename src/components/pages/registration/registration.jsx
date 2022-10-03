import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Formik } from 'formik';
import { registrationValidationSchema } from 'services/yupValidationSchema';

import styles from '../login/login.module.css';

import { authOperations } from '../../../redux/auth';
import { useDispatch } from 'react-redux';
import Media from 'react-media';
import AuthModal from '../../authModal/authModal';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errName, setErrName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [modal, setModal] = useState(true);
  const location = useLocation();
  useEffect(() => {
    location.state === 'modal' ? setModal(false) : setModal(true);
  }, []);
  const modalBtnRegisterClick = () => {
    setModal(false);
  };

  const modalBtnLoginClick = () => {
    navigate('/login', { state: 'modal' });
  };

  return (
    <>
      <section className={styles.section}>
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
                    const { data, response } = answer.payload;

                    if (data) {
                      resetForm({ values: '' });
                      setErrName('');
                      setErrEmail('');
                      navigate('/login');
                    } else if (response) {
                      throw response.data.message;
                    }
                  })
                  .catch(error => {
                    switch (error) {
                      case 'name':
                        setErrName('User with this name is already registered');
                        setErrEmail('');
                        return;
                      case 'email':
                        setErrName('');
                        setErrEmail(
                          'User with this email is already registered'
                        );
                        return;
                      case 'name&email':
                        setErrName('User with this name is already registered');
                        setErrEmail(
                          'User with this email is already registered'
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
                    Google
                  </a>
                  <p className={styles.label__title}>
                    Name
                    {errName && (
                      <span className={styles.error}>* {errName}</span>
                    )}
                  </p>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name ? (
                    <p className={styles.warning}>{errors.name}</p>
                  ) : (
                    <span className={styles.default__count}></span>
                  )}
                  <p className={styles.label__title}>
                    Email
                    {errEmail && (
                      <span className={styles.error}>* {errEmail}</span>
                    )}
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
                  <p className={styles.label__title}>Password</p>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password ? (
                    <p className={styles.warning}>{errors.password}</p>
                  ) : (
                    <span className={styles.default__count}></span>
                  )}
                  <p className={styles.label__title}>Confirm password</p>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className={styles.warning}>{errors.confirmPassword}</p>
                  ) : (
                    <span className={styles.default__count}></span>
                  )}
                  <button className={styles.form__button} type="submit">
                    Register
                  </button>
                </form>
              )}
            </Formik>
            <p className={styles.auth__describe}>
              Already have an account?
              <Link className={styles.auth__link} to="/">
                Login
              </Link>
            </p>
          </div>
        </div>
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
      </section>
    </>
  );
};

export default Registration;
