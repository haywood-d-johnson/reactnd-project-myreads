import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookDisplay from "./BookDisplay";

class Search extends Component {
    state = {
        value: "",
        books: [],
    };

    componentDidMount = () => {};

    handleChange = (e) => {
        this.setState({ value: e.target.value });
        this.handleSearch();
    };

    handleSearch = () => {
        BooksAPI.search(this.state.value)
            .then((res) => {
                this.setState({ books: res.length ? res : [] });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /*
    could be more modular...
    add books to needed objectson landing page
    */
    handleSwitchShelves = (e, book) => {
        if (book.shelf !== e.target.value) {
            BooksAPI.update({ id: book.id }, e.target.value)
                .then((res) => {})
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    render() {
        const { value, books } = this.state;
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/">
                            <button className="close-search">Close</button>
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                value={value}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {books.length > 0 &&
                                books.map((book) => {
                                    return (
                                        <li key={book.id}>
                                            <BookDisplay
                                                book={book}
                                                handleSwitchShelves={
                                                    this.handleSwitchShelves
                                                }
                                            />
                                        </li>
                                    );
                                })}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}
export default Search;
