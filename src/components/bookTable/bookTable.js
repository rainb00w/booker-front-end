import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './bookTable.module.css';
import icons from './symbol-defs.svg';
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
} from 'redux/books/booksApi';
import { useTranslation } from 'react-i18next';
import RatingBookWrapper from 'components/RatingBookWrapper';
import EllipsisText from 'react-ellipsis-text';
import { useMediaQuery } from 'react-responsive';
import DeleteModal from './deleteModal';

export default function BookTable() {
  const { data } = useGetAllBooksQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteBookMutation();
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  // console.log(data);
  const status = e => {
    const status = data?.payload.books.some(book => book.status === e);
    return status;
  };
  const [id, serId] = useState(null);
  const [open, setOpen] = useState(false);
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
            <table className={s.subTable}>
              <thead className={s.head}>
                <tr>
                  <th className={s.topic} width="30%">
                    {t('book_title')}
                  </th>
                  <th className={s.topic} width="25%">
                    {t('book_author')}
                  </th>
                  <th className={s.topic} width="10%">
                    {t('book_year')}
                  </th>
                  <th className={s.topic} width="10%">
                    {t('book_pages')}
                  </th>
                  <th className={s.topic} width="25%">
                    {t('book_rating')}
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
                          <EllipsisText
                            text={title}
                            length={isDesktop ? 40 : 18}
                          />
                        </td>
                        <td className={s.subtitle}>
                          <EllipsisText
                            text={author}
                            length={isDesktop ? 30 : 18}
                          />
                        </td>
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
                          <RatingBookWrapper
                            id={_id}
                            resume={resume}
                            rating={rating}
                          />
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
            <h3 className={s.title}> {t('readingNow')}</h3>
            <table className={s.subTable}>
              <thead className={s.head}>
                <tr>
                  <th className={s.topic} width="55%">
                    {t('book_title')}
                  </th>
                  <th className={s.topic} width="25%">
                    {t('book_author')}
                  </th>
                  <th className={s.topic} width="10%">
                    {t('book_year')}
                  </th>
                  <th className={s.topic} width="10%">
                    {t('book_pages')}
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
                          <EllipsisText
                            text={title}
                            length={isDesktop ? 50 : 25}
                          />
                        </td>
                        <td className={s.subtitle}>
                          <EllipsisText
                            text={author}
                            length={isDesktop ? 32 : 18}
                          />
                        </td>
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
            <h3 className={s.title}> {t('goingToRead')} </h3>
            <table className={s.subTable}>
              <thead className={s.head}>
                <tr>
                  <th className={s.topic} width="55%">
                    {t('book_title')}
                  </th>
                  <th className={s.topic} width="25%">
                    {t('book_author')}
                  </th>
                  <th className={s.topic} width="10%">
                    {t('book_year')}
                  </th>
                  <th className={s.topic} width="5%">
                    {t('book_pages')}
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
                          <EllipsisText
                            text={title}
                            length={isDesktop ? 50 : 25}
                          />
                        </td>
                        <td className={s.subtitle}>
                          <EllipsisText
                            text={author}
                            length={isDesktop ? 32 : 18}
                          />
                        </td>
                        <td className={s.subtitle}>{year}</td>
                        <td className={s.subtitle}>{pages}</td>
                        <td>
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
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
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
BookTable.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  year: PropTypes.number,
  pages: PropTypes.number,
  rating: PropTypes.number,
  status: PropTypes.string,
};
