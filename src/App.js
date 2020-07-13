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

import UserService from "./services/UserService";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Karmadillo',
            routes: [
                { component: MovieListView, path: '/', exact: true },
                { component: MovieDetailView, path: '/show/:id' },
                { component: PostDetailView, path: '/post/:id' },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<MovieFormView {...props} />)
                        }
                        else {
                            return (<Redirect to={'/login'} />)
                        }
                    }, path: '/edit/:id'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return (<MovieFormView {...props} />)
                        }
                        else {
                            return (<Redirect to={'/login'} />)
                        }
                    }, path: '/add',
                },
                { component: UserLoginView, path: '/login' },
                { component: UserSignupView, path: '/register' },
                { component: NewsFeedView, path: '/newsFeed' },
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

