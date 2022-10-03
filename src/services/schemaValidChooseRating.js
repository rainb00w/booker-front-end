import * as yup from "yup";

const schemaValidChooseRating = yup.object().shape({
    resume: yup.string()
        .min(2, 'Too short resume!')
        .max(5000, 'You have exceeded the word limit')
        .required('Fill the gap, please!')
        .typeError('Must be a string!')
});

export default schemaValidChooseRating;