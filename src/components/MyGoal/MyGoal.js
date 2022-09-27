import s from './MyGoal.module.css';

const MyGoal = () => {
    return (
        <>
            <div className={s.myGoalMainBox}>
                <div className={s.myGoalHeadingBox}>
                    <h3 className={s.myGoalHeading}>
                        Моя мета прочитати
                    </h3>
                </div>
                <div className={s.statsBox}>
                    <ul className={s.myGoalStatsList}>
                        <li className={s.myGoalStatsListItem}>
                            <span className={s.myGoalStatsDigitBox}>
                                <p className={s.myGoalStatsDigit}>
                                    0
                                </p>
                            </span>
                            <span className={s.myGoalStatsText}>
                                Кількість книжок
                            </span>
                        </li>
                        <li className={s.myGoalStatsListItem}>
                            <span className={s.myGoalStatsDigitBox}>
                                <p className={s.myGoalStatsDigit}>
                                    0
                                </p>
                            </span>
                            <span className={s.myGoalStatsText}>
                                Кількість днів
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default MyGoal;