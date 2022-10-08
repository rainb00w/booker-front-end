import styles from './login.module.css';
import { useTranslation } from 'react-i18next';

const loginPhrase = ( ) => {

  const { t } = useTranslation();
  const index = Math.floor(Math.random() * 10) + 1;
  return (
    <> 
      <p className={styles.quote}>{t(`phrase_text_${index}`)}</p>
      <hr className={styles.hr} />
      <h2 className={styles.author}>{t(`phrase_author_${index}`)}</h2> 
    </>
  );
};

export default loginPhrase;
