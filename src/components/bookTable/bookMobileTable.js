import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './bookTable.module.css';
import icons from './symbol-defs.svg';
import EllipsisText from 'react-ellipsis-text';
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
} from 'redux/books/booksApi';
import { useTranslation } from 'react-i18next';
import RatingBookWrapper from 'components/RatingBookWrapper';
import DeleteModal from './deleteModal';
// import NestingModal from 'components/RatingBook/RatingModal/NestingModal/NestingModal';
export default function BookTableMobile() {
  const { data } = useGetAllBooksQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteBookMutation();
  const status = e => {
    const status = data?.payload.books.some(book => book.status === e);
    return status;
  };
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [id, serId] = useState(null);
  const handleOpen = id => {
    serId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <section className={s.section}>
        {status('haveRead') && (
          <div className={s.table}>
            <h3 className={s.title}> {t('alreadyRead')}</h3>
            <ul className={s.table}>
              {data?.payload.books.map(
                ({ _id, author, pages, title, year, status, rating, resume }) =>
                  status === 'haveRead' && (
                    <li key={_id} className={s.item}>
                      <p className={s.subtitle}>
                        <svg width={22} height={17} className={s.img}>
                          <use href={`${icons}#white_book`}></use>
                        </svg>
                        <span className={s.meaningTitle}>{title}</span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_author')}:</span>
                        <span className={s.meaning}>
                          <EllipsisText text={author} length={20} />
                        </span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}> {t('book_year')}:</span>
                        <span className={s.meaning}>{year}</span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_pages')}:</span>
                        <span className={s.meaning}>{pages}</span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>
                          {t('book_rating_mobile')}:
                        </span>
                        {rating >= 1 ? (
                          <svg width={17} height={17}>
                            <use href={`${icons}#yellow_star`}></use>
                          </svg>
                        ) : (
                          <svg width={17} height={17}>
                            <use href={`${icons}#white_star`}></use>
                          </svg>
                        )}
                        {rating >= 2 ? (
                          <svg width={17} height={17}>
                            <use href={`${icons}#yellow_star`}></use>
                          </svg>
                        ) : (
                          <svg width={17} height={17}>
                            <use href={`${icons}#white_star`}></use>
                          </svg>
                        )}
                        {rating >= 3 ? (
                          <svg width={17} height={17}>
                            <use href={`${icons}#yellow_star`}></use>
                          </svg>
                        ) : (
                          <svg width={17} height={17}>
                            <use href={`${icons}#white_star`}></use>
                          </svg>
                        )}
                        {rating >= 4 ? (
                          <svg width={17} height={17}>
                            <use href={`${icons}#yellow_star`}></use>
                          </svg>
                        ) : (
                          <svg width={17} height={17}>
                            <use href={`${icons}#white_star`}></use>
                          </svg>
                        )}
                        {rating >= 5 ? (
                          <svg width={17} height={17}>
                            <use href={`${icons}#yellow_star`}></use>
                          </svg>
                        ) : (
                          <svg width={17} height={17}>
                            <use href={`${icons}#white_star`}></use>
                          </svg>
                        )}
                      </p>
                      <RatingBookWrapper
                        id={_id}
                        resume={resume}
                        rating={rating}
                      />
                    </li>
                  )
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
                        <span className={s.meaningTitle}>{title}</span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_author')}:</span>
                        <span className={s.meaning}>
                          <EllipsisText text={author} length={20} />
                        </span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_year')}:</span>
                        <span className={s.meaning}>{year}</span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_pages')}:</span>
                        <span className={s.meaning}>{pages}</span>
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
                        <span className={s.meaningTitle}>{title}</span>
                        <button
                          className={s.btnDelete}
                          id={_id}
                          type="button"
                          onClick={() => {
                            handleOpen(_id);
                          }}
                          // disabled={isDeleting}
                        >
                          <svg width={22} height={17}>
                            <use href={`${icons}#delete_book`}></use>
                          </svg>
                        </button>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_author')}:</span>
                        <span className={s.meaning}>
                          <EllipsisText text={author} length={20} />
                        </span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_year')}:</span>
                        <span className={s.meaning}>{year}</span>
                      </p>
                      <p className={s.subtitle}>
                        <span className={s.topic}>{t('book_pages')}:</span>
                        <span className={s.meaning}>{pages}</span>
                      </p>
                    </li>
                  )
              )}
            </ul>
            <DeleteModal
              open={open}
              handleClose={handleClose}
              handleDelete={() => {
                deleteContact(id);
                setOpen(false);
              }}
              isDeleting={isDeleting}
            />
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
