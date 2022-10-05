import { useTranslation } from 'react-i18next';
import s from './MyGoal.module.css';

const MyGoal = ({ days, books }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={s.myGoalMainBox}>
        <div className={s.myGoalHeadingBox}>
          <h3 className={s.myGoalHeading}>  {t('myGoals')}  </h3>   
        </div>
        <div className={s.statsBox}>
          <ul className={s.myGoalStatsList}>
            <li className={s.myGoalStatsListItem}>
              <span className={s.myGoalStatsDigitBox}>
                <p className={s.myGoalStatsDigit}>{books}</p>
              </span>
              <span className={s.myGoalStatsText}>  {t('amountOfBooks')} </span>   
            </li>
            <li className={s.myGoalStatsListItem}>
              <span className={s.myGoalStatsDigitBox}>
                <p className={s.myGoalStatsDigit}>{days}</p>
              </span>
              <span className={s.myGoalStatsText}>{t('amountOfDays')}</span>    
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyGoal;
