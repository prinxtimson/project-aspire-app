import { useEffect, useState } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useTranslation } from "react-i18next";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const UserTypeChart = ({ userType, type }) => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);

    useEffect(() => {
        if (userType) {
            let data = [];

            userType.map((item) => {
                data.push({
                    label: item.type,
                    value: item.sessions,
                });
            });

            setChartConfigs({
                type: type, // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("admin_page.caption"),
                        theme: "fusion",
                        startingAngle: "310",
                        showLegend: "1",
                        decimals: "1",
                        valuePosition: "inside",
                        minAngleForValue: "40",
                    },
                    data,
                },
            });
        }
    }, [userType]);

    return (
        <div className="card" style={{ minHeight: 400 }}>
            <div className="card-body">
                {userType && chartConfigs && <ReactFC {...chartConfigs} />}
            </div>
        </div>
    );
};

export default UserTypeChart;
