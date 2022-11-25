import { useRef } from "react";
import { Link } from "react-router-dom";

const SearchDialog = ({ searchResult, handleOnClose }) => {
    const closeBtnRef = useRef(null);

    return (
        <div
            className="modal fade"
            id="searchModal"
            tabIndex="-1"
            aria-labelledby="searchModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="searchModalLabel">
                            Search Result
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleOnClose}
                            ref={closeBtnRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <ul className="">
                            {searchResult.length === 0 ? (
                                <li>
                                    <p className="px-3">
                                        No search result found
                                    </p>
                                </li>
                            ) : (
                                searchResult.map((result, index) => (
                                    <li key={index} className="">
                                        <h3>Page</h3>
                                        <div className="">
                                            <Link
                                                to={result.link}
                                                onClick={() =>
                                                    closeBtnRef.current.click()
                                                }
                                            >
                                                <h4>{result.name}</h4>
                                            </Link>
                                            <p>{result.content}</p>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDialog;
