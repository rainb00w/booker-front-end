import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTableTraining.module.css';
import icons from './symbol-defs.svg';

export default function BookMobileTableTraining({
  booksList,
  onClick,
  isEmptyTraining,
}) {
  const handleDelete = e => {
    console.log(e.currentTarget);
    onClick(e.currentTarget.id);
  };

  return (
    <>
      <section className={s.section}>
        <ul className={s.booksList}>
          {booksList.map(({ _id, author, pages, title, year, status }) => (
            <li key={_id} className={s.booksListItem}>
              {(status === 'toRead' ||
                status === 'reading' ||
                isEmptyTraining) && (
                <svg width={22} height={17} className={s.bookIcon}>
                  <use href={`${icons}#white_book`}></use>
                </svg>
              )}
              {status === 'readed' && !isEmptyTraining && (
                <svg width={22} height={17} className={s.bookIcon}>
                  <use href={`${icons}#yellow_book`}></use>
                </svg>
              )}
              <div className={s.mobileContainer}>
                <p className={s.subtitle1}>
                  <span className={s.titleMobile}>{title}</span>

                  {isEmptyTraining && (
                    <button
                      id={_id}
                      type="button"
                      className={s.btnDelete}
                      onClick={handleDelete}
                    >
                      <svg width={22} height={17} className={s.bookIcon}>
                        <use href={`${icons}#icon-delete`}></use>
                      </svg>
                    </button>
                  )}
                </p>
                <p className={s.subtitle}>
                  <span className={s.topic}>Author:</span> {author}
                </p>
                <p className={s.subtitle}>
                  <span className={s.topic}>Year:</span>
                  {year}
                </p>
                <p className={s.subtitle}>
                  <span className={s.topic}>Pages:</span>
                  {pages}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

BookMobileTableTraining.propTypes = {
  booksList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      year: PropTypes.number,
      pages: PropTypes.number.isRequired,
    })
  ),

  onClick: PropTypes.func.isRequired,

  isEmptyTraining: PropTypes.bool.isRequired,
};
