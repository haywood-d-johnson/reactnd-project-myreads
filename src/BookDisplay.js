import React from "react";
import PropTypes from "prop-types";

const BookDisplay = (props) => {
    const { book, handleSwitchShelves } = props;
    const img = `url(${
        book.imageLinks && book.imageLinks.smallThumbnail
            ? `${book.imageLinks.smallThumbnail}`
            : `url(${"https://placehold.it/128x193.png&text=Image+Not+Available"})`
    })`;

    const bookStyle = {
        width: 128,
        height: 193,
        backgroundImage: img,
    };
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={bookStyle}></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => handleSwitchShelves(e, book)}>
                        <option value="move" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );
};

export default BookDisplay;

BookDisplay.propTypes = {
    book: PropTypes.object.isRequired,
    handleSwitchShelves: PropTypes.func.isRequired,
};
