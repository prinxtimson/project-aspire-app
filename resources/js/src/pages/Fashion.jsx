import { useEffect } from "react";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DashboardContainer from "../components/DashboardContainer";
import FashionCategoryChart from "../components/FashionCategoryChart";
import FashionGenderChart from "../components/FashionGenderChart";
import FashionSeasonChart from "../components/FashionSeasionChart";
import {
    getCategory,
    getGender,
    getSeason,
} from "../features/fashion/fashionSlice";

const Fashion = () => {
    const { t } = useTranslation(["dashboard"]);
    const dispatch = useDispatch();
    const { gender, season, category, isLoading } = useSelector(
        (state) => state.fashion
    );

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getGender());
        dispatch(getSeason());
        dispatch(getCategory());
    }, []);

    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col col-md-6 mb-4">
                        <FashionGenderChart gender={gender} />
                    </div>
                    <div className="col col-md-6 mb-4">
                        <FashionSeasonChart season={season} />
                    </div>
                    <div className="col col-md-6 ">
                        <FashionCategoryChart category={category} />
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default Fashion;
