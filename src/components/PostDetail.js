"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, Media, Avatar, TextField, MediaOverlay, Grid, GridList, Cell, Button, FontIcon } from 'react-md';

import Page from './Page';

import UserService from '../services/UserService';

import likeIcon from '../css/images/likeIcon.png';

import moment from 'moment';

const style = { maxWidth: 1200 };

export class PostDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            commentText: '',
            post: props.post
        }
        this.handleChangeCommentText = this.handleChangeCommentText.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeCommentText(value) {
        this.setState(Object.assign({}, this.state, {commentText: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let comment = {};

        comment.text = this.state.commentText;
        comment.post = this.state.post._id;

        this.props.onSubmit(comment);
    }

    render() {
        let table = []

        for (let i = 0; i < this.props.post.activity.tag.length; i++) {
            //Create the parent and add the children
            table.push(<Cell align={"bottom"} size={5}>{this.props.post.activity.tag[i]}</Cell>)
        }

        let postComments = [];
        (async () => {
            for (let i = 0; i < this.props.comments.length; i++) {
                //Create the parent and add the children
                postComments.push(<div className="post-comment">
                    <Avatar src="https://picsum.photos/40/40?image=153" />
                    <div className="post-comment-data">
                    <p><b>{this.props.comments[i].commentUser}</b> {moment(this.props.comments[i].createdAt).fromNow()}</p>
                    <p>{this.props.comments[i].text}</p>
                    <button className="btn-actions-post"><img className="n-card-img-heart" src={likeIcon} alt="Like"></img> {this.props.comments[i].likes.length} likes</button>
                    <b>Answers</b>
                    </div>
                    </div>)
            }
        })();

        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <Grid className="grid-data" >
                        <Cell size={7}>
                            <Media height={16} width={9}>
                                <img src={"data:image/jpeg;base64,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"} alt={this.props.post.activity.name} />
                            </Media>
                        </Cell>
                        <GridList className="grid-buttons" stacked={true} >
                            <Cell align={"bottom"} size={5}>
                                {UserService.isAuthenticated() ?
                                    <Link to={{pathname: `/edit/${this.props.post._id}`, state : {post : this.props.post}}}><Button icon>mode_edit</Button></Link>
                                    : <Link to={'/login'}><Button icon>mode_edit</Button></Link>
                                }
                            </Cell>
                            <Cell align={"bottom"} size={5}>
                                {UserService.isAuthenticated() ?
                                    <Button onClick={() => this.props.onDelete(this.props.post._id)} icon>delete</Button>
                                    :   <Link to={'/login'}><Button icon>delete</Button></Link>
                                }
                            </Cell>
                            <Cell align={"bottom"} size={12}>Posted: {moment(this.props.post.createdAt).fromNow()}</Cell> 
                            <Cell align={"bottom"} size={5}>Created by: {this.props.postCreator.username}</Cell>
                            <Cell align={"bottom"} size={5}>Category: {this.props.post.activity.category}</Cell>
                            {table}
                        </GridList>
                        
                    </Grid>
                    <div>
                        <b>{this.props.post.likes.length} likes</b>
                        <p>
                            <b>{this.props.postCreator.username}</b> {this.props.post.description}
                        </p>
                    </div>
                </Card>
                <div>
                    <p>{this.props.post.comments.length} comments</p>
                </div>
                <Grid className="grid-data" >
                <Cell size={1}><Avatar src="https://picsum.photos/40/40?image=153" /></Cell>
                <Cell size={5}>
                    
                </Cell>
                <form onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                <TextField
                    id="floating-center-title"
                    label="Add a comment"
                    type="text"
                    lineDirection="center"
                    className="md-cell"
                    value={this.state.commentText}
                    onChange={this.handleChangeCommentText}
                    />
                <Button id="submit" type="submit" raised primary className="md-cell md-cell--2">Save</Button>
                </form> 
                <Cell><Button onClick={() => this.props.history.push('/')}></Button></Cell> 
                </Grid>
                {postComments}

            </Page>
        );
    }
}