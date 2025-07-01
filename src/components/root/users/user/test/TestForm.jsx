import React from "react";
import Footer from "../../../fragments/footer/Footer";
import TestResultsService from "../../../../../api/test/TestResultsService";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../../../css/Test.module.css";
import style from "../../../../../css/Footer.module.css";
import layout from "../../../../../css/UserHome.module.css";
import BackgroundHome from "../../../fragments/background/BackgroundHome";

const TestForm = () => {
  let key = 1;
  let username = AuthenticationService.getLoggedInUser();
  let [loading, setLoading] = useState(true);

  const questions = [
    {
      questionText: "What type of hobby experience are you looking for?",
      value: "categoryOne",
      answerOptions: [
        { answerText: "Fun & Entertainment", category: "FUN" },
        { answerText: "Learning & Growth", category: "INTELLECTUAL" },
        { answerText: "Active & Physical", category: "ACTIVE" },
        { answerText: "Creative & Artistic", category: "CREATIVE" },
      ],
    },
    {
      questionText: "Do you enjoy learning with others?",
      value: "categoryTwo",
      answerOptions: [
        { answerText: "Yes, I love group activities", category: "SOCIAL" },
        { answerText: "I prefer one-on-one learning", category: "OTHER" },
        { answerText: "Sometimes, depends on the hobby", category: "SOCIAL" },
        { answerText: "I like to learn solo first", category: "OTHER" },
      ],
    },
    {
      questionText: "How active do you like to be in your free time?",
      value: "categoryThree",
      answerOptions: [
        { answerText: "Very active - I love movement", category: "ACTIVE" },
        { answerText: "Prefer relaxed activities", category: "OTHER" },
        { answerText: "Mix of both active and calm", category: "ACTIVE" },
        { answerText: "Depends on my mood", category: "OTHER" },
      ],
    },
    {
      questionText: "What sounds most appealing for your weekend?",
      value: "categoryFour",
      answerOptions: [
        { answerText: "Learning a new skill online", category: "INTELLECTUAL" },
        { answerText: "Relaxing creative activities", category: "RELAX" },
        { answerText: "Outdoor adventures", category: "ACTIVE" },
        { answerText: "Trying something completely new", category: "OTHER" },
      ],
    },
    {
      questionText: "What type of environment energizes you?",
      value: "categoryFive",
      answerOptions: [
        { answerText: "Mountains & nature", category: "ACTIVE" },
        { answerText: "Cozy studios & cafes", category: "RELAX" },
        { answerText: "Comfortable home space", category: "RELAX" },
        { answerText: "Bustling creative spaces", category: "OTHER" },
      ],
    },
    {
      questionText: "What would you most like to hear someone say about you?",
      value: "categorySix",
      answerOptions: [
        { answerText: "You're so creative and inspiring", category: "CREATIVE" },
        { answerText: "You're really active and energetic", category: "ACTIVE" },
        { answerText: "You're thoughtful and smart", category: "INTELLECTUAL" },
        { answerText: "You're fun to be around", category: "SOCIAL" },
      ],
    },
    {
      questionText: "How much time can you commit to a new hobby?",
      value: "categorySeven",
      answerOptions: [
        { answerText: "I'm all in - regular commitment", category: "OTHER" },
        { answerText: "Weekends and evenings", category: "OTHER" },
        {
          answerText: "Occasional sessions when I have time",
          category: "OTHER",
        },
        { answerText: "Just want to try once or twice", category: "OTHER" },
      ],
    },
    {
      questionText: "Your location?",
      value: "location",
      answerOptions: [
        { answerText: "Zurich", category: "ZURICH" },
        { answerText: "Bern", category: "BERN" },
        { answerText: "Luzern", category: "LUZERN" },
        { answerText: "Zug", category: "ZUG" },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [test, setTest] = useState({
    username: username,
  });

  const handleAnswerOptionClick = (answer) => {
    console.log(questions[currentQuestion].value);
    console.log(answer);

    setTest((test) => ({
      ...test,
      [questions[currentQuestion].value]: answer,
    }));

    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    if (nextQuestion === questions.length) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const check_uploaded = () => {
      if (!loading) {
        TestResultsService(test);
      }
    };
    check_uploaded();
  }, [loading, test]);

  return (
    <>
      <main className={layout.hobbie_main}>
        {currentQuestion === questions.length && (
          <div className={styles.test_form_end}>
            <section className={styles.test_end}>
              🎉 Amazing! Your hobby personality is ready! <br></br>
              Discover hobby professionals and experiences matched just for you!{" "}
              <br></br>
              <button type="submit" className={styles.button}>
                <Link to="/user-home" className={styles.link_home}>
                  Find My Hobby Matches
                </Link>
              </button>
            </section>
          </div>
        )}

        {currentQuestion !== questions.length && (
          <div className={styles.test_form}>
            <section className={styles.question_section}>
              {currentQuestion !== questions.length && (
                <div className={styles.question_count}>
                  <span>Question {currentQuestion + 1}</span>
                </div>
              )}

              {currentQuestion !== questions.length && (
                <div className={styles.question_text}>
                  {questions[currentQuestion].questionText}
                </div>
              )}
            </section>
            <section className={styles.answer_section}>
              {currentQuestion !== questions.length &&
                questions[currentQuestion].answerOptions.map((answerOption) => (
                  <button
                    key={key++}
                    className={styles.test_button}
                    onClick={() =>
                      handleAnswerOptionClick(answerOption.category)
                    }
                  >
                    {answerOption.answerText}
                  </button>
                ))}
            </section>
          </div>
        )}
      </main>
      <Footer class={style.footer_hobbie_details} />
      <BackgroundHome />
    </>
  );
};

export default TestForm;
