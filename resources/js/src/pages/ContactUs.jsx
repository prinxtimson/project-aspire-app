import { useState, useRef, useEffect } from "react";
import ReactGA from "react-ga";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
import MainContainer from "../components/MainContainer";

const ContactUs = () => {
    const { t } = useTranslation(["contact-us"]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    const { name, email, message } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs
            .sendForm(
                process.env.MIX_SERVICE_ID,
                process.env.MIX_TEMPLATE_ID,
                e.target,
                process.env.MIX_USER_ID
            )
            .then(
                (result) => {
                    formRef.current?.reset();
                    setLoading(false);
                    toast.success(result.text);
                },
                (error) => {
                    setLoading(false);
                    setError(error.text);
                    setTimeout(() => {
                        setError(null);
                    }, 3000);
                }
            );
    };

    return (
        <MainContainer>
            <div className="bg-white">
                <div
                    className="p-5"
                    style={{ backgroundColor: "#00a7ad", height: 200 }}
                >
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <h1 className="fw-bold text-white">
                                    {t("title")}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid py-5 bg-light">
                    <div className="row align-items-center">
                        <div className="col">
                            <div
                                className="card my-5 m-auto p-2"
                                style={{ maxWidth: "440px" }}
                            >
                                <div className="card-body">
                                    <h4 className="card-title text-primary text-center">
                                        {t("sub_title")}
                                    </h4>
                                    {error && (
                                        <div
                                            className={`alert alert-danger py-2`}
                                            role="alert"
                                        >
                                            {error}
                                        </div>
                                    )}

                                    <form
                                        onSubmit={handleOnSubmit}
                                        className="form row g-3 "
                                        ref={formRef}
                                    >
                                        <div className="form-floating col-12">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                value={name}
                                                placeholder="Name"
                                                id="floatingInput"
                                                name="name"
                                                onChange={handleOnChange}
                                                required
                                            />
                                            <label htmlFor="floatingInput">
                                                {t("name")}
                                            </label>
                                        </div>
                                        <div className="form-floating col-12">
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                value={email}
                                                placeholder="Email"
                                                id="floatingInput"
                                                name="email"
                                                onChange={handleOnChange}
                                                required
                                            />
                                            <label htmlFor="floatingInput">
                                                {t("email")}
                                            </label>
                                        </div>
                                        <div className="form-floating col-12">
                                            <textarea
                                                className="form-control"
                                                id="floatingInput"
                                                value={message}
                                                style={{ height: 150 }}
                                                name="message"
                                                onChange={handleOnChange}
                                                required
                                            ></textarea>

                                            <label htmlFor="floatingInput">
                                                {t("message")}
                                            </label>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <button
                                                className={`btn btn-${
                                                    loading
                                                        ? "secondary"
                                                        : "primary"
                                                } btn-lg text-white`}
                                                type="submit"
                                                disabled={loading}
                                            >
                                                {t("btn_text")}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col d-sm-none d-md-block">
                            <div className="my-2">
                                <div className="my-2">
                                    <FaMapMarkerAlt />
                                    <p className="muted-text">
                                        Unite 1i,75 Millmarsh Lane, London. EN3
                                        7PU
                                    </p>
                                </div>
                                <div className="my-2">
                                    <FaEnvelope />
                                    <p className="muted-text">
                                        info@mytritek.co.uk
                                    </p>
                                </div>
                                <div className="my-2">
                                    <FaPhone />
                                    <p className="muted-text">
                                        +44(0)7401262066, +44(0)7737114714
                                    </p>
                                </div>
                                <div className="my-2">
                                    <FaGlobe />
                                    <p className="muted-text">
                                        www.mytritek.co.uk
                                    </p>
                                </div>
                            </div>
                            {/*
                    <img
                        style={{ width: "100%" }}
                        src="/images/contact_us.png"
                        alt="Contact us illustration"
                    />
                    */}
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default ContactUs;
