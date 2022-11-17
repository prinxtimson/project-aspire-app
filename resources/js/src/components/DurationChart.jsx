import { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import moment from "moment";
import { useTranslation } from "react-i18next";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const DurationChart = ({ duration }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);

    useEffect(() => {
        if (duration?.rows.length > 0) {
            let data = [];

            duration.rows.map((item) => {
                let d = moment.duration(item[2], "seconds");
                data.push({
                    label: moment(item[0]).format("ll"),
                    value: `${d.minutes()}m ${d.seconds()}s`,
                    tooltext: `${moment(item[0]).format("LL")}{br}{br} ${t(
                        "duration_chat.title"
                    )}: ${d.minutes()}m ${d.seconds()}s`,
                });
            });

            setChartConfigs({
                type: "line", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("duration_chat.caption"),
                        xAxisName: t("duration_chat.x_axis"),
                        yAxisName: t("duration_chat.y_axis"),
                        yAxisPosition: "right",
                        theme: "fusion",
                        alignCaptionWithCanvas: "0",
                        drawAnchors: "0",
                        numberSuffix: "min",
                    },
                    data,
                },
            });
        }
    }, [duration]);

    return (
        <div className="card" style={{ minHeight: 400 }}>
            <div className="card-body">
                {duration && chartConfigs && <ReactFC {...chartConfigs} />}
            </div>
        </div>
    );
};

export default DurationChart;
