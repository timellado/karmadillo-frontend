"use strict";

import React, { useReducer } from 'react';

import MovieForm from './../components/MovieForm';

import MovieService from '../services/MovieService';
import ActivityService from '../services/ActivityService';
import PostService from '../services/PostService';
import ActivityForm from '../components/ActivityForm';


export class ActivityFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
            this.setState({
                loading: false,
                activity: undefined,
                error: undefined
            });
    }

    async createActivity(activity) {
            try {
                let ret = await ActivityService.createActivity(activity);
                this.props.history.push('/');
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating activity'}));
            }
    }

    async createPost(activity,post) {
        try {
            
            let retA = await ActivityService.createActivity(activity);
            
            try{
                post.activity = retA._id
                console.log(post);
                let retP = await PostService.createPost(post);
                this.props.history.push('/');
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating post'}));
            }

        } catch(err) {
            console.error(err);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating activity'}));
        }
}

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<ActivityForm onSubmit={(activity) => this.createActivity(activity)} onSubmit={(activity, post) => this.createPost(activity, post)}error={this.state.error} />);
    }
}
