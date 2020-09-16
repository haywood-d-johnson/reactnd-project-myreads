import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookDisplay from "./BookDisplay";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    async handleSearch(e) {
        BooksAPI.search(e.target.value)
            .then((res) => {
                this.setState({ books: res.length ? res : [] });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSwitchShelves = (e, book) => {
        console.log(book.id);
        console.log(book.shelf);
        console.log(e.target.value);
        if (book.shelf !== e.target.value) {
            BooksAPI.update({ id: book.id }, e.target.value)
                .then((res) => {})
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    render() {
        const { books } = this.state;
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
                                onChange={this.handleSearch}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {Boolean(books.length) &&
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
