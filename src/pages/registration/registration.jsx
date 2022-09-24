import { Formik } from 'formik';
import * as yup from 'yup';
// import styles from "./registration.module.css"

const Registration = () => {
    const validationSchema = yup.object().shape({
        name: yup.string().typeError("Will be a string").min(3).required("Required"),
        email: yup.string().typeError("Will be a string").min(4).required("Required"),
        password: yup.string().typeError("Will be a string").min(6).required("Required"),
        confirmPassword: yup.string().min(6)
            .oneOf([yup.ref('password')], "Passwords doesn't match").required("Required")
    });
    
    
    //const submitHandler = e => {
    //   e.preventDefault();
    //   console.log(e.target.name)
    //}


    return (
        <>
            <section>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={({name, email, password}) => {
                        console.log(name)
                    }}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <button type='submit'>Google</button>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.name && touched.name ? (<p>{errors.name}</p>) : null}

                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.email && touched.email ? (<p>{errors.email}</p>) : null}

                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.password && touched.password ? (<p>{errors.password}</p>) : null}

                            <label>Confirm password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (<p>{errors.confirmPassword}</p>) : null}


                            <button type='submit'>Register</button>
                        </form>
                    )}
                </Formik>
            </section>
        </>
    )
};

export default Registration;