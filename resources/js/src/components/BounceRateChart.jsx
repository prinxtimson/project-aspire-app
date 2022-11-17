import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import moment from "moment";
import { useTranslation } from "react-i18next";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const BounceRateChart = ({ bounce }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);

    useEffect(() => {
        if (bounce) {
            let data = [];

            bounce.rows.map((item) => {
                let rate = (item[2] / item[1]) * 100 || 0;
                data.push({
                    label: moment(item[0]).format("ll"),
                    value: rate,
                    tooltext: `${moment(item[0]).format("LL")}{br}{br} ${t(
                        "bounce_rate_chat.title"
                    )}: ${rate}%`,
                });
            });

            setChartConfigs({
                type: "line", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("bounce_rate_chat.title"),
                        xAxisName: t("bounce_rate_chat.x_axis"),
                        yAxisName: t("bounce_rate_chat.y_axis"),
                        yAxisPosition: "right",
                        theme: "fusion",
                        alignCaptionWithCanvas: "0",
                        drawAnchors: "0",
                        numberSuffix: "%",
                    },
                    data,
                },
            });
        }
    }, [bounce]);

    return (
        <div className="card" style={{ minHeight: 400 }}>
            <div className="card-body">
                {bounce && chartConfigs && <ReactFC {...chartConfigs} />}
            </div>
        </div>
    );
};

export default BounceRateChart;
