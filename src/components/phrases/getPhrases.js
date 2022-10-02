import phrases from './phrases';

const getPhrases = () => {
  let lang = localStorage.getItem('i18nextLng');
  if (lang !== 'en' && lang !== 'ua') {
    lang = 'en';
  }
  const index = Math.floor(Math.random() * 10);
  return phrases[lang][index];
};

export default getPhrases;
