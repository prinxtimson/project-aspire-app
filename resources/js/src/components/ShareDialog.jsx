import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const ShareDialog = ({ period }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        period,
        email: "",
        type: "xlsx",
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/analytics/email", formData)
            .then((res) => {
                setLoading(false);
                toast.success(res.data.msg);
                setFormData({
                    period,
                    email: "",
                    type: "xlsx",
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
                            <div className="form-floating col-12">
                                <select
                                    className="form-select form-control form-control-lg"
                                    placeholder="Report Format"
                                    aria-label="example"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleOnChange}
                                >
                                    <option value=""></option>
                                    {TYPES.map((item) => (
                                        <option
                                            key={item.name}
                                            value={item.value}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="floatingInput">
                                    Select Report Format
                                </label>
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

const TYPES = [
    { name: "Excel", value: "xlsx" },
    { name: "CSV", value: "csv" },
    { name: "PDF", value: "pdf" },
];
