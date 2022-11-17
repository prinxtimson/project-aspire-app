import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import ReactGA from "react-ga";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    getVideo,
    clearEntertainment,
} from "../features/entertainment/entertainmentSlice";
import DashboardContainer from "./DashboardContainer";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const EntertainmentChart = () => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);
    const [chartConfigs2, setChartConfigs2] = useState(null);
    const [chartConfigs3, setChartConfigs3] = useState(null);
    const [chartConfigs4, setChartConfigs4] = useState(null);

    const dispatch = useDispatch();
    const { video, isLoading } = useSelector((state) => state.entertainment);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getVideo());

        return () => dispatch(clearEntertainment());
    }, []);

    useEffect(() => {
        if (video) {
            let diggCountData = [];
            let shareCountData = [];
            let commentCountData = [];
            let playCountData = [];

            video.data.list?.map(({ statistics, author, music }) => {
                diggCountData.push({
                    label: author.nickname,
                    value: statistics.digg_count,
                    tooltext: `${t("entertainment_chat.music")}:{br} ${t(
                        "entertainment_chat.title_text"
                    )}: ${music.title}{br} Author: ${music.author}`,
                });
                shareCountData.push({
                    label: author.nickname,
                    value: statistics.share_count,
                    tooltext: `${t("entertainment_chat.music")}:{br} ${t(
                        "entertainment_chat.title_text"
                    )}: ${music.title}{br} Author: ${music.author}`,
                });
                commentCountData.push({
                    label: author.nickname,
                    value: statistics.comment_count,
                    tooltext: `${t("entertainment_chat.music")}:{br} ${t(
                        "entertainment_chat.title_text"
                    )}: ${music.title}{br} Author: ${music.author}`,
                });
                playCountData.push({
                    label: author.nickname,
                    value: statistics.play_count,
                    tooltext: `${t("entertainment_chat.music")}:{br} ${t(
                        "entertainment_chat.title_text"
                    )}: ${music.title}{br} Author: ${music.author}`,
                });
            });

            setChartConfigs({
                type: "column3d",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("entertainment_chat.caption"),
                        xAxisName: t("entertainment_chat.x_axis"),
                        yAxisName: t("entertainment_chat.y_axis"),
                        //numberSuffix: "M",
                        theme: "fusion",
                    },
                    data: diggCountData,
                },
            });

            setChartConfigs2({
                type: "column3d",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("entertainment_chat.caption_1"),
                        xAxisName: t("entertainment_chat.x_axis"),
                        yAxisName: t("entertainment_chat.y_axis"),
                        //numberSuffix: "M",
                        theme: "fusion",
                    },
                    data: shareCountData,
                },
            });

            setChartConfigs3({
                type: "column3d",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("entertainment_chat.caption_2"),
                        xAxisName: t("entertainment_chat.x_axis"),
                        yAxisName: t("entertainment_chat.y_axis"),
                        //numberSuffix: "M",
                        theme: "fusion",
                    },
                    data: commentCountData,
                },
            });

            setChartConfigs4({
                type: "column3d",
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("entertainment_chat.caption_3"),
                        xAxisName: t("entertainment_chat.x_axis"),
                        yAxisName: t("entertainment_chat.y_axis"),
                        //numberSuffix: "M",
                        theme: "fusion",
                    },
                    data: playCountData,
                },
            });
        }
    }, [video]);

    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <div className="p-2">
                    <h5>{t("entertainment_chat.title", { name: "Tictok" })}</h5>
                </div>
                <div className="row mb-4">
                    <div className="col col-md-6">
                        <div className="card" style={{ minHeight: 400 }}>
                            <div className="card-body">
                                {!isLoading && chartConfigs && (
                                    <ReactFC {...chartConfigs} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-6 mb-md-0 mb-4">
                        <div className="card" style={{ minHeight: 400 }}>
                            <div className="card-body">
                                {!isLoading && chartConfigs2 && (
                                    <ReactFC {...chartConfigs2} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-6">
                        <div className="card" style={{ minHeight: 400 }}>
                            <div className="card-body">
                                {!isLoading && chartConfigs3 && (
                                    <ReactFC {...chartConfigs3} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-6 mb-md-0 mb-4">
                        <div className="card" style={{ minHeight: 400 }}>
                            <div className="card-body">
                                {!isLoading && chartConfigs4 && (
                                    <ReactFC {...chartConfigs4} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default EntertainmentChart;
