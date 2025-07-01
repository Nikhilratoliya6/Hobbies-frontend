import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/UserHome.module.css';

const HobbyCard = memo(({ hobby, onClick, animationDelay = 0 }) => {
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
      data-testid={hobby.id}
      className={`${styles.rapper} fade-in-up`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
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
    </div>
  );
});

HobbyCard.displayName = 'HobbyCard';

export default HobbyCard;
