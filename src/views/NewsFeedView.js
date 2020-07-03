"use strict";

import React from 'react';

import { NewsFeed } from '../components/NewsFeed';

import MovieService from '../services/MovieService';
import PostService from '../services/PostService';


export class NewsFeedView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        PostService.getPosts().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <NewsFeed data={this.state.data} />
        );
    }
}
