import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardContainer from "../components/DashboardContainer";

const ProductCatalogue = () => {
    return (
        <DashboardContainer>
            <div className="container-fluid p-4">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {PRODUCTS.map((product) => (
                        <div className="col " key={product.name}>
                            <div className="card">
                                <img
                                    src={product.img}
                                    className="card-img-top"
                                    alt={product.name}
                                    height={250}
                                />
                                <div className=" d-grid gap-2">
                                    <Link to={product.url}>
                                        <span className="btn btn-primary w-100">
                                            {product.name}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardContainer>
    );
};

export default ProductCatalogue;

const PRODUCTS = [
    { name: "Sports", url: "../sport", img: "/images/sport2.jpg" },
    { name: "Health", url: "../health", img: "/images/health.jpg" },
    {
        name: "Entertainment",
        url: "../entertainment",
        img: "/images/entertainment.jpg",
    },
    { name: "Food", url: "../food", img: "/images/food.jpg" },
    { name: "Fashion", url: "../fashion", img: "/images/fashion.jpg" },
];
