import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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

    static propTypes = {
        handleSwitchShelves: PropTypes.func.isRequired,
    };

    async handleSearch(e) {
        BooksAPI.search(e.target.value)
            .then((res) => {
                this.setState({
                    books: res.length ? res : [],
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { books } = this.state;
        const { handleSwitchShelves } = this.props;
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
                                                    handleSwitchShelves
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
