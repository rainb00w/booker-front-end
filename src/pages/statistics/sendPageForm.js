import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useUpdateTrainingMutation } from '../../redux/books/trainingApi';
import { useDispatch, useSelector } from 'react-redux';
import { setTrainingState } from 'redux/auth/auth-slice';
import s from './statisticsList.module.css';

const SendPageForm = ({ startDate = null }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [updateTraining, { error }] = useUpdateTrainingMutation();

  console.log(error);

  const now = new Date();
  const today = Date.parse(now) + 3600 * 1000;
  const yesterday = now.setDate(now.getDate() - 1);
  Date.prototype.yyyymmdd = function () {
    let mm = this.getMonth() + 1; // getMonth() is zero-based
    let dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd,
    ].join('-');
  };
  console.log(startDate);
  const d = new Date(startDate);
  const minDate = d.setDate(d.getDate() - 1);
  console.log(minDate);
  const formik = useFormik({
    initialValues: {
      dateInput: new Date().yyyymmdd(),
      pageInput: '',
    },
    validationSchema: Yup.object().shape({
      dateInput: Yup.date()
        .min(
          new Date(minDate).yyyymmdd(),
          'Ви не можете ввести дату до початку тренування'
        )
        .max(new Date(today).yyyymmdd(), 'Ви не можете ввести цю дату'),
      pageInput: Yup.number()
        .positive('Введіть корректну кількість сторінок')
        .integer('К-ть сторінок має бути ціла')
        .max(999, 'Забагато сторінок')
        .required('Введіть кількість сторінок'),
    }),
    onSubmit: ({ dateInput, pageInput }, { resetForm }) => {
      let dateToSend = new Date();
      const year = dateInput.toString().slice(0, 4);
      const month = dateInput.toString().slice(5, 7);
      const day = dateInput.toString().slice(8, 10);
      dateToSend.setFullYear(year, month - 1, day);
      updateTraining({
        date: dateToSend,
        pages: pageInput,
      }).then(info => {
        if (info.data.completed) {
          dispatch(setTrainingState(true));
        }
      });
      if (error) {
        console.log('erere');
      }
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.formResults}>
      <div className={s.inputs}>
        <label className={s.inputsLabel}>
          {t('date')}

          <input
            className={s.inputDate}
            type="date"
            name="dateInput"
            max={new Date(today).yyyymmdd()}
            min={new Date(yesterday).yyyymmdd()}
            onChange={formik.handleChange}
            value={formik.values.dateInput}
          />
          {formik.errors.dateInput && formik.touched.dateInput ? (
            <div>{formik.errors.dateInput}</div>
          ) : null}
        </label>
        <label className={s.inputsLabel}>
          {t('amountOfPages_results')}

          <input
            className={s.inputPage}
            type="number"
            name="pageInput"
            onChange={formik.handleChange}
            value={formik.values.pageInput}
          />

          {formik.errors.pageInput && formik.touched.pageInput ? (
            <div>{formik.errors.pageInput}</div>
          ) : null}
        </label>
    
      </div>
      {error && <div className={s.backEndError} ><p>{error.data.message}</p></div>}
      <button className={s.addResultBtn} type="submit">
        {t('addResult')}
      </button>
    </form>
  );
};
export default SendPageForm;
