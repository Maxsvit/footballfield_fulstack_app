import React from "react";
import { useTranslation } from "react-i18next";
import NavBar from "./components/NavBar/NavBar.tsx";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.header}>
          <img src="/logo.jpg" alt="App Logo" className={styles.logo} />
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.description}>{t("describe")}</p>
        </div>
        <div className={styles.langButtons}>
          <button
            className={styles.langButton}
            onClick={() => changeLanguage("en")}
          >
            {t("language.en")}
          </button>
          <button
            className={styles.langButton}
            onClick={() => changeLanguage("pl")}
          >
            {t("language.pl")}
          </button>
        </div>
        <hr className={styles.divider} />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
