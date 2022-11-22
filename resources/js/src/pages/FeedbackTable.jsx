import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import DashboardContainer from "../components/DashboardContainer";
import { getFeedbacks } from "../features/feedback/feedbackSlice";
import axios from "axios";

const FeedbackTable = () => {
    const { t } = useTranslation(["dashboard"]);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const { feedbacks, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.feedback
    );

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        dispatch(getFeedbacks());
    }, []);

    useEffect(() => {
        if (feedbacks) {
            setData(feedbacks?.filter((item) => item.status != "archive"));
        }
    }, [feedbacks]);

    const getArchiveFeedbacks = () => {
        setData(feedbacks?.filter((item) => item.status === "archive"));
    };

    const getActiveFeedbacks = () => {
        setData(feedbacks?.filter((item) => item.status != "archive"));
    };

    const getAllFeedbacks = () => {
        setData(feedbacks);
    };

    const handleArchiveFeedback = (id) => {
        axios
            .post(`/api/feedbacks/${id}/archive`)
            .then((res) => {
                setData(data.filter((item) => item.id != id));
            })
            .catch((e) => console.log(e));
    };

    return (
        <DashboardContainer>
            <div className="container py-5">
                {isLoading ? (
                    <p className="py-5">Feedbacks loading........</p>
                ) : (
                    <div className="card">
                        <div className="card-body table-responsive">
                            <div className="d-flex py-3">
                                <div className="flex-shrink-0 mx-3">
                                    <h2>
                                        Feedbacks{" "}
                                        <span>{` (${data?.length || 0})`}</span>
                                    </h2>
                                </div>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Feedback</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading &&
                                        data.map((val) => (
                                            <tr
                                                key={val.id}
                                                className="align-middle"
                                            >
                                                <th scope="row">{val.id}</th>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shink-0 mx-2">
                                                            <p className="mb-0">
                                                                {val.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{val.email}</td>
                                                <td>
                                                    <p className="mb-0">
                                                        {val.message}
                                                    </p>
                                                </td>
                                                <td>
                                                    {/*
                                                <div className="d-flex">
                                                    <div className="">
                                                        <button
                                                            className="btn"
                                                            type="button"
                                                        ></button>
                                                    </div>
                                                    <div className="flex-shrink-0 mx-2">
                                                        <button
                                                            className="btn btn-danger btn-sm text-white"
                                                            type="button"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                                */}
                                                    <button
                                                        className="btn btn-warning btn-sm text-white"
                                                        type="button"
                                                        onClick={() =>
                                                            handleArchiveFeedback(
                                                                val.id
                                                            )
                                                        }
                                                        disabled={
                                                            val.status ===
                                                            "archive"
                                                        }
                                                    >
                                                        Archive
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardContainer>
    );
};

export default FeedbackTable;
