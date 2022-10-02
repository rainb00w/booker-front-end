import styles from './login.module.css';

const loginPhrase = ({ phrase }) => {
  return (
    <>
      <p className={styles.quote}>{phrase.text}</p>
      <hr className={styles.hr} />
      <h2 className={styles.author}>{phrase.author}</h2>
    </>
  );
};

export default loginPhrase;
