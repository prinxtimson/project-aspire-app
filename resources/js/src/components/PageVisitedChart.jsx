import { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useTranslation } from "react-i18next";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const PageVisitedChart = ({ page }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);

    useEffect(() => {
        if (page) {
            let data = [];

            page.map((item) => {
                data.push({
                    label: item.url,
                    value: item.pageViews,
                });
            });

            setChartConfigs({
                type: "bar2d", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("page_visit_chat.caption"),
                        //xAxisName: "URL",
                        yAxisName: t("page_visit_chat.y_axis"),
                        theme: "fusion",
                        alignCaptionWithCanvas: "0",
                        // drawAnchors: "0",
                    },
                    data,
                },
            });
        }
    }, [page]);

    return (
        <div className="card" style={{ minHeight: 400 }}>
            <div className="card-body">
                {page && chartConfigs && <ReactFC {...chartConfigs} />}
            </div>
        </div>
    );
};

export default PageVisitedChart;
