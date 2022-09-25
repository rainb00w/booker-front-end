import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from "../login/login.module.css";


const Registration = () => {
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
                        console.log(name)
                        resetForm({values: ""})
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
            <div className={styles.registration__text}>
                <h1 className={styles.title }>Books Reading</h1>
                <h2 className={styles.subtitle}>Will help you to</h2>
                <ul className={styles.registration__list}>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Create your goal faster and proceed to read</p>
                    </li>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Divide process proportionally for each day</p>
                    </li>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Track your success</p>
                    </li>
                </ul>
                <h2 className={styles.subtitle}>You may also</h2>
                <ul className={styles.registration__list2}>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Pose your own independent point of view</p>
                    </li>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Improve your professional skills according to new knowledge</p>
                    </li>
                    <li className={styles.registration__item}>
                        <p className={styles.item__text}>Become an interesting interlocutor</p>
                    </li>
                </ul>
            </div>
        </section>
        
    )
};

export default Registration;