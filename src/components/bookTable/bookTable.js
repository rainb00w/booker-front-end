import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTable.module.css';
import star from './symbol-defs.svg';
import { useGetAllBooksQuery } from 'redux/books/booksApi';

export default function BookTable({
  text,
  title = 'The Catcher in the Rye',
  author = 'Джером Сэлинджер',
  year = 1951,
  pages = 213,
  rating = 5,
}) {
  const { data } = useGetAllBooksQuery();

  return (
    <>
      {/* По полю статус можно разделить книги по разделам.  */}
      {data?.payload.books.map(({ author, pages, title, year, status }) => (
        <p key={title}>
          {title} , Автор : {author} , Страниц : {pages} , Год : {year}, Статус
     
        </p>
      ))}

      <section className={s.section}>
        <h3 className={s.title}>{text}</h3>
        <table className={s.table}>
          <thead>
            <tr>
              <th className={s.topic}>Book title</th>
              <th className={s.topic}>Author</th>
              <th className={s.topic}>Year</th>
              <th className={s.topic}>Pages</th>
              {text === 'Already read' && <th className={s.topic}>Rating</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
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
              </td>
              <td>{author}</td>
              <td>{year}</td>
              <td>{pages}</td>
              {text === 'Already read' && (
                <td>
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
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
BookTable.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};
