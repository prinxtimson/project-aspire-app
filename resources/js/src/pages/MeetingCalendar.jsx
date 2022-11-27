import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import DashboardContainer from "../components/DashboardContainer";
import BookMeetingDialog from "../components/BookMeetingDialog";
import { clear, getBookings } from "../features/booking/bookingSlice";
import MeetingDetails from "../components/MeetingDetails";

const MeetingCalendar = () => {
    const bookMeetingBtnRef = useRef(null);
    const [selectedMeeting, setSelectedMeeting] = useState({});
    const [value, onChange] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const dispatch = useDispatch();
    const { bookings, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.booking
    );

    const handleOnClose = () => setSelectedDate(null);

    const handleOnMeetingDetailsClick = (data) => {
        setSelectedMeeting(data);
    };

    const handleOnMeetingDetailsClose = () => setSelectedMeeting({});

    useEffect(() => {
        dispatch(getBookings());

        return () => dispatch(clear());
    }, []);

    const handleDateClick = (val, e) => {
        setSelectedDate(val);
        bookMeetingBtnRef.current.click();
    };

    return (
        <DashboardContainer>
            <BookMeetingDialog
                selectedDate={selectedDate}
                handleOnClose={handleOnClose}
            />
            <MeetingDetails
                meeting={selectedMeeting}
                handleOnClose={handleOnMeetingDetailsClose}
            />
            <div className="container py-5">
                <div className="row mx-4">
                    <div className="col col-md-4">
                        <div className="">
                            <h5 className="fw-bold ">Calendar</h5>
                            <Calendar
                                onChange={onChange}
                                value={value}
                                onClickDay={handleDateClick}
                                className="border-0"
                            />
                        </div>
                        <button
                            className="d-none"
                            type="button"
                            ref={bookMeetingBtnRef}
                            data-bs-toggle="modal"
                            data-bs-target="#meetingModal"
                        ></button>
                    </div>
                    <div className="col col-md-8">
                        <div className="">
                            <h5 className="fw-bold ">Scheduled Meetings</h5>
                            <div
                                className="list-group list-group-flush overflow-auto"
                                style={{ maxHeight: 600 }}
                            >
                                {bookings?.map((item) => (
                                    <a
                                        href="#"
                                        key={item?.id}
                                        type="button"
                                        className="list-group-item"
                                        data-bs-toggle="modal"
                                        data-bs-target="#meetingDetailsModal"
                                        onClick={() =>
                                            handleOnMeetingDetailsClick(item)
                                        }
                                    >
                                        {item?.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
};

export default MeetingCalendar;
