import React, { useEffect } from 'react';
import styles from '../../css/Toast.module.css';

const Toast = ({ message, type = 'info', show, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) return null;

  const getToastClass = () => {
    switch (type) {
      case 'success':
        return styles.toast_success;
      case 'error':
        return styles.toast_error;
      case 'warning':
        return styles.toast_warning;
      case 'info':
      default:
        return styles.toast_info;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`${styles.toast_container} ${getToastClass()}`}>
      <div className={styles.toast_content}>
        <span className={styles.toast_icon}>{getIcon()}</span>
        <span className={styles.toast_message}>{message}</span>
        <button 
          className={styles.toast_close}
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
