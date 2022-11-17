import { useState, useEffect } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import moment from "moment";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ProductsTrendChart = ({ products }) => {
    const [chartConfigs, setChartConfigs] = useState(null);

    useEffect(() => {
        if (products) {
            const plans = [
                { name: "Silver", id: "P-3GF26775M0553772CMFE45SA" },
                { name: "Gold", id: "P-4UW90831RJ858105VMFFXM2Q" },
                { name: "Platinum", id: "P-74180116YA6179122MFFXP4Y" },
            ];
            let dataset = PRODUCTS;
            let category = [
                { label: "January" },
                { label: "February" },
                { label: "March" },
                { label: "April" },
                { label: "May" },
                { label: "June" },
                { label: "July" },
                { label: "August" },
                { label: "September" },
                { label: "October" },
                { label: "November" },
                { label: "December" },
            ];

            // PRODUCTS.map((item) => {
            //     dataset.push({
            //         seriesname: item.label,
            //         data: category.map((cat, index) => {
            //             // let currentDate = new Date();
            //             // let d = new Date(currentDate.getFullYear(), index);
            //             // return {
            //             //     value: products.filter(
            //             //         (val) =>
            //             //             val.subscription_id === item.id &&
            //             //             moment(val.created_at).isSame(d, "month")
            //             //     ).length,
            //             // };
            //             return PRODUCTS;
            //         }),
            //     });

            setChartConfigs({
                type: "msline", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: "Products Trend",
                        xAxisName: "Products",
                        yAxisName: "No of subscribers",
                        drawcrossline: "1",
                        theme: "fusion",
                        // drawAnchors: "0",
                    },
                    categories: [
                        {
                            category,
                        },
                    ],
                    dataset,
                },
            });
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

export default ProductsTrendChart;

const PRODUCTS = [
    {
        seriesname: "Sports",
        data: [
            {
                value: 10,
            },
            {
                value: 21,
            },
            {
                value: 10,
            },
            {
                value: 12,
            },
            {
                value: 9,
            },
            {
                value: 6,
            },
            {
                value: 10,
            },
            {
                value: 5,
            },
            {
                value: 18,
            },
            {
                value: 23,
            },
            {
                value: 20,
            },
            {
                value: 10,
            },
            {
                value: 14,
            },
        ],
    },
    {
        seriesname: "Health",
        data: [
            {
                value: 13,
            },
            {
                value: 20,
            },
            {
                value: 11,
            },
            {
                value: 10,
            },
            {
                value: 6,
            },
            {
                value: 2,
            },
            {
                value: 16,
            },
            {
                value: 15,
            },
            {
                value: 28,
            },
            {
                value: 26,
            },
            {
                value: 23,
            },
            {
                value: 13,
            },
            {
                value: 10,
            },
        ],
    },
    {
        seriesname: "Entertainment",
        data: [
            {
                value: 10,
            },
            {
                value: 21,
            },
            {
                value: 10,
            },
            {
                value: 12,
            },
            {
                value: 9,
            },
            {
                value: 6,
            },
            {
                value: 10,
            },
            {
                value: 5,
            },
            {
                value: 18,
            },
            {
                value: 23,
            },
            {
                value: 20,
            },
            {
                value: 10,
            },
            {
                value: 14,
            },
        ],
    },
    {
        seriesname: "Food",
        data: [
            {
                value: 17,
            },
            {
                value: 21,
            },
            {
                value: 13,
            },
            {
                value: 12,
            },
            {
                value: 19,
            },
            {
                value: 18,
            },
            {
                value: 10,
            },
            {
                value: 27,
            },
            {
                value: 28,
            },
            {
                value: 20,
            },
            {
                value: 27,
            },
            {
                value: 16,
            },
            {
                value: 29,
            },
        ],
    },
    {
        seriesname: "Fashion",
        data: [
            {
                value: 11,
            },
            {
                value: 1,
            },
            {
                value: 18,
            },
            {
                value: 22,
            },
            {
                value: 8,
            },
            {
                value: 16,
            },
            {
                value: 12,
            },
            {
                value: 21,
            },
            {
                value: 18,
            },
            {
                value: 24,
            },
            {
                value: 22,
            },
            {
                value: 10,
            },
            {
                value: 19,
            },
        ],
    },
];
