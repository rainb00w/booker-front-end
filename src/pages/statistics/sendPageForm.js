import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import s from './statisticsList.module.css';

const SendPageForm = ({ startDate = null }) => {
  const { t } = useTranslation();
  Date.prototype.yyyymmdd = function () {
    let mm = this.getMonth() + 1; // getMonth() is zero-based
    let dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  };

  // console.log(new Date(), 'Дата початку тренування');

  const formik = useFormik({
    initialValues: {
      dateInput: new Date().yyyymmdd(),
      pageInput: '',
    },
    validationSchema: Yup.object().shape({
      dateInput: Yup.date()
        .min(
          new Date(startDate).yyyymmdd(),
          'Ви не можете ввести дату до початку тренування'
        ) // тут треба потестить
        .max(new Date().yyyymmdd(), 'Ви не можете ввести дату в майбутньому'), // максимальна дата - це сьогодні
      pageInput: Yup.number()
        .positive('Введіть корректну кількість сторінок')
        .integer('К-ть сторінок має бути ціла')
        .max(999, 'Забагато сторінок')
        .required('Введіть кількість сторінок'),
    }),
    onSubmit: ({ dateInput, pageInput }, { resetForm }) => {
      console.log({
        date: dateInput,
        time: new Date(),
        pages: pageInput,
      });
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.formResults}>
      <div className={s.inputs}>
        <label className={s.inputsLabel}>
          {t('date')}
          {formik.errors.dateInput && formik.touched.dateInput ? (
            <div>{formik.errors.dateInput}</div>
          ) : null}
          <input
            className={s.inputDate}
            type="date"
            name="dateInput"
            onChange={formik.handleChange}
            value={formik.values.dateInput}
          />
        </label>
        <label className={s.inputsLabel}>
          {t('amountOfPages_results')}
          {formik.errors.pageInput && formik.touched.pageInput ? (
            <div>{formik.errors.pageInput}</div>
          ) : null}
          <input
            className={s.inputPage}
            type="number"
            name="pageInput"
            onChange={formik.handleChange}
            value={formik.values.pageInput}
          />
        </label>
      </div>
      <button className={s.addResultBtn} type="submit">
        {t('addResult')}
      </button>
    </form>
  );
};
export default SendPageForm;
