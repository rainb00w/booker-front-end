import s from './statisticsList.module.css';
const SendPageForm = () => {
  return (
    <form>
      <div className={s.inputs}>
        <label className={s.inputsLabel}>
          Дата
          <input className={s.inputPage} type="date" name="dateInput" />
        </label>
        <label className={s.inputsLabel}>
          Кількість сторінок
          <input className={s.inputDate} type="number" name="pageInput" />
        </label>
      </div>
      <button className={s.addResultBtn} type="submit">
        Додати результат
      </button>
    </form>
  );
};
export default SendPageForm;
