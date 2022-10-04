import React, { useEffect, useState, useContext } from "react";
import Select, { components } from "react-select";
import { useTranslation } from "react-i18next";
import { getPlannedBooks } from "../../../../redux/books/booksSelectors";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedBook,
  setPlannedBooksForSelect,
  removePlannedBook,
} from "../../../../redux/target/targetActions";
import {
  getAllPlannedBooks,
  getAllSelectedBooks,
} from "../../../../redux/target/targetSelectors";

import SelectBooksStyled from "./SelectBooksStyled";
import { ThemeContext } from "../../../App";

import sprite from "../../../../images/sprite.svg";
import useWindowDimensions from "../../../../hooks/resize";

const CaretDownIcon = () => {
  return (
    <svg className="selectBooksIconPolygon">
      <use href={sprite + "#icon-polygon"} />
    </svg>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};

const SelectBooks = ({ toggleModal }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const clientsWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(clientsWidth < 768);
  }, [clientsWidth]);

  const dispatch = useDispatch();
  const preplanningSelectedBooks = useSelector(getAllSelectedBooks);
  const books = useSelector(getPlannedBooks);
  const plannedBooks = useSelector(getAllPlannedBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (!plannedBooks.length) dispatch(setPlannedBooksForSelect(books));
  }, []);

  useEffect(() => {
    if (plannedBooks !== null && preplanningSelectedBooks.length) {
      const diffBetweenBooksAndPlanned = findDiffBooks();
      const updateSelector = [...plannedBooks, ...diffBetweenBooksAndPlanned];

      dispatch(setPlannedBooksForSelect(updateSelector));
    }
  }, []);

  const findDiffBooks = () => {
    let notInThePlanned = [];
    const result = [];

    for (const book of books) {
      const res = plannedBooks.find((pbook) => pbook._id === book._id);

      if (!res) {
        notInThePlanned.push(book);
      }
    }

    for (const book of notInThePlanned) {
      const res2 = preplanningSelectedBooks.find(
        (sbook) => sbook._id === book._id
      );

      if (!res2) {
        result.push(book);
      }
    }
    return result;
  };

  const handleSelectBook = (selectedOption) => {
    const { value } = selectedOption;
    setDisable(false);
    setSelectedBook(value);
  };

  const addBookToSelected = () => {
    if (!selectedBook) return;

    const isAddedBookAlready = preplanningSelectedBooks.findIndex(
      (book) => book._id === selectedBook._id
    );
    if (isAddedBookAlready >= 0) return setDisable(true);

    dispatch(addSelectedBook(selectedBook));
    dispatch(removePlannedBook(selectedBook));
    if (isMobile) toggleModal();
  };

  const options = plannedBooks.map(({ name, author, year, pages, _id }) => ({
    value: { name, author, year, pages, _id },
    label: name,
  }));

  return (
    <SelectBooksStyled colors={theme}>
      <Select
        options={options}
        placeholder={t("Choose books from the library")}
        closeMenuOnSelect={true}
        onChange={handleSelectBook}
        components={{ DropdownIndicator }}
      />
      <button
        disabled={disable}
        className="selectBooksButton"
        onClick={addBookToSelected}
      >
        {t("Add")}
      </button>
    </SelectBooksStyled>
  );
};

export default SelectBooks;
