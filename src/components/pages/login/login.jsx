import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Media from 'react-media';
import AuthModal from '../../authModal/authModal';

import { Formik } from 'formik';
import { loginValidationSchema } from 'services/yupValidationShema';
import { Link } from 'react-router-dom';


import svgPath from 'services/svgPath';
import styles from './login.module.css';

import { authOperations } from '../../../redux/auth';
import { useDispatch } from 'react-redux';


const Login = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const [modal, setModal] = useState(true);
 

  const location = useLocation();
  const query = queryString.parse(location.search);
  
  useEffect(() => {
    if (query.token) {
      console.log(query)
    }
  })


  return (
    <>
      {modal && (
          <Media queries={{small: "(max-width: 768px)"}}>
              {matches => (
                  <>
                      {matches.small && <AuthModal />}
                  </>
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
                    setErr(error)
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
                    {err && (<span className={styles.error}>* {err}</span>)}
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
                  ) : null}
                  <p className={styles.label__title}>
                    Password
                    {err && (<span className={styles.error}>* {err}</span>)}
                  </p>
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
            <Link className={styles.auth__link} to="/register">Register</Link>
          </div>
        </div>
        <div className={styles.log__text}>
          <svg className={styles.svg__qutation}>
            <use href={svgPath.quatation + "#quatation"}></use>
          </svg>
          <p className={styles.quote}>
            Books are the ships of thoughts, wandering through the waves of time.
          </p>
          <hr className={styles.hr} />
          <h2 className={styles.author}>Francis Bacon</h2>
        </div>
      </section>
    </>
  );
};

export default Login;