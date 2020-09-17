import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlyReading: [],
            wantToRead: [],
            readBooks: [],
        };
        this._isMounted = false;
    }

    static propTypes = {
        handleSwitchShelves: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        this.handleSetShelves();
        this._isMounted = true;
    };

    componentDidUpdate = () => {
        this.handleSetShelves();
    };

    componentWillUnmount = () => {
        this._isMounted = false;
    };

    handleSetShelves = () => {
        this._isMounted &&
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

    handleSwitch = (e, book) => {
        this.props.handleSwitchShelves(e, book);
        this.handleSetShelves();
    };

    render() {
        const { currentlyReading, wantToRead, readBooks } = this.state;
        const { handleSwitchShelves } = this.props;
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
                                handleSwitchShelves={handleSwitchShelves}
                            />
                            <BookShelf
                                books={wantToRead}
                                title="Want To Read"
                                handleSwitchShelves={handleSwitchShelves}
                            />
                            <BookShelf
                                books={readBooks}
                                title="Read"
                                handleSwitchShelves={handleSwitchShelves}
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
