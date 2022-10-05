// import phrases from './phrases';
import { useTranslation } from 'react-i18next';
import react, { useEffect } from 'react';


const getPhrases = () => {
  const { t } = useTranslation();

 

  // let lang = localStorage.getItem('i18nextLng');
  // if (lang !== 'en' && lang !== 'ua') {
  //   lang = 'en';
  // }
  const phrases = [
    {
      author: t('phrase_author_1'),
      text: t('phrase_text_1'),
    },
    {
      author: t('phrase_author_2'),
      text: t('phrase_text_2'),
    },
    {
      author: t('phrase_author_3'),
      text: t('phrase_text_3'),
    },
  ]

 

  const index = Math.floor(Math.random() * 10);
  
   useEffect(() => {

  }, [phrases]);
  return phrases[index];
};

export default getPhrases;
