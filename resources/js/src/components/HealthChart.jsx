import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useTranslation } from "react-i18next";
import {
    clearHealth,
    getHealthByCountry,
    getHealthWorld,
    getHistory,
} from "../features/health/healthSlice";
import moment from "moment";
import DashboardContainer from "./DashboardContainer";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const HealthChart = () => {
    const { t } = useTranslation(["dashboard"]);
    const [chartConfigs, setChartConfigs] = useState(null);
    const [chartConfigs2, setChartConfigs2] = useState(null);
    const [chartConfigs3, setChartConfigs3] = useState(null);

    const dispatch = useDispatch();
    const {
        history,
        world,
        country: bycountry,
        isLoading,
    } = useSelector((state) => state.health);

    const handleOnChange = (e) => {
        dispatch(getHealthByCountry(e.target.value));
    };

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getHistory());
        dispatch(getHealthWorld());
        dispatch(getHealthByCountry("GB"));

        return () => dispatch(clearHealth());
    }, []);

    useEffect(() => {
        if (history) {
            const { cases, deaths, recovered } = history;

            let labels = [];
            let casesData = [];
            let deathsData = [];
            let recoveredData = [];

            for (let [key, value] of Object.entries(cases)) {
                labels.push({ label: moment(key).format("ll") });
                casesData.push({
                    value: value / 1000000,
                });
            }
            for (let [key, value] of Object.entries(deaths)) {
                //labels.push(key)
                deathsData.push({ value: value / 1000000 });
            }
            for (let [key, value] of Object.entries(recovered)) {
                //labels.push(key)
                recoveredData.push({ value: value / 1000000 });
            }

            setChartConfigs({
                type: "msline", // The chart type
                width: "100%", // Width of the chart
                height: "100%", // Height of the chart
                dataFormat: "json", // Data type
                dataSource: {
                    chart: {
                        caption: t("health_chat.caption"),
                        xAxisName: t("health_chat.x_axis"),
                        yAxisName: t("health_chat.y_axis"),
                        numberSuffix: "M",
                        theme: "fusion",
                        labelDisplay: "rotate",
                        labelStep: "50",
                        drawAnchors: "0",
                    },
                    categories: [
                        {
                            category: labels,
                        },
                    ],
                    dataset: [
                        {
                            renderAs: "line",
                            seriesname: t("health_chat.cases"),
                            data: casesData,
                        },
                        {
                            renderAs: "line",
                            seriesname: t("health_chat.recovered"),
                            data: recoveredData,
                        },
                        {
                            renderAs: "line",
                            seriesname: t("health_chat.deaths"),
                            data: deathsData,
                        },
                    ],
                },
            });
        }
    }, [history]);

    useEffect(() => {
        if (world) {
            const { cases, deaths, recovered } = world;

            setChartConfigs2({
                type: "doughnut3d", // The chart type
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("health_chat.caption_1"),
                        theme: "fusion",
                        startingAngle: "310",
                        showLegend: "1",
                        decimals: "1",
                        valuePosition: "inside",
                        minAngleForValue: "75",
                    },
                    data: [
                        {
                            label: t("health_chat.caption"),
                            value: `${cases}`,
                        },
                        {
                            label: t("health_chat.caption"),
                            value: `${recovered}`,
                        },
                        {
                            label: t("health_chat.caption"),
                            value: `${deaths}`,
                        },
                    ],
                },
            });
        }
    }, [world]);

    useEffect(() => {
        if (bycountry) {
            const { cases, deaths, recovered, country } = bycountry;

            setChartConfigs3({
                type: "doughnut3d", // The chart type
                width: "100%",
                height: "100%",
                dataFormat: "json",
                dataSource: {
                    chart: {
                        caption: t("health_chat.caption_2", { country }),
                        theme: "fusion",
                        startingAngle: "310",
                        showLegend: "1",
                        decimals: "1",
                        valuePosition: "inside",
                        minAngleForValue: "75",
                    },
                    data: [
                        {
                            label: t("health_chat.caption"),
                            value: `${cases}`,
                        },
                        {
                            label: t("health_chat.caption"),
                            value: `${recovered}`,
                        },
                        {
                            label: t("health_chat.caption"),
                            value: `${deaths}`,
                        },
                    ],
                },
            });
        }
    }, [bycountry]);

    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <div className="row">
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

                <div className="row align-items-center justify-content-center">
                    <div className="col col-md-6 mt-4">
                        <div className="card" style={{ minHeight: 400 }}>
                            <div className="card-body">
                                <div className="row">
                                    <label
                                        htmlFor="country"
                                        className="col-sm-4"
                                    >
                                        {t("health_chat.country")}
                                    </label>
                                    <div className="col-sm-8">
                                        <select
                                            className="form-select"
                                            aria-label="example"
                                            name="country"
                                            defaultValue="GB"
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option value="">
                                                {t(
                                                    "health_chat.select_country"
                                                )}
                                            </option>
                                            {COUNTRIES.map((item) => (
                                                <option
                                                    key={item.code}
                                                    value={item.code}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {!isLoading && chartConfigs3 && (
                                    <ReactFC {...chartConfigs3} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default HealthChart;

const COUNTRIES = [
    {
        name: "Afghanistan",
        code: "AF",
    },
    {
        name: "Åland Islands",
        code: "AX",
    },
    {
        name: "Albania",
        code: "AL",
    },
    {
        name: "Algeria",
        code: "DZ",
    },
    {
        name: "American Samoa",
        code: "AS",
    },
    {
        name: "AndorrA",
        code: "AD",
    },
    {
        name: "Angola",
        code: "AO",
    },
    {
        name: "Anguilla",
        code: "AI",
    },
    {
        name: "Antarctica",
        code: "AQ",
    },
    {
        name: "Antigua and Barbuda",
        code: "AG",
    },
    {
        name: "Argentina",
        code: "AR",
    },
    {
        name: "Armenia",
        code: "AM",
    },
    {
        name: "Aruba",
        code: "AW",
    },
    {
        name: "Australia",
        code: "AU",
    },
    {
        name: "Austria",
        code: "AT",
    },
    {
        name: "Azerbaijan",
        code: "AZ",
    },
    {
        name: "Bahamas",
        code: "BS",
    },
    {
        name: "Bahrain",
        code: "BH",
    },
    {
        name: "Bangladesh",
        code: "BD",
    },
    {
        name: "Barbados",
        code: "BB",
    },
    {
        name: "Belarus",
        code: "BY",
    },
    {
        name: "Belgium",
        code: "BE",
    },
    {
        name: "Belize",
        code: "BZ",
    },
    {
        name: "Benin",
        code: "BJ",
    },
    {
        name: "Bermuda",
        code: "BM",
    },
    {
        name: "Bhutan",
        code: "BT",
    },
    {
        name: "Bolivia",
        code: "BO",
    },
    {
        name: "Bosnia and Herzegovina",
        code: "BA",
    },
    {
        name: "Botswana",
        code: "BW",
    },
    {
        name: "Bouvet Island",
        code: "BV",
    },
    {
        name: "Brazil",
        code: "BR",
    },
    {
        name: "British Indian Ocean Territory",
        code: "IO",
    },
    {
        name: "Brunei Darussalam",
        code: "BN",
    },
    {
        name: "Bulgaria",
        code: "BG",
    },
    {
        name: "Burkina Faso",
        code: "BF",
    },
    {
        name: "Burundi",
        code: "BI",
    },
    {
        name: "Cambodia",
        code: "KH",
    },
    {
        name: "Cameroon",
        code: "CM",
    },
    {
        name: "Canada",
        code: "CA",
    },
    {
        name: "Cape Verde",
        code: "CV",
    },
    {
        name: "Cayman Islands",
        code: "KY",
    },
    {
        name: "Central African Republic",
        code: "CF",
    },
    {
        name: "Chad",
        code: "TD",
    },
    {
        name: "Chile",
        code: "CL",
    },
    {
        name: "China",
        code: "CN",
    },
    {
        name: "Christmas Island",
        code: "CX",
    },
    {
        name: "Cocos (Keeling) Islands",
        code: "CC",
    },
    {
        name: "Colombia",
        code: "CO",
    },
    {
        name: "Comoros",
        code: "KM",
    },
    {
        name: "Congo",
        code: "CG",
    },
    {
        name: "Congo, The Democratic Republic of the",
        code: "CD",
    },
    {
        name: "Cook Islands",
        code: "CK",
    },
    {
        name: "Costa Rica",
        code: "CR",
    },
    {
        name: 'Cote D"Ivoire',
        code: "CI",
    },
    {
        name: "Croatia",
        code: "HR",
    },
    {
        name: "Cuba",
        code: "CU",
    },
    {
        name: "Cyprus",
        code: "CY",
    },
    {
        name: "Czech Republic",
        code: "CZ",
    },
    {
        name: "Denmark",
        code: "DK",
    },
    {
        name: "Djibouti",
        code: "DJ",
    },
    {
        name: "Dominica",
        code: "DM",
    },
    {
        name: "Dominican Republic",
        code: "DO",
    },
    {
        name: "Ecuador",
        code: "EC",
    },
    {
        name: "Egypt",
        code: "EG",
    },
    {
        name: "El Salvador",
        code: "SV",
    },
    {
        name: "Equatorial Guinea",
        code: "GQ",
    },
    {
        name: "Eritrea",
        code: "ER",
    },
    {
        name: "Estonia",
        code: "EE",
    },
    {
        name: "Ethiopia",
        code: "ET",
    },
    {
        name: "Falkland Islands (Malvinas)",
        code: "FK",
    },
    {
        name: "Faroe Islands",
        code: "FO",
    },
    {
        name: "Fiji",
        code: "FJ",
    },
    {
        name: "Finland",
        code: "FI",
    },
    {
        name: "France",
        code: "FR",
    },
    {
        name: "French Guiana",
        code: "GF",
    },
    {
        name: "French Polynesia",
        code: "PF",
    },
    {
        name: "French Southern Territories",
        code: "TF",
    },
    {
        name: "Gabon",
        code: "GA",
    },
    {
        name: "Gambia",
        code: "GM",
    },
    {
        name: "Georgia",
        code: "GE",
    },
    {
        name: "Germany",
        code: "DE",
    },
    {
        name: "Ghana",
        code: "GH",
    },
    {
        name: "Gibraltar",
        code: "GI",
    },
    {
        name: "Greece",
        code: "GR",
    },
    {
        name: "Greenland",
        code: "GL",
    },
    {
        name: "Grenada",
        code: "GD",
    },
    {
        name: "Guadeloupe",
        code: "GP",
    },
    {
        name: "Guam",
        code: "GU",
    },
    {
        name: "Guatemala",
        code: "GT",
    },
    {
        name: "Guernsey",
        code: "GG",
    },
    {
        name: "Guinea",
        code: "GN",
    },
    {
        name: "Guinea-Bissau",
        code: "GW",
    },
    {
        name: "Guyana",
        code: "GY",
    },
    {
        name: "Haiti",
        code: "HT",
    },
    {
        name: "Heard Island and Mcdonald Islands",
        code: "HM",
    },
    {
        name: "Holy See (Vatican City State)",
        code: "VA",
    },
    {
        name: "Honduras",
        code: "HN",
    },
    {
        name: "Hong Kong",
        code: "HK",
    },
    {
        name: "Hungary",
        code: "HU",
    },
    {
        name: "Iceland",
        code: "IS",
    },
    {
        name: "India",
        code: "IN",
    },
    {
        name: "Indonesia",
        code: "ID",
    },
    {
        name: "Iran, Islamic Republic Of",
        code: "IR",
    },
    {
        name: "Iraq",
        code: "IQ",
    },
    {
        name: "Ireland",
        code: "IE",
    },
    {
        name: "Isle of Man",
        code: "IM",
    },
    {
        name: "Israel",
        code: "IL",
    },
    {
        name: "Italy",
        code: "IT",
    },
    {
        name: "Jamaica",
        code: "JM",
    },
    {
        name: "Japan",
        code: "JP",
    },
    {
        name: "Jersey",
        code: "JE",
    },
    {
        name: "Jordan",
        code: "JO",
    },
    {
        name: "Kazakhstan",
        code: "KZ",
    },
    {
        name: "Kenya",
        code: "KE",
    },
    {
        name: "Kiribati",
        code: "KI",
    },
    {
        name: 'Korea, Democratic People"S Republic of',
        code: "KP",
    },
    {
        name: "Korea, Republic of",
        code: "KR",
    },
    {
        name: "Kuwait",
        code: "KW",
    },
    {
        name: "Kyrgyzstan",
        code: "KG",
    },
    {
        name: 'Lao People"S Democratic Republic',
        code: "LA",
    },
    {
        name: "Latvia",
        code: "LV",
    },
    {
        name: "Lebanon",
        code: "LB",
    },
    {
        name: "Lesotho",
        code: "LS",
    },
    {
        name: "Liberia",
        code: "LR",
    },
    {
        name: "Libyan Arab Jamahiriya",
        code: "LY",
    },
    {
        name: "Liechtenstein",
        code: "LI",
    },
    {
        name: "Lithuania",
        code: "LT",
    },
    {
        name: "Luxembourg",
        code: "LU",
    },
    {
        name: "Macao",
        code: "MO",
    },
    {
        name: "Macedonia, The Former Yugoslav Republic of",
        code: "MK",
    },
    {
        name: "Madagascar",
        code: "MG",
    },
    {
        name: "Malawi",
        code: "MW",
    },
    {
        name: "Malaysia",
        code: "MY",
    },
    {
        name: "Maldives",
        code: "MV",
    },
    {
        name: "Mali",
        code: "ML",
    },
    {
        name: "Malta",
        code: "MT",
    },
    {
        name: "Marshall Islands",
        code: "MH",
    },
    {
        name: "Martinique",
        code: "MQ",
    },
    {
        name: "Mauritania",
        code: "MR",
    },
    {
        name: "Mauritius",
        code: "MU",
    },
    {
        name: "Mayotte",
        code: "YT",
    },
    {
        name: "Mexico",
        code: "MX",
    },
    {
        name: "Micronesia, Federated States of",
        code: "FM",
    },
    {
        name: "Moldova, Republic of",
        code: "MD",
    },
    {
        name: "Monaco",
        code: "MC",
    },
    {
        name: "Mongolia",
        code: "MN",
    },
    {
        name: "Montserrat",
        code: "MS",
    },
    {
        name: "Morocco",
        code: "MA",
    },
    {
        name: "Mozambique",
        code: "MZ",
    },
    {
        name: "Myanmar",
        code: "MM",
    },
    {
        name: "Namibia",
        code: "NA",
    },
    {
        name: "Nauru",
        code: "NR",
    },
    {
        name: "Nepal",
        code: "NP",
    },
    {
        name: "Netherlands",
        code: "NL",
    },
    {
        name: "Netherlands Antilles",
        code: "AN",
    },
    {
        name: "New Caledonia",
        code: "NC",
    },
    {
        name: "New Zealand",
        code: "NZ",
    },
    {
        name: "Nicaragua",
        code: "NI",
    },
    {
        name: "Niger",
        code: "NE",
    },
    {
        name: "Nigeria",
        code: "NG",
    },
    {
        name: "Niue",
        code: "NU",
    },
    {
        name: "Norfolk Island",
        code: "NF",
    },
    {
        name: "Northern Mariana Islands",
        code: "MP",
    },
    {
        name: "Norway",
        code: "NO",
    },
    {
        name: "Oman",
        code: "OM",
    },
    {
        name: "Pakistan",
        code: "PK",
    },
    {
        name: "Palau",
        code: "PW",
    },
    {
        name: "Palestinian Territory, Occupied",
        code: "PS",
    },
    {
        name: "Panama",
        code: "PA",
    },
    {
        name: "Papua New Guinea",
        code: "PG",
    },
    {
        name: "Paraguay",
        code: "PY",
    },
    {
        name: "Peru",
        code: "PE",
    },
    {
        name: "Philippines",
        code: "PH",
    },
    {
        name: "Pitcairn",
        code: "PN",
    },
    {
        name: "Poland",
        code: "PL",
    },
    {
        name: "Portugal",
        code: "PT",
    },
    {
        name: "Puerto Rico",
        code: "PR",
    },
    {
        name: "Qatar",
        code: "QA",
    },
    {
        name: "Reunion",
        code: "RE",
    },
    {
        name: "Romania",
        code: "RO",
    },
    {
        name: "Russian Federation",
        code: "RU",
    },
    {
        name: "RWANDA",
        code: "RW",
    },
    {
        name: "Saint Helena",
        code: "SH",
    },
    {
        name: "Saint Kitts and Nevis",
        code: "KN",
    },
    {
        name: "Saint Lucia",
        code: "LC",
    },
    {
        name: "Saint Pierre and Miquelon",
        code: "PM",
    },
    {
        name: "Saint Vincent and the Grenadines",
        code: "VC",
    },
    {
        name: "Samoa",
        code: "WS",
    },
    {
        name: "San Marino",
        code: "SM",
    },
    {
        name: "Sao Tome and Principe",
        code: "ST",
    },
    {
        name: "Saudi Arabia",
        code: "SA",
    },
    {
        name: "Senegal",
        code: "SN",
    },
    {
        name: "Serbia and Montenegro",
        code: "CS",
    },
    {
        name: "Seychelles",
        code: "SC",
    },
    {
        name: "Sierra Leone",
        code: "SL",
    },
    {
        name: "Singapore",
        code: "SG",
    },
    {
        name: "Slovakia",
        code: "SK",
    },
    {
        name: "Slovenia",
        code: "SI",
    },
    {
        name: "Solomon Islands",
        code: "SB",
    },
    {
        name: "Somalia",
        code: "SO",
    },
    {
        name: "South Africa",
        code: "ZA",
    },
    {
        name: "South Georgia and the South Sandwich Islands",
        code: "GS",
    },
    {
        name: "Spain",
        code: "ES",
    },
    {
        name: "Sri Lanka",
        code: "LK",
    },
    {
        name: "Sudan",
        code: "SD",
    },
    {
        name: "Suriname",
        code: "SR",
    },
    {
        name: "Svalbard and Jan Mayen",
        code: "SJ",
    },
    {
        name: "Swaziland",
        code: "SZ",
    },
    {
        name: "Sweden",
        code: "SE",
    },
    {
        name: "Switzerland",
        code: "CH",
    },
    {
        name: "Syrian Arab Republic",
        code: "SY",
    },
    {
        name: "Taiwan, Province of China",
        code: "TW",
    },
    {
        name: "Tajikistan",
        code: "TJ",
    },
    {
        name: "Tanzania, United Republic of",
        code: "TZ",
    },
    {
        name: "Thailand",
        code: "TH",
    },
    {
        name: "Timor-Leste",
        code: "TL",
    },
    {
        name: "Togo",
        code: "TG",
    },
    {
        name: "Tokelau",
        code: "TK",
    },
    {
        name: "Tonga",
        code: "TO",
    },
    {
        name: "Trinidad and Tobago",
        code: "TT",
    },
    {
        name: "Tunisia",
        code: "TN",
    },
    {
        name: "Turkey",
        code: "TR",
    },
    {
        name: "Turkmenistan",
        code: "TM",
    },
    {
        name: "Turks and Caicos Islands",
        code: "TC",
    },
    {
        name: "Tuvalu",
        code: "TV",
    },
    {
        name: "Uganda",
        code: "UG",
    },
    {
        name: "Ukraine",
        code: "UA",
    },
    {
        name: "United Arab Emirates",
        code: "AE",
    },
    {
        name: "United Kingdom",
        code: "GB",
    },
    {
        name: "United States",
        code: "US",
    },
    {
        name: "United States Minor Outlying Islands",
        code: "UM",
    },
    {
        name: "Uruguay",
        code: "UY",
    },
    {
        name: "Uzbekistan",
        code: "UZ",
    },
    {
        name: "Vanuatu",
        code: "VU",
    },
    {
        name: "Venezuela",
        code: "VE",
    },
    {
        name: "Viet Nam",
        code: "VN",
    },
    {
        name: "Virgin Islands, British",
        code: "VG",
    },
    {
        name: "Virgin Islands, U.S.",
        code: "VI",
    },
    {
        name: "Wallis and Futuna",
        code: "WF",
    },
    {
        name: "Western Sahara",
        code: "EH",
    },
    {
        name: "Yemen",
        code: "YE",
    },
    {
        name: "Zambia",
        code: "ZM",
    },
    {
        name: "Zimbabwe",
        code: "ZW",
    },
];
