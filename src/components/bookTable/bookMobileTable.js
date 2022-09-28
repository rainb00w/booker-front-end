import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTable.module.css';
import star from './symbol-defs.svg';

export default function BookTableMobile({
  text,
  title = 'The Catcher in the Rye',
  author = 'Джером Сэлинджер',
  year = 1951,
  pages = 213,
  rating = 5,
}) {
  return (
    <>
      <section className={s.section}>
        <h3 className={s.title}>{text}</h3>
        <ul className={s.table}>
          <li>
            <p className={s.subtitle}>
              {text === 'Reading now' ? (
                <svg width={22} height={17}>
                  <use href={`${star}#yellow_book`}></use>
                </svg>
              ) : (
                <svg width={22} height={17}>
                  <use href={`${star}#white_book`}></use>
                </svg>
              )}
              {title}
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
            {text === 'Already read' && (
              <p className={s.subtitle}>
                <span className={s.topic}>Rating</span>
                {rating >= 1 ? (
                  <svg width={17} height={17}>
                    <use href={`${star}#yellow_star`}></use>
                  </svg>
                ) : (
                  <svg width={17} height={17}>
                    <use href={`${star}#white_star`}></use>
                  </svg>
                )}
                {rating >= 2 ? (
                  <svg width={17} height={17}>
                    <use href={`${star}#yellow_star`}></use>
                  </svg>
                ) : (
                  <svg width={17} height={17}>
                    <use href={`${star}#white_star`}></use>
                  </svg>
                )}
                {rating >= 3 ? (
                  <svg width={17} height={17}>
                    <use href={`${star}#yellow_star`}></use>
                  </svg>
                ) : (
                  <svg width={17} height={17}>
                    <use href={`${star}#white_star`}></use>
                  </svg>
                )}
                {rating >= 4 ? (
                  <svg width={17} height={17}>
                    <use href={`${star}#yellow_star`}></use>
                  </svg>
                ) : (
                  <svg width={17} height={17}>
                    <use href={`${star}#white_star`}></use>
                  </svg>
                )}
                {rating >= 5 ? (
                  <svg width={17} height={17}>
                    <use href={`${star}#yellow_star`}></use>
                  </svg>
                ) : (
                  <svg width={17} height={17}>
                    <use href={`${star}#white_star`}></use>
                  </svg>
                )}
                <button type="button" className={s.btn}>
                  Resume
                </button>
              </p>
            )}
          </li>
        </ul>
      </section>
    </>
  );
}
BookTableMobile.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
