import React from "react";
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

const UserHome = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();

  const [state, setState] = useState({
    hobbies: [],
  });

  const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false });

  const handleSort = (value) => (event) => {
    event.preventDefault();

    if (isUserLoggedIn) {
      navigate(`/hobbie/${value}`, { state: { id: value } });
    } else if (isBusinessLoggedIn) {
      navigate(`/offer/${value}`, { state: { id: value } });
    }
  };

  useLayoutEffect(() => {
    let unmounted = false;

    HomeDataService().then((response) => {
      if (!unmounted) {
        setState(response.data);
        setWelcomeDiv({ showDiv: false });
        console.log(response);
      }
      if (!Object.keys(response.data).length) {
        setWelcomeDiv({ showDiv: true });
      }
    });

    return () => {
      unmounted = true;
    };
  }, [isBusinessLoggedIn, isUserLoggedIn]);

  return (
    <>
      <BackgroundHome />
      <main className={styles.hobbie_main}>
        <section className={styles.hobbie_container_home}>
          {state.length !== undefined && (
            <section className={styles.cards}>
              {state.map((hobby) => (
                <div
                  data-testid={hobby.id}
                  key={hobby.id}
                  className={styles.rapper}
                >
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
                        <p className={styles.text_medium}> Find out more...</p>
                        <p className={styles.card_price}>{hobby.price} rupees</p>
                      </div>
                    </section>
                  </Link>
                </div>
              ))}
            </section>
          )}

          {welcomeDiv.showDiv && (
            <div>
              <article className={styles.introduction_home}>
                <div className={styles.intro_text}>
                  {isUserLoggedIn && (
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
                  {isBusinessLoggedIn && (
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
