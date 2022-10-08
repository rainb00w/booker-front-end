import * as yup from "yup";

const schemaValidChooseRating = yup.object().shape({
    resume: yup.string()
        .min(1, 'Too short resume!')
        .max(1000, 'You have exceeded the word limit')
        .typeError('Must be a string!')
});

export default schemaValidChooseRating;
