import React from 'react';
import PropTypes from 'prop-types';
import s from './bookTableTraining.module.css';
import icons from './symbol-defs.svg';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

export default function BookTableTraining({
  booksList,
  onClick,
  isEmptyTraining,
}) {
  const handleDelete = e => {
    onClick(e.currentTarget.id);
  };
  const { t } = useTranslation();

  return (
    <>
      <section className={s.sectionTable}>
        <table className={s.table}>
          <thead className={s.thead}>
            <tr className={s.tr}>
              <th className={s.topic}> {t('book_title')}</th>
              <th className={s.topic} width="25%">
                {t('book_author')}
              </th>
              <th className={s.topic} width="15%">
                {t('book_year')}
              </th>
              <th className={s.topic} width="20%">
                {t('book_pages')}
              </th>
            </tr>
          </thead>
        </table>
        {booksList.length === 0 && (
          <div className={s.containerEmpty}>
            <svg width={22} height={17} className={s.bookIcon}>
              <use href={`${icons}#white_book`}></use>
            </svg>
            <span className={s.spanEmpty}>...</span>
          </div>
        )}
        <div className={s.container}>
          <table className={s.table}>
            <tbody className={s.tbody}>
              {booksList.map(({ _id, author, pages, title, year, status }) => (
                <tr key={_id}>
                  <td className={s.tdTitle}>
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
                  <td className={s.td} width={isEmptyTraining ? '10%' : '20%'}>
                    {pages}
                  </td>
                  {isEmptyTraining && (
                    <td className={s.td} width="10%">
                      <button
                        id={_id}
                        type="button"
                        className={s.btnDelete}
                        onClick={handleDelete}
                      >
                        <svg width={22} height={17}>
                          <use href={`${icons}#icon-delete`}></use>
                        </svg>
                      </button>
                    </td>
                  )}
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

  onClick: PropTypes.func.isRequired,
  isEmptyTraining: PropTypes.bool.isRequired,
};
