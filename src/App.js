import React, { useEffect } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import DE from "./svg/de.svg";
import FR from "./svg/fr.svg";
import GB from "./svg/gb.svg";
import SA from "./svg/sa.svg";
import Globe from "./svg/globe.svg";
import CaretDown from "./svg/caret-down-fill.svg";
import Cookies from "js-cookie";

const languages = [
  {
    lang: "en",
    lang_name: "English",
    country: <img src={GB} alt="Deutschland" width={20} />,
  },
  {
    lang: "fr",
    lang_name: "Français",
    country: <img src={FR} alt="France" width={20} />,
  },
  {
    lang: "de",
    lang_name: "Deutsch",
    country: <img src={DE} alt="Deutschland" width={20} />,
  },
  {
    lang: "ar",
    lang_name: "العربية",
    country: <img src={SA} alt="Tunisia" width={20} />,
    dir: "rtl",
  },
];

function App() {
  const defaultLang = Cookies.get("i18next") || "en";
  const currentLang = languages.find((l) => l.lang === defaultLang);
  const { t } = useTranslation();

  const releaseDate = new Date("2023-04-08");
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  useEffect(() => {
    document.body.dir = currentLang.dir || "ltr";
  }, [currentLang]);

  return (
    <div className="container py-5">
      <div className="language">
        <button className="dropdwon-btn">
          <img src={Globe} alt="Deutschland" /> {t("language")}
          <img src={CaretDown} alt="caret-down-fill" />
        </button>
        <ul className="language-menu">
          {languages.map(({ lang, lang_name, country }) => (
            <li key={country}>
              <button
                onClick={() => i18next.changeLanguage(lang)}
                style={{ opacity: lang === defaultLang ? 0.5 : 1 }}
              >
                {country} {lang_name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="font-weight-normal mb-3">{t("Welcome_to_React")}</h1>
      <h3>{t("app_title")}</h3>
      <h5>{t("welcome_message")}</h5>
      <p>{t("days_since_release", { number_of_days })}</p>
    </div>
  );
}

export default App;
