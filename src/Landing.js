import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookDisplay from "./BookDisplay";

class Landing extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        readBooks: [],
    };

    componentDidMount = () => {
        this.handleSetShelves();
    };

    handleSetShelves = () => {
        BooksAPI.getAll()
            .then((res) => {
                let current = res.filter((book) => {
                    return book.shelf === "currentlyReading";
                });
                let want = res.filter((book) => {
                    return book.shelf === "wantToRead";
                });
                let read = res.filter((book) => {
                    return book.shelf === "read";
                });
                this.setState({
                    currentlyReading: current,
                    wantToRead: want,
                    readBooks: read,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    handleSwitchShelves = (e, book) => {
        //if (book.shelf !== eb)
    };

    render() {
        const { currentlyReading, wantToRead, readBooks } = this.state;
        console.log(this.state.currentlyReading);
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">
                                    Currently Reading
                                </h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {currentlyReading.map((book) => {
                                            return (
                                                <li key={book.id}>
                                                    <BookDisplay
                                                        book={book}
                                                        handleSwitchShelves={
                                                            this
                                                                .handleSwitchShelves
                                                        }
                                                    />
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">
                                    Want to Read
                                </h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {wantToRead.map((book) => {
                                            return (
                                                <li key={book.id}>
                                                    <BookDisplay
                                                        book={book}
                                                        handleSwitchShelves={
                                                            this
                                                                .handleSwitchShelves
                                                        }
                                                    />
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {readBooks.map((book) => {
                                            return (
                                                <li key={book.id}>
                                                    <BookDisplay
                                                        book={book}
                                                        handleSwitchShelves={
                                                            this
                                                                .handleSwitchShelves
                                                        }
                                                    />
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search">
                            <button>Add a book</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
