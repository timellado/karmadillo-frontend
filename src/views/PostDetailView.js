"use strict";

import React from 'react';

import { PostDetail } from '../components/PostDetail';

import PostService from '../services/PostService';


export class PostDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        (async () => {
            try {
                let post = await PostService.getPost(id);
                this.setState({
                    post: post,
                    loading: false
                });
            } catch(err) {
                console.error(err);
            }
        })();
    }

    async deletePost(id) {
        try {
            let ret = await PostService.deletePost(id);
            this.props.history.push('/');
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <PostDetail post={this.state.post} onDelete={(id) => this.deletePost(id)}/>
        );
    }
}
