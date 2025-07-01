import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/UserHome.module.css';
import hobbyBtnStyles from '../../css/SimpleButtons.module.css';

const SavedHobbyCard = memo(({ hobby, onClick, onRemove, animationDelay = 0 }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={`${styles.rapper} fade-in-up`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className={styles.card_wrapper}>
        <Link
          to="#"
          onClick={onClick}
          className={styles.card}
          id={hobby.id}
        >
          <section className={styles.card_image_container}>
            {!imageLoaded && !imageError && (
              <div className={styles.image_placeholder}>
                <div className={styles.loading_spinner_small}></div>
              </div>
            )}
            <img 
              src={imageError ? '/images/hobby-placeholder.jpg' : hobby.profileImgUrl} 
              alt={hobby.name}
              loading="lazy"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ 
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
          </section>

          <section className={styles.card_content}>
            <p className={styles.card_title}>{hobby.name}</p>
            <div className={styles.card_info}>
              <p className={styles.text_medium}>Find out more...</p>
              <p className={styles.card_price}>{hobby.price} rupees</p>
            </div>
          </section>
        </Link>
        <button 
          className={`${styles.remove_btn} ${hobbyBtnStyles.hobby_btn_danger}`}
          onClick={onRemove}
          title="Remove from favorites"
          aria-label={`Remove ${hobby.name} from favorites`}
        >
          <span className={styles.remove_icon}>💔</span>
        </button>
      </div>
    </div>
  );
});

SavedHobbyCard.displayName = 'SavedHobbyCard';

export default SavedHobbyCard;
