import React from 'react';
import BookAddForm from '../../components/bookAdd/bookAddForm';
import BookTable from '../../components/bookTable/bookTable';
import BookTableMobile from 'components/bookTable/bookMobileTable';
import BtnMyTraining from 'components/BtnLibrary/btnMyTraining';
// import RatingBook from 'components/RatingBook';
import { useMediaQuery } from 'react-responsive';
import s from './library.module.css';
import { useGetAllBooksQuery } from 'redux/books/booksApi';
import Info from '../../components/EmptyLibrary/EmptyLibrary';

const Library = () => {
  const mobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { data } = useGetAllBooksQuery();
  return (
    <>
      {!data?.payload.books.length > 0 ? (
        <div className={s.section}>
          <BookAddForm />
          <Info />
        </div>
      ) : (
        <div className={s.section}>
          <BookAddForm />
          {mobile ? <BookTableMobile /> : <BookTable />}
          <BtnMyTraining />
        </div>
      )}
    </>
  );
};

export default Library;





dispatch(authOperations.register({ name, email, password }))
.then(answer => {
const { data, response } = answer.payload

if (data) {
    resetForm({ values: "" });
    setErrName("");
    setErrEmail("");
    navigate('/login');
}
else if (response) {
    throw response.data.message;
}
})
.catch(error => {
switch (error) {
    case "name":
        setErrName("User with this name is already registered");
        setErrEmail("");
        return 
    case "email":
        setErrName("");
        setErrEmail("User with this email is already registered");
        return
    case "name&email":
        setErrName("User with this name is already registered");
        setErrEmail("User with this email is already registered");
        return 
    default:
        return
}
})

