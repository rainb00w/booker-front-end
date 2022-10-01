import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
const changeLanguage = (language) => {
  i18n.changeLanguage(language)
}



<button onClick={()=> changeLanguage("en")}>EN</button>
<button onClick={()=> changeLanguage("ua")}>UA</button>
