import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTableTraining.module.css';
import icons from './symbol-defs.svg';
import { useTranslation } from 'react-i18next';

export default function BookMobileTableTraining({
  booksList,
  onClick,
  isEmptyTraining,
}) {
  const handleDelete = e => {
    // console.log(e.currentTarget);
    onClick(e.currentTarget.id);
  };

  const { t } = useTranslation();

  return (
    <>
      {booksList.length === 0 && (
        <section className={s.sectionEmpty}>
          <ul className={s.booksListEmpty}>
            <li className={s.booksListItem}>
              <svg width={22} height={17} className={s.bookIcon}>
                <use href={`${icons}#white_book`}></use>
              </svg>

              <div className={s.mobileContainer}>
                <p className={s.subtitle1}>
                  <span className={s.titleMobile}>...</span>
                </p>
                <p className={s.subtitle}>
                  <span className={s.topic}> {t('book_author')}:</span> ...
                </p>
                <p className={s.subtitle}>
                  <span className={s.topic}> {t('book_year')}:</span>
                  ...
                </p>
                <p className={s.subtitle}>
                  <span className={s.topic}> {t('book_pages')}:</span>
                  ...
                </p>
              </div>
            </li>
          </ul>
        </section>
      )}

      {booksList.length !== 0 && (
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
                {status === 'haveRead' && !isEmptyTraining && (
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
                    <span className={s.topic}> {t('book_author')}:</span>{' '}
                    {author}
                  </p>
                  <p className={s.subtitle}>
                    <span className={s.topic}> {t('book_year')}:</span>
                    {year}
                  </p>
                  <p className={s.subtitle}>
                    <span className={s.topic}> {t('book_pages')}:</span>
                    {pages}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
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
