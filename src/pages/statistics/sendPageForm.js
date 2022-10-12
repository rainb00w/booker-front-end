import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useUpdateTrainingMutation } from '../../redux/books/trainingApi';
import { ReactComponent as Triangle } from '../../img/Triangle.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setTrainingState } from 'redux/auth/auth-slice';
import { setTrainingStatusJustCompleted } from 'redux/auth/auth-slice';
import ModalFinish from 'components/ModalFinish/ModalFinish';

import s from './statisticsList.module.css';

const SendPageForm = ({ startDate = null, refetchFucntion }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [updateTraining, { error }] = useUpdateTrainingMutation();

  const [open, setOpen] = useState(false);

  const handleExit = () => {
    setOpen(false);
    refetchFucntion();
    dispatch(setTrainingState('false'));
  };

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


  // console.log('yesterday',typeof yesterday, yesterday)
  // console.log('today',typeof today, today)
  // console.log('minDate',typeof minDate, minDate)



  const formik = useFormik({
    initialValues: {
      dateInput: new Date().yyyymmdd(),
      pageInput: '',
    },
    validationSchema: Yup.object().shape({
      dateInput: Yup.date()
        .min(new Date(yesterday).yyyymmdd(), t('results_err1'))
        .max(new Date(today).yyyymmdd(), t('results_err2')),
      pageInput: Yup.number()
        .integer(t('results_err4'))
        .min(1, t('results_err3'))
        .max(999, t('results_err5'))
        .required(t('results_err6')),
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
        if (info.data?.completed) {
          setOpen(true);
          // refetchFucntion();
          // dispatch(setTrainingState('false'));
          dispatch(setTrainingStatusJustCompleted('completedByPages'));
        }
      });
      // if (error) {
      //   console.log(error.message);
      // }
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.formResults}>
      <div className={s.inputs}>
        <label className={s.inputsLabelDate}>
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
          <Triangle className={s.triangle} />
        </label>

        <label className={s.inputsLabelPage}>
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
      {error && (
        <div className={s.backEndError}>
          <p>{error.data.message}</p>
        </div>
      )}
      <button className={s.addResultBtn} type="submit">
        {t('addResult')}
      </button>
      {open && <ModalFinish onClose={handleExit} />}
    </form>
  );
};
export default SendPageForm;
