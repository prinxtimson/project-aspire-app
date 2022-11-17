import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../components/MainContainer";
import { useParams } from "react-router-dom";
import PaypalButton from "../components/PaypalButton";
import ReactGA from "react-ga";

const Purchase = () => {
    const { plan } = useParams();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleSavePayment = (data) => {};

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
        <MainContainer>
            <div className="container p-4 bg-white">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h2 className="display-6 text-center mb-4">
                            {`${
                                plan.charAt(0).toUpperCase() + plan.slice(1)
                            } Plan`}
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc hendrerit pulvinar nisi, quis fringilla
                            leo interdum ut. Integer id turpis nisi. Phasellus
                            imperdiet magna ut purus gravida, a sodales orci
                            vehicula. Vivamus id ex sit amet nibh laoreet
                            elementum at ac magna. Donec mollis accumsan nibh.
                            Fusce sed turpis et enim vulputate condimentum.
                        </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <PaypalButton
                            plan_id={
                                plan === "basic"
                                    ? "P-3GF26775M0553772CMFE45SA"
                                    : plan === "essentials"
                                    ? "P-4UW90831RJ858105VMFFXM2Q"
                                    : "P-74180116YA6179122MFFXP4Y"
                            }
                            user={user}
                            handleSavePayment={handleSavePayment}
                        />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Purchase;
