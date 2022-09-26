import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import * as yup from 'yup';

import Media from 'react-media';

import AuthModal from '../../authModal/authModal';
import RegistrationText from '../../registrationText/registrationText';
import styles from "../login/login.module.css";

import { authOperations } from '../../../redux/auth';
import { useDispatch } from 'react-redux';


const Registration = () => {
    const [modal, setModal] = useState(true);

    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        name: yup.string().typeError("Will be a string").min(3).required("Required"),
        email: yup.string().typeError("Will be a string").min(4).required("Required"),
        password: yup.string().typeError("Will be a string").min(6).required("Required"),
        confirmPassword: yup.string().min(6)
            .oneOf([yup.ref('password')], "Passwords doesn't match").required("Required")
    });


    return ( 
        <>
            {modal && (
                <Media queries={{
                    small: "(max-width: 768px)",
                    medium: "(min-width: 769px) and (max-width: 1280px)",
                    large: "(min-width: 1281px)"
                }} >
                    {matches => (
                        <>
                            {matches.small && <AuthModal />}
                        </>
                    )}
                </Media>
            )}
            <section className={styles.section}>
                <div className={styles.registr__form}>   
                    <div className={styles.form__border}>
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                                confirmPassword: ""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={({name, email, password}, {resetForm}) => {
                                console.log(name);
                                dispatch(authOperations.register({ name, email, password }));
                                resetForm({values: ""})
                            }}
                        >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <a className={styles.google__auth}
                                href="http://localhost:3001/api/user/google"
                            >Google</a>
                            <p className={styles.label__title}>Name</p>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                                {errors.name && touched.name ?
                                    (<p className={styles.warning}>{errors.name}</p>) : null}
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
                                {errors.confirmPassword && touched.confirmPassword ?
                                    (<p className={styles.warning}>{errors.confirmPassword}</p>) : null}
                                <button className={styles.form__button} type='submit'>Register</button>
                            </form>
                            )}
                        </Formik>
                        <p className={styles.auth__describe}>
                            Already have an account?
                            <Link className={styles.auth__link}>Login</Link>
                        </p>
                    </div>
                </div> 
                <RegistrationText />
            </section>
        </>
    )
};

export default Registration;