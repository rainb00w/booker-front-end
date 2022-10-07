// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import s from './bookTable.module.css';
// import icons from './symbol-defs.svg';
// import {
//   useGetAllBooksQuery,
//   useDeleteBookMutation,
//   useUpdateBookResumeMutation,
// } from 'redux/books/booksApi';
// import RatingBookWrapper from 'components/RatingBookWrapper';
// import ChooseRating from 'components/RatingBook/ChooseRating/ChooseRating';

// export default function BookTableItem(
//   _id,
//   title,
//   author,
//   year,
//   pages,
//   rating,
//   resume
// ) {
//   const { data } = useGetAllBooksQuery();
//   const [deleteContact, { isLoading: isDeleting }] = useDeleteBookMutation();
//   const [updateBookResume] = useUpdateBookResumeMutation();
//   const [ratingValue, setRatingValue] = useState(rating);

//   const status = e => {
//     const status = data?.payload.books.some(book => book.status === e);
//     return status;
//   };

//   return (
//     <>
//       <tr className={s.item}>
//         <td className={s.subtitle}>
//           {status === 'haveRead' ? (
//             <svg width={22} height={17} className={s.img}>
//               <use href={`${icons}#white_book`}></use>
//             </svg>
//           ) : (
//             <svg width={22} height={17} className={s.img}>
//               <use href={`${icons}#white_book`}></use>
//             </svg>
//           )}
//           {title}
//         </td>
//         <td className={s.subtitle}>{author}</td>
//         <td className={s.subtitle}>{year}</td>
//         <td className={s.subtitle}>{pages}</td>
//         {status === 'haveRead' && (
//           <td className={s.subtitleRating}>
//             <ChooseRating
//               setRating={async newValue => {
//                 setRatingValue(newValue);
//                 await updateBookResume({ id: _id, rating: newValue });
//               }}
//               rating={ratingValue}
//               name="rating"
//             />
//             <RatingBookWrapper
//               className={s.button}
//               id={_id}
//               resume={resume}
//               rating={ratingValue}
//             />
//           </td>
//         )}
//         {status === 'toRead' && (
//           <td>
//             <button
//               className={s.btnDelete}
//               id={_id}
//               type="button"
//               onClick={() => deleteContact(_id)}
//               disabled={isDeleting}
//             >
//               <svg width={22} height={17}>
//                 <use href={`${icons}#delete_book`}></use>
//               </svg>
//             </button>
//           </td>
//         )}
//       </tr>
//     </>
//   );
// }
// BookTableItem.propTypes = {
//   title: PropTypes.string,
//   author: PropTypes.string,
//   year: PropTypes.number,
//   pages: PropTypes.number,
//   rating: PropTypes.number,
//   status: PropTypes.string,
// };
