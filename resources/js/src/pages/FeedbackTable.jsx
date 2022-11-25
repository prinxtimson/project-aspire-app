import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import DashboardContainer from "../components/DashboardContainer";
import { getFeedbacks } from "../features/feedback/feedbackSlice";
import axios from "axios";
import FeedbackDialog from "../components/FeedbackDialog";

const FeedbackTable = () => {
    const { t } = useTranslation(["dashboard"]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

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

    const handleOnClose = () => setSelectedFeedback(null);

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
                <FeedbackDialog
                    feedback={selectedFeedback}
                    handleOnClose={handleOnClose}
                />
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
                                                    <div className="d-grid gap-2 d-md-flex">
                                                        <button
                                                            className="btn btn-primary me-md-2"
                                                            type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#feedbackModal"
                                                            onClick={() =>
                                                                setSelectedFeedback(
                                                                    val
                                                                )
                                                            }
                                                        >
                                                            Respond
                                                        </button>
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
                                                    </div>
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
