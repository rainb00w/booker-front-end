import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTable.module.css';
import star from './symbol-defs.svg';
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
} from 'redux/books/booksApi';

export default function BookTableMobile() {
  const { data } = useGetAllBooksQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteBookMutation();

  return (
    <>
      <section className={s.section}>
        <div className={s.table}>
          <h3 className={s.title}>Already read</h3>
          <ul className={s.table}>
            {data?.payload.books.map(
              ({ _id, author, pages, title, year, status }) =>
                status === 'haveRead' && (
                  <li key={_id} className={s.item}>
                    <p className={s.subtitle}>
                      <svg width={22} height={17} className={s.img}>
                        <use href={`${star}#white_book`}></use>
                      </svg>
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
                    </p>
                    <button type="button" className={s.btn}>
                      Resume
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={s.table}>
          <h3 className={s.title}>Reading now</h3>
          <ul className={s.table}>
            {data?.payload.books.map(
              ({ _id, author, pages, title, year, status }) =>
                status === 'reading' && (
                  <li key={_id} className={s.item}>
                    <p className={s.subtitle}>
                      <svg width={22} height={17} className={s.img}>
                        <use href={`${star}#yellow_book`}></use>
                      </svg>
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
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={s.table}>
          <h3 className={s.title}>Going to read</h3>
          <ul className={s.table}>
            {data?.payload.books.map(
              ({ _id, author, pages, title, year, status }) =>
                status === 'toRead' && (
                  <li key={_id} className={s.item}>
                    <p className={s.subtitle}>
                      <svg width={22} height={17} className={s.img}>
                        <use href={`${star}#white_book`}></use>
                      </svg>
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
                    <button
                      type="button"
                      className={s.btn}
                      onClick={() => deleteContact(id)}
                      disabled={isDeleting}
                    >
                      Delete Book
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
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
