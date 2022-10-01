import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTableTraining.module.css';
import star from './symbol-defs.svg';
import Tooltip from '@mui/material/Tooltip';

export default function BookTableTraining({ booksList, onClick }) {
  const handleDelete = e => {
    console.log(e.currentTarget.id);
    onClick(e.currentTarget.id);
  };

  return (
    <>
      <section className={s.sectionTable}>
        <table className={s.table}>
          <thead className={s.thead}>
            <tr className={s.tr}>
              <th className={s.topic}>Book title</th>
              <th className={s.topic} width="25%">
                Author
              </th>
              <th className={s.topic} width="15%">
                Year
              </th>
              <th className={s.topic} width="25%">
                Pages
              </th>
            </tr>
          </thead>
        </table>
        <div className={s.container}>
          <table className={s.table}>
            <tbody className={s.tbody}>
              {booksList.map(({ _id, author, pages, title, year }) => (
                <tr key={_id + author}>
                  <td className={s.tdTitle}>
                    <svg width={22} height={17} className={s.bookIcon}>
                      <use href={`${star}#white_book`}></use>
                    </svg>
                    <Tooltip title={title}>
                      <span className={s.textContainer}>{title}</span>
                    </Tooltip>
                  </td>

                  <td className={s.td} width="25%">
                    {author}
                  </td>
                  <td className={s.td} width="15%">
                    {year}
                  </td>
                  <td className={s.td} width="15%">
                    {pages}
                  </td>
                  <td className={s.td} width="10%">
                    <button
                      id={_id}
                      type="button"
                      className={s.btnDelete}
                      onClick={handleDelete}
                    >
                      <svg width={22} height={17}>
                        <use href={`${star}#icon-delete`}></use>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

BookTableTraining.propTypes = {
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
