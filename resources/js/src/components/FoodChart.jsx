import { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { getFood, clearFood } from "../features/food/foodSlice";
import { useTranslation } from "react-i18next";
import DashboardContainer from "./DashboardContainer";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const FoodChart = () => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);
    const [chartConfigs2, setChartConfigs2] = useState(null);
    const [chartConfigs3, setChartConfigs3] = useState(null);

    const dispatch = useDispatch();
    const { food, isLoading } = useSelector((state) => state.food);

    const handleOnChange = (e) => {
        dispatch(getFood(e.target.value));
    };

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getFood("rice"));

        return () => dispatch(clearFood());
    }, []);

    useEffect(() => {
        if (food) {
            const { totalNutrients, totalDaily, totalNutrientsKCal } = food;

            let totalNutrientsArry = [];
            let totalDailyArry = [];
            let totalNutrientsKCalArry = [];

            for (let [key, value] of Object.entries(totalNutrients)) {
                totalNutrientsArry.push({
                    label: value.label,
                    value: value.quantity,
                    tooltext: `${value.label}, ${value.quantity}${value.unit}`,
                });
            }
            for (let [key, value] of Object.entries(totalDaily)) {
                totalDailyArry.push({
                    label: value.label,
                    value: value.quantity,
                    tooltext: `${value.label}, ${value.quantity}${value.unit}`,
                });
            }
            for (let [key, value] of Object.entries(totalNutrientsKCal)) {
                totalNutrientsKCalArry.push({
                    label: value.label,
                    value: value.quantity,
                    tooltext: `${value.label}, ${value.quantity}${value.unit}`,
                });
            }

            setChartConfigs({
                type: "bar3d", // The chart type
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("food_chat.caption"),
                        theme: "fusion",
                        startingAngle: "310",
                        legendPosition: "right",
                        showLegend: "1",
                        decimals: "1",
                        valuePosition: "inside",
                        minAngleForValue: "40",
                    },
                    data: totalDailyArry,
                },
            });

            setChartConfigs2({
                type: "bar3d", // The chart type
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("food_chat.caption_1"),
                        theme: "fusion",
                        startingAngle: "310",
                        legendPosition: "right",
                        showLegend: "1",
                        decimals: "1",
                        valuePosition: "inside",
                        minAngleForValue: "40",
                    },
                    data: totalNutrientsArry,
                },
            });
        }
    }, [food]);

    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <div className="row mb-4">
                    <label htmlFor="country" className="col-sm-4">
                        {t("food_chat.food")}
                    </label>
                    <div className="col-sm-8">
                        <select
                            className="form-select"
                            aria-label="example"
                            name="food"
                            defaultValue="rice"
                            onChange={handleOnChange}
                        >
                            <option value="">
                                {t("food_chat.select_food")}
                            </option>
                            {FOODS.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-6 mb-md-0 mb-4">
                        <div className="card" style={{ minHeight: 500 }}>
                            <div className="card-body">
                                {!isLoading && chartConfigs && (
                                    <ReactFC {...chartConfigs} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-6 ">
                        <div className="card" style={{ minHeight: 500 }}>
                            <div className="card-body">
                                {!isLoading && chartConfigs2 && (
                                    <ReactFC {...chartConfigs2} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default FoodChart;

const FOODS = [
    {
        value: "rice",
        name: "Rice",
    },
    {
        value: "beans",
        name: "Beans",
    },
    {
        value: "bread",
        name: "Bread",
    },
];
