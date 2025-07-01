import React from "react";
import Footer from "../../../fragments/footer/Footer";
import Background from "../../../fragments/background/Background";
import { useState } from "react";
import styles from "../../../../../css/Forms.module.css";
import style from "../../../../../css/Footer.module.css";
import UserEmailDataService from "../../../../../api/users/UserEmailDataService";
import LoadingDotsDark from "../animation/LoadingDotsDark";

const PasswordChange = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [found, setFound] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const sentClicked = async (event) => {
    event.preventDefault();
    let errors = validate(email);
    setErrors(errors);
    console.log(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      setFound(true); // Reset found state
      
      try {
        const res = await UserEmailDataService(email);
        console.log("Response status:", res.status);

        if (res.status === 200) {
          setSent(true);
          setFound(true);
          setLoading(false);
        } else {
          setLoading(false);
          setFound(false);
        }
      } catch (error) {
        console.error("Error sending password reset:", error);
        setLoading(false);
        setFound(false);
      }
    }
  };

  return (
    <>
      <main>
        <form className={styles.form_style}>
          <div className={styles.form_title}>
            <h1>Reset Your Password</h1>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
          </div>
          
          {!found && (
            <div className={styles.midErrors}>
              No JoynUp account found with this email address. Please check and try again.
            </div>
          )}

          {!sent && (
            <div className={styles.password_change_div}>
              <div className={styles.form_field}>
                <section className={styles.name_section}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                  <label
                    htmlFor="email"
                    name="email"
                    type="email"
                    className={styles.label_name}
                  >
                    {Object.keys(errors).length === 0 && (
                      <span className={styles.content_name}>Your email:</span>
                    )}
                    {errors.email && (
                      <small className={styles.errors}>{errors.email}</small>
                    )}
                  </label>
                </section>
              </div>
              {loading && <LoadingDotsDark className={styles.dots} />}

              {!loading && (
                <button type="submit" className={styles.button} onClick={sentClicked}>
                  Send Reset Link
                </button>
              )}
            </div>
          )}
          {sent && (
            <div className={styles.success_message}>
              <div className={styles.form_field}>
                <section className={styles.name_section}>
                  <span className={styles.content_name}>
                    🎉 Reset link sent! Please check your email and follow the instructions to reset your password.
                  </span>
                </section>
              </div>
            </div>
          )}
        </form>
      </main>
      <Footer class={style.footer_cover} />
      <Background />
    </>
  );
};

export default PasswordChange;
