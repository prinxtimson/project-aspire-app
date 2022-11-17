import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MainContainer from "../components/MainContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
    const { t } = useTranslation(["terms-and-conditions"]);

    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.content);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <MainContainer>
            <div className="bg-white">
                <div className="container">
                    <h2 className="text-align-center">{t("title")}</h2>
                    <div className="py-2">
                        <div
                            className="py-2"
                            dangerouslySetInnerHTML={{
                                __html: data?.body,
                            }}
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default TermsAndConditions;
