import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Landing from "./Landing";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
    handleSwitchShelves = (e, book) => {
        if (book.shelf !== e.target.value) {
            BooksAPI.update({ id: book.id }, e.target.value);
        }
    };

    render() {
        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Landing
                            handleSwitchShelves={this.handleSwitchShelves}
                        />
                    )}
                />
                <Route
                    exact
                    path="/search"
                    render={() => (
                        <Search
                            handleSwitchShelves={this.handleSwitchShelves}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
