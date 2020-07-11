"use strict";

import React from 'react';

import { NewsFeed } from '../components/NewsFeed';

import ActivityService from '../services/ActivityService';
import PostService from '../services/PostService';
import UserService from '../services/UserService';


export class NewsFeedView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            postData: [], 
            currentUser: null
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        PostService.getPosts().then((postData) => {
            this.setState({
                postData: [...postData], 
                currentUser: UserService.getCurrentUser(),
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
            
            <NewsFeed postData={this.state.postData} currentUser={this.state.currentUser}/>

        );
    }
}
