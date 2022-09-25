import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from "./login.module.css";

const Login = () => {
  const validationSchema = yup.object().shape({
        email: yup.string().typeError("Will be a string").min(4).required("Required"),
        password: yup.string().typeError("Will be a string").min(6).required("Required"),
  });
  
    return (
        <section className={styles.section}>
            <div className={styles.form__container}>
                <a className={styles.google__auth}
                    href="http://localhost:3001/api/user/google"
                >Google</a>
                <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm}) => {
                    console.log(values)
                    resetForm({values: ""})
                }}
                >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                        {errors.email && touched.email ?
                            (<p className={styles.warning}>{errors.email}</p>) : null}
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
                        {errors.password && touched.password ?
                            (<p className={styles.warning}>{errors.password}</p>) : null}
                        <button className={styles.form__button} type='submit'>Login</button>
                    </form>
                    )}
                </Formik>
            </div>
            <div className={styles.text__container}>
                <svg>
                    <url></url>
                </svg>
                <p className={styles.quote} >Books are the ships of thoughts, wandering through the waves of time.</p>
                <hr className={styles.hr} />
                <h2 className={styles.author}>Francis Bacon</h2>
            </div>
        </section>
    )
};

export default Login;
