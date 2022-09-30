const TrainingBooksList = ({ books, onDelete }) => {
  console.log('arr', books);
  return (
    <ul>
      {books.map(({ _id, title }) => (
        <li key={_id}>
          <p>{title}</p>
          <button onClick={() => onDelete(_id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};
export default TrainingBooksList;
