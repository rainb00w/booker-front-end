import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTable.module.css';
import icons from './symbol-defs.svg';
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
} from 'redux/books/booksApi';

export default function BookTable() {
  const { data } = useGetAllBooksQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteBookMutation();

  console.log(data);
  const status = e => {
    const status = data?.payload.books.some(book => book.status === e);
    return status;
  };

  return (
    <>
      <section className={s.section}>
        {status('haveRead') && (
          <div className={s.table}>
            <h3 className={s.title}>Already read</h3>
            <table className={s.subTable}>
              <thead className={s.head}>
                <tr>
                  <th className={s.topic} width="30%">
                    Book title
                  </th>
                  <th className={s.topic} width="25%">
                    Author
                  </th>
                  <th className={s.topic} width="10%">
                    Year
                  </th>
                  <th className={s.topic} width="10%">
                    Pages
                  </th>
                  <th className={s.topic} width="25%">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className={s.body}>
                {data?.payload.books.map(
                  ({
                    _id,
                    author,
                    pages,
                    title,
                    year,
                    status,
                    rating = 0,
                    resume,
                  }) =>
                    status === 'haveRead' && (
                      <tr key={_id} className={s.item}>
                        <td className={s.subtitle}>
                          <svg width={22} height={17} className={s.img}>
                            <use href={`${icons}#white_book`}></use>
                          </svg>
                          {title}
                        </td>
                        <td className={s.subtitle}>{author}</td>
                        <td className={s.subtitle}>{year}</td>
                        <td className={s.subtitle}>{pages}</td>
                        <td className={s.subtitle}>
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
                          <button type="button" className={s.btn}>
                            Resume
                          </button>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}

        {status('reading') && (
          <div className={s.table}>
            <h3 className={s.title}>Reading now</h3>
            <table className={s.subTable}>
              <thead className={s.head}>
                <tr>
                  <th className={s.topic} width="55%">
                    Book title
                  </th>
                  <th className={s.topic} width="25%">
                    Author
                  </th>
                  <th className={s.topic} width="10%">
                    Year
                  </th>
                  <th className={s.topic} width="10%">
                    Pages
                  </th>
                </tr>
              </thead>
              <tbody className={s.body}>
                {data?.payload.books.map(
                  ({ _id, author, pages, title, year, status, rating }) =>
                    status === 'reading' && (
                      <tr key={_id} className={s.item}>
                        <td className={s.subtitle}>
                          <svg width={22} height={17} className={s.img}>
                            <use href={`${icons}#yellow_book`}></use>
                          </svg>
                          {title}
                        </td>
                        <td className={s.subtitle}> {author}</td>
                        <td className={s.subtitle}>{year}</td>
                        <td className={s.subtitle}>{pages}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
        {status('toRead') && (
          <div className={s.table}>
            <h3 className={s.title}>Going to read</h3>
            <table className={s.subTable}>
              <thead className={s.head}>
                <tr>
                  <th className={s.topic} width="55%">
                    Book title
                  </th>
                  <th className={s.topic} width="25%">
                    Author
                  </th>
                  <th className={s.topic} width="10%">
                    Year
                  </th>
                  <th className={s.topic} width="5%">
                    Pages
                  </th>
                  <th className={s.topic} width="5%"></th>
                </tr>
              </thead>
              <tbody className={s.body}>
                {data?.payload.books.map(
                  ({ _id, author, pages, title, year, status }) =>
                    status === 'toRead' && (
                      <tr key={_id} className={s.item}>
                        <td className={s.subtitle}>
                          <svg width={22} height={17} className={s.img}>
                            <use href={`${icons}#white_book`}></use>
                          </svg>
                          {title}
                        </td>
                        <td className={s.subtitle}> {author}</td>
                        <td className={s.subtitle}>{year}</td>
                        <td className={s.subtitle}>{pages}</td>
                        <td>
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
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
BookTable.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  year: PropTypes.number,
  pages: PropTypes.number,
  rating: PropTypes.number,
  status: PropTypes.string,
};
