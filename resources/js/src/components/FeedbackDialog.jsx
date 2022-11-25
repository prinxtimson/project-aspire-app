import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const FeedbackDialog = ({ feedback, handleOnClose }) => {
    const closeBtnRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        if (feedback) {
            setFormData({
                ...formData,
                email: feedback.email || "",
                name: feedback.name || "",
            });
        }
    }, [feedback]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/api/feedbacks/reply", formData)
            .then((res) => {
                setLoading(false);
                toast.success(res.data.msg);
                closeBtnRef.current.click();
            })
            .catch((e) => {
                setLoading(false);
                toast.error(e.response.msg);
            });
    };

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div
            className="modal fade"
            id="feedbackModal"
            tabIndex="-1"
            aria-labelledby="feedbackModalLabel"
            aria-hidden="true"
            onBlur={handleOnClose}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="feedbackModalLabel"
                        >
                            Reply Feedback
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleOnClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form
                            onSubmit={handleOnSubmit}
                            className="form row g-3 p-3"
                        >
                            <div className="form-floating col-12">
                                <input
                                    className="form-control form-control-lg"
                                    value={formData.name}
                                    placeholder="Name"
                                    id="floatingInput"
                                    name="name"
                                    readOnly
                                />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                            <div className="form-floating col-12">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    value={formData.email}
                                    placeholder="Email"
                                    id="floatingInput"
                                    name="email"
                                    readOnly
                                />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating col-12">
                                <textarea
                                    className="form-control form-control-lg"
                                    value={formData.message}
                                    placeholder="Enter Message"
                                    id="floatingInput"
                                    name="message"
                                    onChange={handleOnChange}
                                    style={{ height: 100 }}
                                    required
                                    rows={4}
                                />
                                <label htmlFor="floatingInput">
                                    Enter Message
                                </label>
                            </div>
                            <div className="d-flex justify-content-between col-12">
                                <button
                                    type="button"
                                    ref={closeBtnRef}
                                    className="btn btn-secondary btn-lg"
                                    data-bs-dismiss="modal"
                                    onClick={handleOnClose}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackDialog;
