"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { PostDetailView } from './views/PostDetailView';
import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";
import { NewsFeedView } from "./views/NewsFeedView";
import { ActivityFormView } from "./views/ActivityFormView";



export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Karmadillo',
            routes: [
            
                { component: NewsFeedView, path: '/', exact: true },
                { component: PostDetailView, path: '/post/:id' },
                { component: UserLoginView, path: '/login' },
                { component: UserSignupView, path: '/register' },
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

