import React from "react";
import Footer from "../../fragments/footer/Footer";
import styles from "../../../../css/UserHome.module.css";
import hobbyBtnStyles from "../../../../css/SimpleButtons.module.css";
import style from "../../../../css/Footer.module.css";
import BackgroundHome from "../../fragments/background/BackgroundHome";
import { useState, useLayoutEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyHobbiesDataService from "../../../../api/hobby/MyHobbiesDataService";
import RemoveHobbyService from "../../../../api/hobby/RemoveHobbyService";
import Toast from "../../../common/Toast";
import SavedHobbyCard from "../../../common/SavedHobbyCard";

const MyHobbies = () => {
  const navigate = useNavigate();

  const [state, setState] = useState([]);
  const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSort = useCallback((value) => (event) => {
    event.preventDefault();
    let path = "/hobbie/" + value;
    navigate(path, { state: { id: value } });
  }, [navigate]);

  const handleRemoveHobby = useCallback((hobbyId) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    RemoveHobbyService(hobbyId).then((response) => {
      setState(prevState => {
        const newState = prevState.filter(hobby => hobby.id !== hobbyId);
        // Update welcome div based on new state length
        if (newState.length === 0) {
          setWelcomeDiv({ showDiv: true });
        }
        return newState;
      });
      setToast({
        show: true,
        message: 'Hobby removed from your favorites! 💔',
        type: 'info'
      });
    }).catch((error) => {
      setToast({
        show: true,
        message: 'Failed to remove hobby. Please try again.',
        type: 'error'
      });
    });
  }, []); // Remove state.length dependency

  const closeToast = () => {
    setToast({ show: false, message: '', type: '' });
  };

  const refreshHobbies = async () => {
    setRefreshKey(prev => prev + 1);
    try {
      await loadHobbies(true); // Force refresh from API
      setToast({
        show: true,
        message: 'Your hobbies have been refreshed! 🔄',
        type: 'success'
      });
    } catch (error) {
      // Error is already handled in loadHobbies
    }
  };

  const loadHobbies = async (forceRefresh = false) => {
    setLoading(true);
    try {
      const response = await MyHobbiesDataService(forceRefresh);
      console.log('Fetched saved hobbies response:', response);
      console.log('Response data:', response.data);
      
      // More robust data validation
      let hobbies = [];
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          hobbies = response.data;
        } else if (typeof response.data === 'object' && response.data.length !== undefined) {
          // Handle case where data might be array-like object
          hobbies = Array.from(response.data);
        }
      }
      
      console.log('Processed hobbies:', hobbies);
      setState(hobbies);
      setWelcomeDiv({ showDiv: hobbies.length === 0 });
      
    } catch (error) {
      console.error('Error fetching saved hobbies:', error);
      setState([]);
      setWelcomeDiv({ showDiv: true });
      setToast({
        show: true,
        message: 'Failed to load your saved hobbies. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    let unmounted = false;
    console.log('MyHobbies useLayoutEffect triggered, refreshKey:', refreshKey);
    
    const loadData = async () => {
      if (!unmounted) {
        console.log('Loading hobbies data...');
        await loadHobbies();
      }
    };
    
    loadData();
    
    return () => {
      console.log('MyHobbies component cleanup');
      unmounted = true;
    };
  }, [refreshKey]); // Add refreshKey as dependency

  // Add debugging for state changes
  React.useEffect(() => {
    console.log('State changed:', {
      hobbiesCount: state.length,
      loading,
      welcomeDiv: welcomeDiv.showDiv,
      hobbies: state
    });
  }, [state, loading, welcomeDiv]);
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
            <div className={styles.header_actions}>
              <button 
                onClick={refreshHobbies}
                className={hobbyBtnStyles.hobby_btn_secondary}
                disabled={loading}
              >
                <span className={hobbyBtnStyles.btn_icon}>🔄</span>
                <span className={hobbyBtnStyles.btn_text}>
                  {loading ? 'Loading...' : 'Refresh'}
                </span>
              </button>
            </div>
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
                <SavedHobbyCard
                  key={hobby.id}
                  hobby={hobby}
                  onClick={handleSort(hobby.id)}
                  onRemove={handleRemoveHobby(hobby.id)}
                  animationDelay={index * 0.1}
                />
              ))}
            </section>
          )}

          {!loading && (state.length === 0 || welcomeDiv.showDiv) && (
            <div className={`${styles.introduction_home} fade-in-up`}>
              <div className={styles.intro_text}>
                <div className={styles.empty_icon}>🎨</div>
                <h3>Your hobby journey starts here!</h3>
                <p>Discover artists, musicians, bakers, and creative professionals near you. Join, assist, or just enjoy!</p>
                <div className={styles.buttuns}>
                  <Link to="/test" className={hobbyBtnStyles.hobby_btn_primary}>
                    <span className={hobbyBtnStyles.btn_icon}>✨</span>
                    <span className={hobbyBtnStyles.btn_text}>Find My Hobby Tribe</span>
                  </Link>
                </div>
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
