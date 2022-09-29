import * as yup from 'yup';


export const registrationValidationSchema = yup.object().shape({
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
            .typeError("Will be a string")
            .min(5)
            .max(30)
            .oneOf([yup.ref('password')], "Passwords doesn't match")
            .required("Required field")
});


export const loginValidationSchema = yup.object().shape({
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
});


export const repeatVerifyValidationSchema = yup.object().shape({
    email: yup.string()
            .typeError("Will be a string")
            .email()
            .matches(/^(([^<>()\[\]\\.,;:\s@!?"]{2,}(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'Is not in correct format')
            .min(10)
            .max(63)
            .required("Required field")
});

