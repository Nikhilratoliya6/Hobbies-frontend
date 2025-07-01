import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../css/PresentationNew.module.css";

const Presentation = () => {
  return (
    <section className={styles.presentation}>
      <section className={styles.introduction}>
        <article className={styles.intro_text}>
          <h1 className={styles.main_title}>
            Turn Free Time into Passion Time
          </h1>
          <h2 className={styles.subtitle}>
            Connect with artists, bakers, musicians, and more. Join, assist, or just enjoy — your hobby tribe awaits.
          </h2>
          <p className={styles.description}>
            We bring hobby lovers and hobby doers together. Whether you're a beginner, 
            an enthusiast, or a professional — our platform connects people who want to 
            share, learn, or explore hobbies during their free time.
          </p>
          <div className={styles.features}>
            <div className={styles.feature_item}>
              🎨 <span>Connect with Artists</span>
            </div>
            <div className={styles.feature_item}>
              🧁 <span>Join Baking Sessions</span>
            </div>
            <div className={styles.feature_item}>
              � <span>Music Jam Sessions</span>
            </div>
            <div className={styles.feature_item}>
              ✨ <span>Creative Workshops</span>
            </div>
          </div>
        </article>

        <article className={styles.buttons}>
          <div className={styles.button_group}>
            <Link to="/signup" className={`${styles.btn_primary} ${styles.consumer_btn}`}>
              <span className={styles.btn_text}>Explore Hobbies</span>
              <span className={styles.btn_subtext}>I want to join & learn</span>
            </Link>
            <Link to="/register-business" className={`${styles.btn_secondary} ${styles.artist_btn}`}>
              <span className={styles.btn_text}>Share Your Skills</span>
              <span className={styles.btn_subtext}>I'm a hobby professional</span>
            </Link>
          </div>
          <Link to="/login" className={styles.login_link}>
            Already part of the hobby community? Sign in
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
