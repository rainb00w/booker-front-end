import { YearPicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import s from './statisticsList.module.css';
const SendPageForm = () => {
  Date.prototype.yyyymmdd = function () {
    let mm = this.getMonth() + 1; // getMonth() is zero-based
    let dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  };

  const formik = useFormik({
    initialValues: {
      dateInput: new Date().yyyymmdd(),
      pageInput: '',
    },
    validationSchema: Yup.object().shape({
      dateInput: Yup.date()
        .min('2020-01-01') // тут повинна бути дата реєстрації користувача або якась інша
        .max(new Date().yyyymmdd(), 'Ви не можете ввести дату в майбутньому'), // максимальна дата - це сьогодні
      pageInput: Yup.number()
        .positive('Введіть корректну кількість сторінок')
        .integer('К-ть сторінок має бути ціла')
        .required('Введіть кількість сторінок'),
    }),
    onSubmit: ({ dateInput, pageInput }) => {
      console.log({ date: dateInput, pages: pageInput });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={s.inputs}>
        <label className={s.inputsLabel}>
          Дата
          {formik.errors.dateInput && formik.touched.dateInput ? (
            <div>{formik.errors.dateInput}</div>
          ) : null}
          <input
            className={s.inputPage}
            type="date"
            name="dateInput"
            onChange={formik.handleChange}
            value={formik.values.dateInput}
          />
        </label>
        <label className={s.inputsLabel}>
          Кількість сторінок
          {formik.errors.pageInput && formik.touched.pageInput ? (
            <div>{formik.errors.pageInput}</div>
          ) : null}
          <input
            className={s.inputDate}
            type="number"
            name="pageInput"
            onChange={formik.handleChange}
            value={formik.values.pageInput}
          />
        </label>
      </div>
      <button className={s.addResultBtn} type="submit">
        Додати результат
      </button>
    </form>
  );
};
export default SendPageForm;
