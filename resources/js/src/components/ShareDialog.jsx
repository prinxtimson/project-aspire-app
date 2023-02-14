import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ShareDialog = ({ report }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        report_id: "",
        email: "",
    });

    useEffect(() => {
        if (report) {
            setFormData({
                email: "",
                report_id: report.id,
            });
        }
    }, [report]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/analytics/email", formData)
            .then((res) => {
                setLoading(false);
                toast.success(res.data.msg);
                setFormData({
                    report_id: "",
                    email: "",
                });
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
            id="shareModal"
            tabIndex="-1"
            aria-labelledby="shareModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="shareModalLabel">
                            Share Report
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form
                            onSubmit={handleOnSubmit}
                            className="form row g-3 p-3"
                        >
                            <div className="form-floating col-12">
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    value={formData.email}
                                    placeholder="Email"
                                    id="floatingInput"
                                    name="email"
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="floatingInput">Email</label>
                            </div>

                            <div className="d-flex justify-content-between col-12">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-lg"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={loading}
                                >
                                    Share
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareDialog;
