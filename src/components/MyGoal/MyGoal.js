import { useTranslation } from 'react-i18next';
import { useGetAllTrainingsQuery } from 'redux/books/trainingApi';
import s from './MyGoal.module.css';

const MyGoal = ({ days, books, booksLeft, isTrainigEmpty }) => {
  const { t } = useTranslation();

  if (days < 0) {
    days = 0;
  }

  return (
    <>
      {!isTrainigEmpty ? (
        <div className={s.myGoalMainBox}>
          <div className={s.myGoalHeadingBox}>
            <h3 className={s.myGoalHeading}> {t('myGoals')} </h3>
          </div>
          <div className={s.statsBox}>
            <ul className={s.myGoalStatsList}>
              <li className={s.myGoalStatsListItem}>
                <span className={s.myGoalStatsDigitBox}>
                  <p className={s.myGoalStatsDigit}>{books}</p>
                </span>
                <span className={s.myGoalStatsText}>
                  {' '}
                  {t('amountOfBooks')}{' '}
                </span>
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
      ) : (
        <div className={s.myGoalMainBox_training}>
          <div className={s.myGoalHeadingBox_training}>
            <h3 className={s.myGoalHeading}>{t('myGoals')}</h3>
          </div>
          <div className={s.statsBox_traning}>
            <ul className={s.myGoalStatsList_training}>
              <li className={s.myGoalStatsListItem_training}>
                <span className={s.myGoalStatsDigitBox_training}>
                  <p className={s.myGoalStatsDigit_training}>{books}</p>
                </span>
                <span className={s.myGoalStatsText}>{t('amountOfBooks')}</span>
              </li>
              <li className={s.myGoalStatsListItem_training}>
                <span className={s.myGoalStatsDigitBox_training}>
                  <p className={s.myGoalStatsDigit_training}>{days}</p>
                </span>
                <span className={s.myGoalStatsText}>{t('amountOfDays')}</span>
              </li>

              <li className={s.myGoalStatsListItem_training}>
                <span className={s.myGoalStatsDigitBox_training}>
                  <p className={s.myGoalStatsDigit_training_accent}>
                    {booksLeft}
                  </p>
                </span>
                <span className={s.myGoalStatsText}>{t('booksLeft')}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MyGoal;
