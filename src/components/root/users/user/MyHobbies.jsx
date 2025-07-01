import React from "react";
import Footer from "../../fragments/footer/Footer";
import styles from "../../../../css/UserHome.module.css";
import hobbyBtnStyles from "../../../../css/SimpleButtons.module.css";
import style from "../../../../css/Footer.module.css";
import BackgroundHome from "../../fragments/background/BackgroundHome";
import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyHobbiesDataService from "../../../../api/hobby/MyHobbiesDataService";
import RemoveHobbyService from "../../../../api/hobby/RemoveHobbyService";
import Toast from "../../../common/Toast";

const MyHobbies = () => {
  const navigate = useNavigate();

  const [state, setState] = useState([]);
  const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleSort = (value) => (event) => {
    event.preventDefault();
    let path = "/hobbie/" + value;
    navigate(path, { state: { id: value } });
  };

  const handleRemoveHobby = (hobbyId) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    RemoveHobbyService(hobbyId).then((response) => {
      setState(prevState => prevState.filter(hobby => hobby.id !== hobbyId));
      setToast({
        show: true,
        message: 'Hobby removed from your favorites! 💔',
        type: 'info'
      });
      
      if (state.length === 1) {
        setWelcomeDiv({ showDiv: true });
      }
    }).catch((error) => {
      setToast({
        show: true,
        message: 'Failed to remove hobby. Please try again.',
        type: 'error'
      });
    });
  };

  const closeToast = () => {
    setToast({ show: false, message: '', type: '' });
  };

  useLayoutEffect(() => {
    let unmounted = false;
    setLoading(true);

    MyHobbiesDataService().then((response) => {
      if (!unmounted) {
        setState(response.data);
        setWelcomeDiv({ showDiv: false });
        setLoading(false);
      }
      if (!Object.keys(response.data).length) {
        setWelcomeDiv({ showDiv: true });
        setLoading(false);
      }
    }).catch(() => {
      if (!unmounted) {
        setLoading(false);
        setWelcomeDiv({ showDiv: true });
      }
    });
    
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <>
      <Toast 
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={closeToast}
      />
      <BackgroundHome />
      <main className={styles.hobbie_main}>
        <section className={styles.hobbie_container_home}>
          <div className={styles.page_header}>
            <h1 className={styles.page_title}>My Hobby Collection</h1>
            <p className={styles.page_subtitle}>
              Your saved hobby experiences and creative connections
            </p>
          </div>

          {loading && (
            <div className={styles.loading_container}>
              <div className={styles.loading_spinner}></div>
              <p className={styles.loading_text}>Loading your hobbies...</p>
            </div>
          )}

          {!loading && state.length > 0 && (
            <section className={styles.cards}>
              {state.map((hobby, index) => (
                <div 
                  key={hobby.id} 
                  className={`${styles.rapper} fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.card_wrapper}>
                    <Link
                      to="#"
                      onClick={handleSort(hobby.id)}
                      className={styles.card}
                      id={hobby.id}
                    >
                      <section className={styles.card_image_container}>
                        <img src={hobby.profileImgUrl} alt="hobby" />
                      </section>

                      <section className={styles.card_content}>
                        <p className={styles.card_title}>{hobby.name}</p>
                        <div className={styles.card_info}>
                          <p className={styles.text_medium}>Find out more...</p>
                          <p className={styles.card_price}>{hobby.price} CHF</p>
                        </div>
                      </section>
                    </Link>
                    <button 
                      className={`${styles.remove_btn} ${hobbyBtnStyles.hobby_btn_danger}`}
                      onClick={handleRemoveHobby(hobby.id)}
                      title="Remove from favorites"
                    >
                      <span className={styles.remove_icon}>💔</span>
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}

          {!loading && (state.length === 0 || welcomeDiv.showDiv) && (
            <div className={`${styles.introduction_home} fade-in-up`}>
              <div className={styles.intro_text}>
                <div className={styles.empty_icon}>🎨</div>
                <h3>Your hobby journey starts here!</h3>
                <p>Discover artists, musicians, bakers, and creative professionals near you. Join, assist, or just enjoy!</p>
                <Link to="/test" className={hobbyBtnStyles.hobby_btn_primary}>
                  <span className={hobbyBtnStyles.btn_icon}>✨</span>
                  <span className={hobbyBtnStyles.btn_text}>Find My Hobby Tribe</span>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer class={style.footer_hobbie_details} />
    </>
  );
};

export default MyHobbies;
