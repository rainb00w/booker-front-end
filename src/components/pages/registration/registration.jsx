import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import * as yup from 'yup';

import RegistrationText from '../../registrationText/registrationText';
import styles from "../login/login.module.css";

import { authOperations } from '../../../redux/auth';
import { useDispatch } from 'react-redux';


const Registration = () => {
    const dispatch = useDispatch();
    const [errName, setErrName] = useState("");
    const [errEmail, setErrEmail] = useState("");


    const validationSchema = yup.object().shape({
        name: yup.string()
            .typeError("Will be a string")
            .min(3)
            .max(100)
            .required("Required field"),
        email: yup.string()
            .typeError("Will be a string")
            .email()
            .matches(/^(([^<>()\[\]\\.,;:\s@!?"]{2,}(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'Is not in correct format')
            .min(10)
            .max(63)
            .required("Required field"),
        password: yup.string()
            .typeError("Will be a string")
            .min(5)
            .max(30)
           // .matches(/^[^<>()\[\]\\.,;:\s"]*/, 'Is not in correct format')
            .required("Required field"),
        confirmPassword: yup.string()
            .min(5)
            .max(30)
            .oneOf([yup.ref('password')], "Passwords doesn't match")
            .required("Required field")
    });


    return ( 
        <>
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
                            onSubmit={(values, {resetForm}) => {
                                const { name, email, password } = values;

                      
                                    dispatch(authOperations.register({ name, email, password }))
                                    .then(answer => {
                                       
                                        const { data, response } = answer.payload;
                                        console.log(data);
                                       console.log(response);
                                        setErrName("");
                                        setErrEmail("");

                                        if (data) {
                                            console.log(data)
                                        }
                                        else if (response) {
                                            throw response.data.message;
                                        }
                                    })
                                    .catch(error => {
                                        switch (error) {
                                            case "name":
                                                setErrName("User with this name is already registered")
                                                return 
                                            case "email":
                                                setErrEmail("User with this email is already registered")
                                                return
                                            case "name&email":
                                                setErrName("User with this name is already registered")
                                                setErrEmail("User with this email is already registered")
                                                return 
                                        }
                                    });



                                    
                                resetForm({values: ""})
                            }}
                        >
                            {({ values, errors, touched, handleBlur, handleChange, handleSubmit },
                                nameError = errName, emailError = errEmail) => (
                        <form onSubmit={handleSubmit}>
                            <a className={styles.google__auth}
                                href="http://localhost:3001/api/user/google"
                                    >Google</a>
                                    
                            {nameError && (<p className={styles.warning}>{errName}</p>)}
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
                                    
                            {emailError && (<p className={styles.warning}>{errEmail}</p>)}
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
                            <Link className={styles.auth__link} to="/">Login</Link>
                        </p>
                    </div>
                </div> 
                <RegistrationText />
            </section>
        </>
    )
};

export default Registration;