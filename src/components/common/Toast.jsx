import React from 'react';
import styles from '../../css/Toast.module.css';

const Toast = ({ message, type, show, onClose }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`${styles.toast} ${styles[type]} ${show ? styles.show : ''}`}>
      <div className={styles.toast_content}>
        <span className={styles.toast_icon}>
          {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
        </span>
        <span className={styles.toast_message}>{message}</span>
        <button className={styles.toast_close} onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Toast;
