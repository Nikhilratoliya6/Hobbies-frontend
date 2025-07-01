import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../css/PresentationNew.module.css";

const Presentation = () => {
  return (
    <section className={styles.presentation}>
      <section className={styles.introduction}>
        <article className={styles.intro_text}>
          <h1 className={styles.main_title}>
            Connect with Creative Professionals
          </h1>
          <h2 className={styles.subtitle}>
            Arts • Entertainment • Recreation
          </h2>
          <p className={styles.description}>
            Discover talented artists, performers, and entertainers in your area. 
            Whether you're looking to hire creative professionals or showcase your 
            artistic services, our platform connects the vibrant community of arts 
            and entertainment.
          </p>
          <div className={styles.features}>
            <div className={styles.feature_item}>
              🎨 <span>Find Local Artists</span>
            </div>
            <div className={styles.feature_item}>
              🎭 <span>Book Performers</span>
            </div>
            <div className={styles.feature_item}>
              🎪 <span>Discover Events</span>
            </div>
          </div>
        </article>

        <article className={styles.buttons}>
          <div className={styles.button_group}>
            <Link to="/signup" className={`${styles.btn_primary} ${styles.consumer_btn}`}>
              <span className={styles.btn_text}>Find Services</span>
              <span className={styles.btn_subtext}>I'm looking to hire</span>
            </Link>
            <Link to="/register-business" className={`${styles.btn_secondary} ${styles.artist_btn}`}>
              <span className={styles.btn_text}>Offer Services</span>
              <span className={styles.btn_subtext}>I'm a creative professional</span>
            </Link>
          </div>
          <Link to="/login" className={styles.login_link}>
            Already have an account? Sign in
          </Link>
        </article>
      </section>
      
      <section className={styles.hero_visual}>
        <div className={styles.floating_cards}>
          <div className={styles.service_card}>
            <div className={styles.card_icon}>🎨</div>
            <h3>Visual Arts</h3>
            <p>Painters, Illustrators, Designers</p>
          </div>
          <div className={styles.service_card}>
            <div className={styles.card_icon}>🎭</div>
            <h3>Performing Arts</h3>
            <p>Musicians, Dancers, Actors</p>
          </div>
          <div className={styles.service_card}>
            <div className={styles.card_icon}>📸</div>
            <h3>Photography</h3>
            <p>Event, Portrait, Commercial</p>
          </div>
          <div className={styles.service_card}>
            <div className={styles.card_icon}>🎪</div>
            <h3>Entertainment</h3>
            <p>DJs, Entertainers, Event Hosts</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Presentation;
