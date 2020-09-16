import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

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
        if (book.shelf !== e.target.value) {
            BooksAPI.update({ id: book.id }, e.target.value)
                .then((res) => {
                    this.handleSetShelves();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    render() {
        const { currentlyReading, wantToRead, readBooks } = this.state;
        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf
                                books={currentlyReading}
                                title="Currently Reading"
                                handleSwitchShelves={this.handleSwitchShelves}
                            />
                            <BookShelf
                                books={wantToRead}
                                title="Want To Read"
                                handleSwitchShelves={this.handleSwitchShelves}
                            />
                            <BookShelf
                                books={readBooks}
                                title="Read"
                                handleSwitchShelves={this.handleSwitchShelves}
                            />
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
