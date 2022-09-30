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
    onSubmit: ({ dateInput, pageInput }) => {
      console.log(dateInput, pageInput);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={s.inputs}>
        <label className={s.inputsLabel}>
          Дата
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
