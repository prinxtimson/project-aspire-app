import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { reset, scheduleBooking } from "../features/booking/bookingSlice";

const BookMeetingDialog = ({ selectedDate, handleOnClose }) => {
    const closeBtnRef = useRef(null);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        from: "",
        to: "",
        link: "",
        description: "",
    });

    const dispatch = useDispatch();
    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.booking
    );

    useEffect(() => {
        if (selectedDate) {
            setFormData({
                ...formData,
                date: moment(selectedDate).toString(),
            });
        }
    }, [selectedDate]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
            closeBtnRef.current.click();
        }

        dispatch(reset());
    }, [isLoading, isSuccess, isError, message]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { title, date, from, to, link, description } = formData;
        const data = {
            title,
            date,
            time: `${from} - ${to}`,
            meeting_link: link,
            description,
        };
        dispatch(scheduleBooking(data));
    };

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onClose = () => {
        handleOnClose();
        setFormData({
            title: "",
            date: "",
            from: "",
            to: "",
            link: "",
            description: "",
        });
    };

    return (
        <div
            className="modal fade"
            id="meetingModal"
            tabIndex="-1"
            aria-labelledby="meetingModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="meetingModalLabel">
                            Schedule Meeting
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
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
                                    value={formData.title}
                                    placeholder="Title"
                                    id="floatingInput"
                                    name="title"
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    Meeting Title
                                </label>
                            </div>
                            <div className="form-floating col-12">
                                <input
                                    className="form-control form-control-lg"
                                    value={moment(formData.date).format("ll")}
                                    placeholder="Meeting Date"
                                    id="floatingInput"
                                    name="date"
                                    readOnly
                                />
                                <label htmlFor="floatingInput">
                                    Meeting Date
                                </label>
                            </div>
                            <div className="col-12">
                                <label htmlFor="floatingInput">
                                    Meeting Time
                                </label>
                                <div className="row ">
                                    <div className="form-floating col-6">
                                        <select
                                            className="form-select form-control form-control-lg"
                                            placeholder="From"
                                            aria-label="from"
                                            name="from"
                                            value={formData.from}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option value=""></option>
                                            {TIME.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>

                                        <label htmlFor="floatingInput">
                                            From
                                        </label>
                                    </div>
                                    <div className="form-floating col-6">
                                        <select
                                            className="form-select form-control form-control-lg"
                                            placeholder="To"
                                            aria-label="to"
                                            name="to"
                                            value={formData.to}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option value=""></option>
                                            {TIME.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="floatingInput">
                                            to
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating col-12">
                                <input
                                    className="form-control form-control-lg"
                                    value={formData.link}
                                    placeholder="Meeting Link"
                                    id="floatingInput"
                                    name="link"
                                    onChange={handleOnChange}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    Meeting Link
                                </label>
                            </div>
                            <div className="form-floating col-12">
                                <textarea
                                    className="form-control form-control-lg"
                                    value={formData.description}
                                    placeholder="Description"
                                    id="floatingInput"
                                    name="description"
                                    onChange={handleOnChange}
                                    style={{ height: 100 }}
                                    rows={4}
                                />
                                <label htmlFor="floatingInput">
                                    Description
                                </label>
                            </div>
                            <div className="d-flex justify-content-between col-12">
                                <button
                                    type="button"
                                    ref={closeBtnRef}
                                    className="btn btn-secondary btn-lg"
                                    data-bs-dismiss="modal"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={isLoading}
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

export default BookMeetingDialog;

const TIME = [
    "12:00am",
    "12:15am",
    "12:30am",
    "12:45am",
    "1:00am",
    "1:15am",
    "1:30am",
    "1:45am",
    "2:00am",
    "2:15am",
    "2:30am",
    "2:45am",
    "3:00am",
    "3:15am",
    "3:30am",
    "3:45am",
    "4:00am",
    "4:15am",
    "4:30am",
    "4:45am",
    "5:00am",
    "5:15am",
    "5:30am",
    "5:45am",
    "6:00am",
    "6:15am",
    "6:30am",
    "6:45am",
    "7:00am",
    "7:15am",
    "7:30am",
    "7:45am",
    "8:00am",
    "8:15am",
    "8:30am",
    "8:45am",
    "9:00am",
    "9:15am",
    "9:30am",
    "9:45am",
    "10:00am",
    "10:15am",
    "10:30am",
    "10:45am",
    "11:00am",
    "11:15am",
    "11:30am",
    "11:45am",
    "12:00pm",
    "12:15pm",
    "12:30pm",
    "12:45pm",
    "1:00pm",
    "1:15pm",
    "1:30pm",
    "1:45pm",
    "2:00pm",
    "2:15pm",
    "2:30pm",
    "2:45pm",
    "3:00pm",
    "3:15pm",
    "3:30pm",
    "3:45pm",
    "4:00pm",
    "4:15pm",
    "4:30pm",
    "4:45pm",
    "5:00pm",
    "5:15pm",
    "5:30pm",
    "5:45pm",
    "6:00pm",
    "6:15pm",
    "6:30pm",
    "6:45pm",
    "7:00pm",
    "7:15pm",
    "7:30pm",
    "7:45pm",
    "8:00pm",
    "8:15pm",
    "8:30pm",
    "8:45pm",
    "9:00pm",
    "9:15pm",
    "9:30pm",
    "9:45pm",
    "10:00pm",
    "10:15pm",
    "10:30pm",
    "10:45pm",
    "11:00pm",
    "11:15pm",
    "11:30pm",
    "11:45pm",
];
