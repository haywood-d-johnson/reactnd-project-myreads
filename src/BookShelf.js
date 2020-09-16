import React from "react";
import PropTypes from "prop-types";
import BookDisplay from "./BookDisplay";

const BookShelf = (props) => {
    const { books, title, handleSwitchShelves } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => {
                        return (
                            <li key={book.id}>
                                <BookDisplay
                                    book={book}
                                    handleSwitchShelves={handleSwitchShelves}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

export default BookShelf;

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    handleSwitchShelves: PropTypes.func.isRequired,
};
