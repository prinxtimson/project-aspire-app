import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useTranslation } from "react-i18next";
import moment from "moment";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const UserTypeChart = ({ visit, period }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);

    useEffect(() => {
        if (visit) {
            let data = [];
            let len = visit.length;
            if (period > len) {
                let r = period - len;

                for (let i = 1; i <= r; i++) {
                    let d = new Date(visit[0]?.date);
                    d.setDate(d.getDate() - i);
                    data.unshift({
                        label: moment(d.toISOString()).format("ll"),
                        value: 0,
                    });
                }
            }
            visit.map((item) => {
                data.push({
                    label: moment(item.date).format("ll"),
                    value: item.visitors,
                });
            });

            setChartConfigs({
                type: "line", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("admin_page.caption_2"),
                        xAxisName: t("admin_page.x_axis"),
                        yAxisName: t("admin_page.y_axis"),
                        theme: "fusion",
                        labelStep: period > 7 ? "5" : "0",
                        // drawAnchors: "0",
                    },
                    data,
                },
            });
        }
    }, [visit]);

    return (
        <div className="card" style={{ minHeight: 400 }}>
            <div className="card-body">
                {visit && chartConfigs && <ReactFC {...chartConfigs} />}
            </div>
        </div>
    );
};

export default UserTypeChart;
