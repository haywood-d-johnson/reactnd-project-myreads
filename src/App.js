import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Landing from "./Landing";
import Search from "./Search";

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => <Landing />} />
                <Route exact path="/search" render={() => <Search />} />
            </div>
        );
    }
}

export default BooksApp;
