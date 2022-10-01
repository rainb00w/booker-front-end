import { Formik, Form, Field, ErrorMessage } from "formik";
import star from '../bookTable/symbol-defs.svg';
import s from './RatingBook.module.css';


const RatingBook = ({rating}) => {
    return (
        <Formik>
            <Form>
                <div className={s.container}>
                    <h2 className={s.title}>Обрати рейтинг книги</h2>
                        {rating >= 1 ? (
                            <svg width={17} height={17}>
                                <use href={`${star}#yellow_star`}></use>
                            </svg>
                        ) : (
                            <svg width={17} height={17}>
                                <use href={`${star}#white_star`}></use>
                            </svg>
                        )}
                        {rating >= 2 ? (
                            <svg width={17} height={17}>
                                <use href={`${star}#yellow_star`}></use>
                            </svg>
                        ) : (
                            <svg width={17} height={17}>
                                <use href={`${star}#white_star`}></use>
                            </svg>
                        )}
                        {rating >= 3 ? (
                            <svg width={17} height={17}>
                                <use href={`${star}#yellow_star`}></use>
                            </svg>
                        ) : (
                            <svg width={17} height={17}>
                                <use href={`${star}#white_star`}></use>
                            </svg>
                        )}
                        {rating >= 4 ? (
                            <svg width={17} height={17}>
                                <use href={`${star}#yellow_star`}></use>
                            </svg>
                        ) : (
                            <svg width={17} height={17}>
                                <use href={`${star}#white_star`}></use>
                            </svg>
                        )}
                        {rating >= 5 ? (
                            <svg width={17} height={17}>
                                <use href={`${star}#yellow_star`}></use>
                            </svg>
                        ) : (
                            <svg width={17} height={17}>
                                <use href={`${star}#white_star`}></use>
                            </svg>
                        )}
                    <h2 className={s.title}>Резюме</h2>
                    <Field
                        as="textarea"
                        placeholder="..."
                        type="text"
                        name="resume"
                        className={s.textarea}
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
        </Formik>
    )
}


export default RatingBook;