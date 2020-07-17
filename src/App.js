"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { MovieListView } from './views/MovieListView';
import { MovieDetailView } from './views/MovieDetailView';
import { MovieFormView } from './views/MovieFormView';
import { PostDetailView } from './views/PostDetailView';
import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";
import { NewsFeedView } from "./views/NewsFeedView";
import { ActivityFormView } from "./views/ActivityFormView";

import UserService from "./services/UserService";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Karmadillo',
            routes: [
            
                { component: NewsFeedView, path: '/', exact: true },
                { component: MovieDetailView, path: '/show/:id' },
                { component: PostDetailView, path: '/post/:id' },
                { component: UserLoginView, path: '/login' },
                { component: UserSignupView, path: '/register' },
                { component: MovieListView, path: '/movies' },
                { component: ActivityFormView, path: '/add' }
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route} />))}
                    </Switch>
                </Router>
            </div>
        );
    }
}

