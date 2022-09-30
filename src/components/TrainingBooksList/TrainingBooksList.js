import { Button, Box } from '@mui/material';
import { ReactComponent as DeleteIcon } from './delete-icon.svg';
import { ReactComponent as LibraryIcon } from './library-icon.svg';
import styles from 'components/TrainingBooksList/TrainingBooksList.module.css';

const TrainingBooksList = ({ books, onDelete }) => {
  console.log('arr', books);
  return (
    <ul>
      {books.map(({ _id, title }) => (
        <li key={_id} className={styles.item}>
          <Box className={styles.wrapper}>
            <p className={styles.title}>{title}</p>
            <Button sx={{
              position: 'relative',
              top: -10,
              width: 40,
              height: 40,
              padding: '10px',
              color: '#A6ABB9',
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            }} onClick={() => onDelete(_id)}>
              <DeleteIcon className={styles.icon} />
            </Button>
          </Box>
          {/* <p className={styles.text}><span className={styles.caption}>Автор:</span>{author}</p>
          <p className={styles.text}><span className={styles.caption}>Рік:</span>{year}</p>
          <p className={styles.text}><span className={styles.caption}>Стор.:</span>{pages}</p> */}
        </li>
      ))}
    </ul>
  );
};
export default TrainingBooksList;
