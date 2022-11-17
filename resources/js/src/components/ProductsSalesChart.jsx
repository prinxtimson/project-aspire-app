import { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useTranslation } from "react-i18next";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ProductsSalesChart = ({ products }) => {
    const [chartConfigs, setChartConfigs] = useState(null);

    useEffect(() => {
        if (products) {
            const plans = [
                { name: "Silver", id: "P-3GF26775M0553772CMFE45SA" },
                { name: "Gold", id: "P-4UW90831RJ858105VMFFXM2Q" },
                { name: "Platinum", id: "P-74180116YA6179122MFFXP4Y" },
            ];
            let data = PRODUCTS;
            setChartConfigs({
                type: "column2d", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: "Products Sales",
                        xAxisName: "Products",
                        yAxisName: "No of subscribers",
                        theme: "fusion",
                        // drawAnchors: "0",
                    },
                    data,
                },
            });
            // plans.map((item) => {
            //     data.push({
            //         label: item.name,
            //         value: products.filter(
            //             (val) => val.subscription_id === item.id
            //         ).length,
            //     });

            //     setChartConfigs({
            //         type: "column2d", // The chart type
            //         width: "100%", // Width of the chart
            //         height: "100%", // Height of the chart
            //         dataFormat: "json", // Data type
            //         dataSource: {
            //             chart: {
            //                 caption: "Products Sales",
            //                 xAxisName: "Products",
            //                 yAxisName: "No of subscribers",
            //                 theme: "fusion",
            //                 // drawAnchors: "0",
            //             },
            //             data,
            //         },
            //     });
            // });
        }
    }, [products]);

    return (
        <div className="card" style={{ minHeight: 400 }}>
            <div className="card-body">
                {products && chartConfigs && <ReactFC {...chartConfigs} />}
            </div>
        </div>
    );
};

export default ProductsSalesChart;

const PRODUCTS = [
    { label: "Sports", value: 10 },
    { label: "Health", value: 30 },
    { label: "Entertainment", value: 20 },
    { label: "Food", value: 5 },
    { label: "Fashion", value: 30 },
];
