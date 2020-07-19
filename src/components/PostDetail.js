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
                    <Avatar src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" />
                    <div className="post-comment-data">
                    <p><b>{this.props.comments[i].commentUser}</b> {moment(this.props.comments[i].createdAt).fromNow()}</p>
                    <p>{this.props.comments[i].text}</p>
                    <button  onClick={() => this.props.onLike(this.props.comments[i])} className="btn-actions-post"><img className="n-card-img-heart" src={likeIcon} alt="Like"></img> {this.props.comments[i].likes.length} likes</button>
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
                        <img className="n-card-img" src={this.props.post.postPic} ></img>
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
                    <p>{this.props.comments.length} comments</p>
                </div>
                <Grid className="grid-data" >
                <Cell size={1}><Avatar src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg" /></Cell>
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
                </Grid>
                {postComments}

            </Page>
        );
    }
}