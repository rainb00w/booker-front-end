import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from "../pages/login/login.module.css";
import {authOperations}  from "../redux/auth";
import { useDispatch } from 'react-redux';


const TestRegistration = () => {
    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        name: yup.string().typeError("Will be a string").min(3).required("Required"),
        email: yup.string().typeError("Will be a string").min(4).required("Required"),
        password: yup.string().typeError("Will be a string").min(6).required("Required"),
        confirmPassword: yup.string().min(6)
            .oneOf([yup.ref('password')], "Passwords doesn't match").required("Required")
    });


    return (
        
        <section className={styles.section}>
            <div className={styles.form__container}>   
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={({name, email, password}, {resetForm}) => {
                        console.log(name, email, password);
                        dispatch(authOperations.register({ name, email, password }));
                        // resetForm({values: ""})
                    }}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <button type='submit'>Google</button>
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
            </div> 
            
        </section>
        
        
    )
};

export default TestRegistration;