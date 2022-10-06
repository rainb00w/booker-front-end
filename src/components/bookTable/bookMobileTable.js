import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './bookTable.module.css';
import icons from './symbol-defs.svg';
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
  useUpdateBookResumeMutation
} from 'redux/books/booksApi';
import { useTranslation } from 'react-i18next';
import RatingBookWrapper from 'components/RatingBookWrapper';
import ChooseRating from 'components/RatingBook/ChooseRating/ChooseRating';

export default function BookTableMobile() {
  const { data } = useGetAllBooksQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteBookMutation();
  const [updateBookResume] = useUpdateBookResumeMutation();
  const status = e => {
    const status = data?.payload.books.some(book => book.status === e);
    return status;
  };
  const { t } = useTranslation();

  return (
    <>
      <section className={s.section}>
        {status('haveRead') && (
          <div className={s.table}>
            <h3 className={s.title}> {t('alreadyRead')}</h3>
            <ul className={s.table}>
              {data?.payload.books.map(
                ({ _id, author, pages, title, year, status, rating, resume }) => {
                  const [ratingValue, setRatingValue] = useState(rating);
                  if (status === 'haveRead') return (
                    <li key={_id} className={s.item}>
                      <p className={s.subtitle}>
                        <svg width={22} height={17} className={s.img}>
                          <use href={`${icons}#white_book`}></use>
                        </svg>
                        {title}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_author')}:</span>{' '}
                        {author}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}> {t('book_year')}:</span>
                        {year}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_pages')}:</span>
                        {pages}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}> {t('book_rating')}:</span>
                        <ChooseRating
                          setRating={async(event, newValue) => {
                            setRatingValue(newValue);
                            await updateBookResume({ id: _id, rating });
                          }}
                          rating={ratingValue}
                          name="rating"
                        />
                      </p>
                      <RatingBookWrapper
                        id={_id}
                        resume={resume}
                        rating={rating}
                      />
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        )}
        {status('reading') && (
          <div className={s.table}>
            <h3 className={s.title}> {t('readingNow')}</h3>
            <ul className={s.table}>
              {data?.payload.books.map(
                ({ _id, author, pages, title, year, status, rating }) =>
                  status === 'reading' && (
                    <li key={_id} className={s.item}>
                      <p className={s.subtitle}>
                        <svg width={22} height={17} className={s.img}>
                          <use href={`${icons}#yellow_book`}></use>
                        </svg>
                        {title}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_author')}:</span>{' '}
                        {author}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_year')}:</span>
                        {year}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_pages')}:</span>
                        {pages}
                      </p>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
        {status('toRead') && (
          <div className={s.table}>
            <h3 className={s.title}> {t('goingToRead')}</h3>
            <ul className={s.table}>
              {data?.payload.books.map(
                ({ _id, author, pages, title, year, status }) =>
                  status === 'toRead' && (
                    <li key={_id} className={s.item}>
                      <p className={s.subtitle}>
                        <svg width={22} height={17} className={s.img}>
                          <use href={`${icons}#white_book`}></use>
                        </svg>
                        {title}
                        <button
                          className={s.btnDelete}
                          id={_id}
                          type="button"
                          onClick={() => deleteContact(_id)}
                          disabled={isDeleting}
                        >
                          <svg width={22} height={17}>
                            <use href={`${icons}#delete_book`}></use>
                          </svg>
                        </button>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_author')}:</span>{' '}
                        {author}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_year')}:</span>
                        {year}
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_pages')}:</span>
                        {pages}
                      </p>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
BookTableMobile.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  year: PropTypes.number,
  pages: PropTypes.number,
  rating: PropTypes.number,
  status: PropTypes.string,
};
