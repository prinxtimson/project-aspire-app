import Moment from "react-moment";

const MeetingDetails = ({ meeting, handleOnClose }) => {
    return (
        <div
            className="modal fade"
            id="meetingDetailsModal"
            tabIndex="-1"
            aria-labelledby="meetingDetailsModalLabel"
            aria-hidden="true"
            //onBlur={handleOnClose}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="meetingDetailsModalLabel"
                        >
                            Meeting Details
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
                        <div className="mb-3">
                            <h5 className="mb-1">Titel</h5>
                            <h3>{meeting.title}</h3>
                        </div>

                        <div className="mb-3">
                            <h5 className="mb-1">Date/Time</h5>
                            <p>
                                {" "}
                                <Moment format="LL">{meeting.date}</Moment>
                                {` . ${meeting.time}`}
                            </p>
                        </div>

                        <div className="mb-3">
                            <h5 className="mb-1">Meeting Link</h5>
                            <p>
                                <span>
                                    <a
                                        href={meeting.meeting_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {meeting.meeting_link}
                                    </a>
                                </span>{" "}
                                <span>
                                    <a
                                        className="btn"
                                        href="#"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                meeting.meeting_link
                                            );
                                            alert("Meeting link copied!");
                                        }}
                                    >
                                        <i className="bi bi-clipboard"></i>
                                    </a>
                                </span>
                            </p>
                        </div>

                        <div className="mb-4">
                            <h5 className="mb-1">Description</h5>
                            <p>{meeting.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingDetails;
