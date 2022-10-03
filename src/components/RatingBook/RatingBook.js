import { Formik, Form, Field, ErrorMessage } from "formik";
import schemaValidChooseRating from '../../services/schemaValidChooseRating';
import ChooseRating from "./ChooseRating/ChooseRating";
import s from './RatingBook.module.css';


const RatingBook = ({ resume }) => {
    return (
        <Formik
            initialValues={{ resume: resume }}
            validationSchema={schemaValidChooseRating}
        >
            {({ touched, errors }) => (
                <Form>
                    <div className={s.container}>
                        <h2 className={s.title}>Обрати рейтинг книги</h2>
                        <ChooseRating />
                        <h2 className={s.title}>Резюме</h2>
                        <Field
                            as="textarea"
                            placeholder="..."
                            type="text"
                            name="resume"
                            className={
                                `${touched.resume && errors.resume}` ? `${s.textarea}` : ''
                            }
                        />
                        <ErrorMessage
                            component="div"
                            name="resume"
                            className={s.errorMessage}
                        />
                        <div className={s.centered}>
                            <button type="button" className={s.btnBack}>Назад</button>
                            <button type="button" className={s.btnSave}>Зберегти</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};


export default RatingBook;