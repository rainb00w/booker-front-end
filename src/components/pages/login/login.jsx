import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { authOperations } from '../../../redux/auth';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .typeError('Will be a string')
      .min(4)
      .required('Required'),
    password: yup
      .string()
      .typeError('Will be a string')
      .min(6)
      .required('Required'),
  });

  return (
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
            validationSchema={validationSchema}
            onSubmit={({ email, password }, { resetForm }) => {
            //   console.log(values);
              dispatch(authOperations.logIn({ email, password }));
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
                <p className={styles.label__title}>Email</p>
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
                ) : null}
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
                ) : null}
                <button className={styles.form__button} type="submit">
                  Login
                </button>
              </form>
            )}
          </Formik>
          <Link className={styles.auth__link}>Register</Link>
        </div>
      </div>
      <div className={styles.log__text}>
        <svg className={styles.svg__qutation}>
          <url></url>
        </svg>
        <p className={styles.quote}>
          Books are the ships of thoughts, wandering through the waves of time.
        </p>
        <hr className={styles.hr} />
        <h2 className={styles.author}>Francis Bacon</h2>
      </div>
    </section>
  );
};

export default Login;
