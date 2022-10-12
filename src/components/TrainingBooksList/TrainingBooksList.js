import { IconButton, Box } from '@mui/material';
import { ReactComponent as DeleteIcon } from './delete-icon.svg';
import styles from 'components/TrainingBooksList/TrainingBooksList.module.css';

const TrainingBooksList = ({ books, onDelete }) => {
  // console.log('arr', books);
  return (
    <ul className={styles.list}>
      {books.map(({ _id, title, author, year, pages }) => (
        <li key={_id} className={styles.item}>
          <Box className={styles.wrapper}>
            <p className={styles.title}>{title}</p>
            <IconButton className={styles.button} onClick={() => onDelete(_id)}>
              <DeleteIcon className={styles.icon} />
            </IconButton>
          </Box>
          <p className={styles.text}><span className={styles.caption}>Автор:</span>{author}</p>
          <p className={styles.text}><span className={styles.caption}>Рік:</span>{year}</p>
          <p className={styles.text}><span className={styles.caption}>Стор.:</span>{pages}</p>
        </li>
      ))}
    </ul>
  );
};
export default TrainingBooksList;
