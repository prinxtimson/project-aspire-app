import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import { useTranslation } from "react-i18next";

const CLIENT = {
    sandbox:
        "AQsv_UxvT2GLWAvjIx6swm3cv3gK4AhrfdTYfHngSZlIZYcn4g2ct1aowUaMcuMfTF3T1vu6gcld9dbE",
    production: "your_production_key",
};

const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;

const PaypalButton = ({
    isScriptLoaded,
    isScriptLoadSucceed,
    plan_id,
    user,
    handleSavePayment,
}) => {
    const { t } = useTranslation(["dashboard"]);
    const [state, setState] = useState({
        showButtons: false,
        loading: true,
        paid: false,
    });
    const { showButtons, loading, paid } = state;

    useEffect(() => {
        if (isScriptLoaded && isScriptLoadSucceed) {
            PayPalButton = window.paypal.Buttons.driver("react", {
                React,
                ReactDOM,
            });
            setState({ ...state, loading: false, showButtons: true });
        }
    }, [isScriptLoaded]);

    const createSubscription = (data, actions) => {
        return actions.subscription.create({
            plan_id,
            custom_id: user.id,
        });
    };

    const onApprove = (data, actions) => {
        console.log("Payment Approved: ", actions);
        console.log(data);
        handleSavePayment(data);
        setState({ ...state, showButtons: false });
    };

    return (
        <div>
            {showButtons && (
                <div>
                    <PayPalButton
                        createSubscription={createSubscription}
                        onApprove={onApprove}
                        style={{
                            shape: "pill",
                            color: "gold",
                            layout: "vertical",
                            label: "subscribe",
                        }}
                    />
                </div>
            )}
            {paid && (
                <div className="main">
                    <h2>
                        {t("paypal_btn.h2") + " "}
                        <span role="img" aria-label="emoji">
                            {" "}
                            😉
                        </span>
                    </h2>
                </div>
            )}
        </div>
    );
};

PaypalButton.propTypes = {
    isScriptLoaded: PropTypes.bool,
    isScriptLoadSucceed: PropTypes.bool,
};

export default scriptLoader(
    `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&vault=true&intent=subscription`
)(PaypalButton);
