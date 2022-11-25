import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

const LANGUAGES = [
    {
        code: "en",
        name: "English",
        country_code: "gb",
    },
    {
        code: "fr",
        name: "Francais",
        country_code: "fr",
    },
    {
        code: "es",
        name: "España",
        country_code: "es",
    },
];

const cookies = new Cookies();

const MainFooter = ({ dark = false }) => {
    const { t } = useTranslation(["dashboard"]);
    const currentLangCode = cookies.get("i18next") || "en";
    const currentLang = LANGUAGES.find((lang) => lang.code === currentLangCode);

    useEffect(() => {
        document.body.dir = currentLang.dir || "ltr";
        document.title = t("app_title");
    }, [currentLang, t]);

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col">
                    <p className={`mb-0 ${!dark && "text-white"}`}>
                        {t("footer.copyright") + " © "}
                        <a
                            color="inherit"
                            className={`${!dark && "text-white"}`}
                            href="https://tritekconsulting.co.uk"
                        >
                            Tritek Consulting Ltd
                        </a>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </p>
                </div>
                <div className="col-2">
                    <div className="btn-group dropup">
                        <button
                            type="button"
                            className={`btn btn-link dropdown-toggle ${
                                !dark && "text-white"
                            }`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <FaGlobe size={25} style={{ display: "inline" }} />{" "}
                            <span className="mx-2">{currentLang.name}</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <span className="dropdown-item-text ">
                                    {t("language")}
                                </span>
                            </li>
                            {LANGUAGES.map(({ code, name, country_code }) => (
                                <li key={code}>
                                    <button
                                        className="dropdown-item"
                                        onClick={() =>
                                            i18next.changeLanguage(code)
                                        }
                                    >
                                        <span
                                            className={`flag-icon flag-icon-${country_code} mx-2`}
                                        ></span>
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${!dark && "text-white"}`}
                                //to="/terms-and-conditions"
                                to="#"
                            >
                                {t("footer.terms_and_conditions", {
                                    sign: "&",
                                })}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${!dark && "text-white"}`}
                                //to="/privacy-policy"
                                to="#"
                            >
                                {t("footer.privacy_policy")}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col me-4">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${!dark && "text-white"}`}
                                href="https://www.facebook.com/"
                                target="_blank"
                            >
                                <i
                                    className="fab fa-facebook-square"
                                    style={{ fontSize: 25 }}
                                ></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${!dark && "text-white"}`}
                                href="https://twitter.com/"
                                target="_blank"
                            >
                                <i
                                    className="fab fa-twitter"
                                    style={{ fontSize: 25 }}
                                ></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${!dark && "text-white"}`}
                                href="https://www.instagram.com/"
                                target="_blank"
                            >
                                <i
                                    className="fab fa-instagram"
                                    style={{ fontSize: 25 }}
                                ></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${!dark && "text-white"}`}
                                href="https://www.linkedin.com/"
                                target="_blank"
                            >
                                <i
                                    className="fab fa-linkedin"
                                    style={{ fontSize: 25 }}
                                ></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainFooter;
