import React from 'react';
import PropTypes from 'prop-types';
import styles from './Section.module.css';

export default function Section({ children }) {
  return (
    <div className={styles.section}>
      {children}
    </div>
  )
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
};
