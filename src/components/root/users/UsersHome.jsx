import React, { memo, useMemo, useCallback } from "react";
import BackgroundHome from "../fragments/background/BackgroundHome";
import HomeDataService from "../../../api/hobby/HomeDataService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/UserHome.module.css";
import hobbyBtnStyles from "../../../css/SimpleButtons.module.css";
import style from "../../../css/Footer.module.css";
import Footer from "../fragments/footer/Footer";
import HobbyCard from "../../common/HobbyCard";

const UserHome = () => {
  const navigate = useNavigate();
  
  // Remove useMemo to avoid potential re-render issues
  const [authState, setAuthState] = useState({
    isUserLoggedIn: AuthenticationService.isUserLoggedIn(),
    isBusinessLoggedIn: AuthenticationService.isBusinessLoggedIn()
  });

  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false });

  const handleSort = useCallback((value) => (event) => {
    event.preventDefault();

    if (authState.isUserLoggedIn) {
      navigate(`/hobbie/${value}`, { state: { id: value } });
    } else if (authState.isBusinessLoggedIn) {
      navigate(`/offer/${value}`, { state: { id: value } });
    }
  }, [navigate, authState.isUserLoggedIn, authState.isBusinessLoggedIn]);

  useLayoutEffect(() => {
    let unmounted = false;
    setLoading(true);
    console.log('UserHome: Loading hobbies...');

    const loadData = async () => {
      try {
        const response = await HomeDataService();
        console.log('UserHome: HomeDataService response:', response);
        
        if (!unmounted) {
          const hobbies = Array.isArray(response.data) ? response.data : [];
          console.log('UserHome: Processed hobbies:', hobbies.length, hobbies);
          setState(hobbies);
          setWelcomeDiv({ showDiv: hobbies.length === 0 });
          setLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          console.error('UserHome: Error loading hobbies:', error);
          setState([]);
          setWelcomeDiv({ showDiv: true });
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      unmounted = true;
    };
  }, [authState.isBusinessLoggedIn, authState.isUserLoggedIn]);

  // Debug state changes
  React.useEffect(() => {
    console.log('UserHome state changed:', {
      hobbiesCount: state.length,
      loading,
      welcomeDiv: welcomeDiv.showDiv,
      authState
    });
  }, [state, loading, welcomeDiv, authState]);

  return (
    <>
      <BackgroundHome />
      <main className={styles.hobbie_main}>
        <section className={styles.hobbie_container_home}>
          {loading && (
            <div className={styles.loading_container}>
              <div className={styles.loading_spinner}></div>
              <p className={styles.loading_text}>Loading hobby experiences...</p>
            </div>
          )}
          
          {!loading && state.length > 0 && (
            <section className={styles.cards}>
              {state.map((hobby, index) => (
                <HobbyCard
                  key={hobby.id}
                  hobby={hobby}
                  onClick={handleSort(hobby.id)}
                  animationDelay={index * 0.1}
                />
              ))}
            </section>
          )}

          {!loading && state.length === 0 && (
            <div>
              <article className={styles.introduction_home}>
                <div className={styles.intro_text}>
                  {authState.isUserLoggedIn && (
                    <div>
                      <p className={styles.intro}>
                        Ready to discover your hobby tribe? Let's find creative professionals and experiences that match your passion!
                      </p>
                      <div className={styles.buttuns}>
                        <Link to="/test" className={hobbyBtnStyles.hobby_btn_primary}>
                          <span className={hobbyBtnStyles.btn_icon}>🎯</span>
                          <span className={hobbyBtnStyles.btn_text}>Discover Hobbies</span>
                        </Link>
                      </div>
                    </div>
                  )}
                  {authState.isBusinessLoggedIn && (
                    <div>
                      <p className={styles.intro}>Share your creative skills and connect with hobby enthusiasts in your area!</p>
                      <div className={styles.buttuns}>
                        <Link to="/create-offer" className={hobbyBtnStyles.hobby_btn_primary}>
                          <span className={hobbyBtnStyles.btn_icon}>➕</span>
                          <span className={hobbyBtnStyles.btn_text}>Create Hobby Experience</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>
          )}
        </section>
      </main>
      <Footer class={style.footer_hobbie_details} />
    </>
  );
};

export default UserHome;
