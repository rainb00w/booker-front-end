import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTableTraining.module.css';
import star from './symbol-defs.svg';

export default function BookMobileTableTraining({ booksList, onClick }) {
  const handleDelete = e => {
    console.log(e.currentTarget);
    onClick(e.currentTarget.id);
  };

  return (
    <>
      <section className={s.section}>
        <ul className={s.booksList}>
          {booksList.map(({ _id, author, pages, title, year }) => (
            <li key={_id} className={s.booksListItem}>
              <svg width={22} height={17}>
                <use href={`${star}#white_book`}></use>
              </svg>
              <div className={s.mobileContainer}>
                <p className={s.subtitle1}>
                  <span className={s.titleMobile}>{title}</span>

                  <button
                    id={_id}
                    type="button"
                    className={s.btnDelete}
                    onClick={handleDelete}
                  >
                    <svg width={22} height={17} className={s.bookIcon}>
                      <use href={`${star}#icon-delete`}></use>
                    </svg>
                  </button>
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

  onClick: PropTypes.func,
};
