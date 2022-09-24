import { Formik } from 'formik';
import * as yup from 'yup';

const Login = () => {
  const validationSchema = yup.object().shape({
        email: yup.string().typeError("Will be a string").min(4).required("Required"),
        password: yup.string().typeError("Will be a string").min(6).required("Required"),
  });
  
    return (
        <>
            <section>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {resetForm}) => {
                      console.log(values)
                      resetForm()
                    }}
                >
                    {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <button type='submit'>Google</button>

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

                            <button type='submit'>Login</button>
                        </form>
                    )}
                </Formik>
            </section>
        </>
    )
  };
  
  export default Login;
  