"use strict";

import React from 'react';

import { PostDetail } from '../components/PostDetail';

import PostService from '../services/PostService';
import UserService from '../services/UserService';
import CommentService from '../services/CommentService';


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
                let postCreator = await UserService.getUser(post.activity.user);
                let postComments = await CommentService.getCommentFromPost(id);
                for (const comment of postComments) {
                    let commentUser = await UserService.getUser(comment.user);
                    comment["commentUser"] = commentUser.username;
                }
                console.log(postComments);
                this.setState({
                    post: post,
                    postCreator: postCreator,
                    comments: postComments,
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

    async createComment(comment) {
        try {
            let postComment = await CommentService.createComment(comment);
            console.log(postComment);
            this.props.history.go(0);
        } catch(err) {
            console.error(err);
            this.setState(Object.assign({}, this.state, {error: 'Error while creating comment'}));
        }
        
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <PostDetail comments={this.state.comments} postCreator={this.state.postCreator} post={this.state.post} onDelete={(id) => this.deletePost(id)} onSubmit={(comment) => this.createComment(comment)}/>
        );
    }
}
