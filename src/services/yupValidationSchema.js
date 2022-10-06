import * as yup from 'yup';


export const registrationValidationSchema = yup.object().shape({
    name: yup.string()
        .typeError("Will be a string")
        .min(3)
        .max(100)
        .matches( /^[a-zA-Z0-9][0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\\ ]{2,99}$/, 'Is not in correct format')
        .required("Required field"),
    email: yup.string()
        .typeError("Will be a string")
        .email()
        .matches( /^(?!-)([\w\.\!#\$%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{2,})+@(([\w\.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{1,56})+\.)+[\w]{2,}(?!-)$/ , 'Is not in correct format')
        .min(10)
        .max(63)
        .required("Required field"),
    password: yup.string()
        .typeError("Will be a string")
        .min(5, "the field contains an error")
        .max(30, "the field contains an error")
        .matches(/^(?!\-|\.)[0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\]{5,30}$/, 'Is not in correct format')
        .required("Required field"),
    confirmPassword: yup.string()
        .typeError("Will be a string")
        .min(5, "the field contains an error")
        .max(30, "the field contains an error")
        .matches(/^(?!\-|\.)[0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\]{5,30}$/, 'Is not in correct format')
        .oneOf([yup.ref('password')], "Passwords doesn't match")
        .required("Required field")
});


export const loginValidationSchema = yup.object().shape({
    email: yup.string()
        .typeError("Will be a string")
        .email()
        .matches( /^(?!-)([\w\.\!#\$%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{2,})+@(([\w\.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{1,56})+\.)+[\w]{2,}(?!-)$/ , 'Is not in correct format')
        .min(10)
        .max(63)
        .required("Required field"),
    password: yup.string()
        .typeError("Will be a string")
        .min(5, "the field contains an error")
        .max(30, "the field contains an error")
        .matches(/^(?!\-|\.)[0-9a-zA-Z\*\!\@\#\$\%\^\&\(\)\{\}\[\]\:\;\<\>,\.\?\/\~_\+\-\=\|\\]{5,30}$/, 'Is not in correct format')
        .required("Required field"),
});


export const repeatVerifyValidationSchema = yup.object().shape({
    email: yup.string()
            .typeError("Will be a string")
            .email()
            .matches( /^(?!-)([\w\.\!#\$%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{2,})+@(([\w\.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{1,56})+\.)+[\w]{2,}(?!-)$/ , 'Is not in correct format')
            .min(10)
            .max(63)
            .required("Required field")
});

