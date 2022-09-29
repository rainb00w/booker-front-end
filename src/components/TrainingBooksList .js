const TrainingBooksList = ({ books, onDelete }) => {
  console.log('arr', books);
  return (
    <ul>
      {books.map(({ id, title }) => (
        <li key={id}>
          <p>{title}</p>
          <button onClick={() => onDelete(id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};
export default TrainingBooksList;
