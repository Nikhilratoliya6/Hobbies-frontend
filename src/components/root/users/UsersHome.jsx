import React, { useCallback } from "react";
import BackgroundHome from "../fragments/background/BackgroundHome";
import HomeDataService from "../../../api/hobby/HomeDataService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/UserHome.module.css";
import hobbyBtnStyles from "../../../css/SimpleButtons.module.css";
import style from "../../../css/Footer.module.css";
import Footer from "../fragments/footer/Footer";
import HobbyCard from "../../common/HobbyCard";

const UserHome = () => {
  const navigate = useNavigate();
  
  // Simplify state management
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authState, setAuthState] = useState({
    isUserLoggedIn: false,
    isBusinessLoggedIn: false
  });

  // Update authentication state in useEffect to ensure proper reactivity
  useEffect(() => {
    const updateAuthState = () => {
      const newAuthState = {
        isUserLoggedIn: AuthenticationService.isUserLoggedIn(),
        isBusinessLoggedIn: AuthenticationService.isBusinessLoggedIn()
      };
      setAuthState(newAuthState);
    };
    
    updateAuthState();
    
    // Listen for storage changes to update auth state
    const handleStorageChange = (e) => {
      if (e.key === 'authenticatedUser' || e.key === 'role') {
        updateAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSort = useCallback((value) => (event) => {
    event.preventDefault();

    if (authState.isUserLoggedIn) {
      navigate(`/hobbie/${value}`, { state: { id: value } });
    } else if (authState.isBusinessLoggedIn) {
      navigate(`/offer/${value}`, { state: { id: value } });
    }
  }, [navigate, authState.isUserLoggedIn, authState.isBusinessLoggedIn]);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      // Only load data if user is authenticated
      if (!authState.isUserLoggedIn && !authState.isBusinessLoggedIn) {
        setLoading(false);
        setState([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await HomeDataService();
        
        if (mounted && response && response.data) {
          const hobbies = Array.isArray(response.data) ? response.data : [];
          console.log('✅ Setting hobbies:', hobbies.length, hobbies);
          setState(hobbies);
        } else if (mounted) {
          console.log('⚠️ No data in response, keeping existing state');
        }
      } catch (error) {
        if (mounted) {
          console.error('❌ UserHome: Error loading hobbies:', error);
          setError(error.message || 'Failed to load hobbies');
          // Don't clear existing data if we have it and auth is still valid
          if (!state.length || !authState.isUserLoggedIn) {
            setState([]);
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [authState.isUserLoggedIn, authState.isBusinessLoggedIn]); // Reload when auth state changes

  // Track all state changes
  useEffect(() => {
    console.log('🔄 UserHome State Change:', {
      timestamp: new Date().toISOString(),
      auth: { user: authState.isUserLoggedIn, business: authState.isBusinessLoggedIn },
      loading,
      dataCount: state.length,
      error: !!error
    });
  }, [authState, loading, state, error]);

  return (
    <>
      <BackgroundHome />
      <main className={styles.hobbie_main}>
        <section className={styles.hobbie_container_home}>
          {/* Temporary debug info to identify the issue */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#e6f3ff', 
              margin: '10px', 
              fontSize: '12px',
              border: '1px solid #0066cc',
              position: 'sticky',
              top: '10px',
              zIndex: 1000
            }}>
              🔍 DEBUG: Auth({authState.isUserLoggedIn ? 'USER' : authState.isBusinessLoggedIn ? 'BIZ' : 'NONE'}) | 
              Loading: {loading ? 'YES' : 'NO'} | 
              Data: {state.length} items | 
              Error: {error ? 'YES' : 'NO'} |
              Time: {new Date().toLocaleTimeString()}
            </div>
          )}
          
          {error && (
            <div className={styles.error_message}>
              <p>Error: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className={hobbyBtnStyles.hobby_btn_secondary}
              >
                Reload Page
              </button>
            </div>
          )}
          
          {loading && !error && (
            <div className={styles.loading_container}>
              <div className={styles.loading_spinner}></div>
              <p className={styles.loading_text}>Loading hobby experiences...</p>
            </div>
          )}
          
          {state.length > 0 && !error && (
            <section className={styles.cards} style={{ border: '2px solid green', padding: '10px' }}>
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

          {!loading && !error && state.length === 0 && (authState.isUserLoggedIn || authState.isBusinessLoggedIn) && (
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
