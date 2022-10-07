import LoginPhrase from '../pages/login/loginPhrase';
import svgPath from 'services/svgPath';
import styles from './Quotations.module.css';

export default function Quotations() {
  return (
    <div className={styles.log__text}>
      <svg className={styles.svg__qutation}>
        <use href={svgPath.quatation + '#quatation'}></use>
      </svg>
      <LoginPhrase />
    </div>
  );
}
