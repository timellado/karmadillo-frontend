"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';

import { SimpleLink } from './SimpleLink';

import UserService from '../services/UserService';
import '../css/images/App.css';
import logo from '../css/images/karmadilloIcon.png';
import commentIcon from '../css/images/commentIcon.png';
import likeIcon from '../css/images/likeIcon.png';
import PostService from '../services/PostService';

export class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            userData: null,
            numberOfComments: this.props.post.comments.length,
            numberOfLikes: this.props.post.likes.length
        };
    }

    componentWillMount(){
        this.post = this.props.post;
        this.setState({
            loading: true
        });
        UserService.getUser(this.post.activity.user).then((userData) => {
            this.setState({
                userData: userData, 
                loading: false
            });
        
        }).catch((e) => {
            console.error(e);
        });
    }

    async onLike(post){
        try {
            let currentUser = UserService.getCurrentUser();
            if (this.props.post.likes.some(e => e._id === currentUser.id)) {
                var index = this.props.post.likes.indexOf(currentUser.id);
                this.props.post.likes.splice(index, 1);
            } else {
                this.props.post.likes.push(currentUser.id);
            }
            let like = await PostService.updatePost(post);
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
                <div className="outer">
                    <div className="card">
                    <SimpleLink className="link" to={`/post/${this.post._id}`}>
                        <div className="headline">
                            {this.post.activity.name}
                        </div>
                        {this.post.postPic !== '' &&
                        
                            <img className="n-card-img" src={this.post.postPic} ></img>
                        
                        }
                      

                        <div className="user">
                            <b>{this.state.numberOfLikes} likes</b>
                            <div className="crop"><b>{this.state.userData.username} </b>
                            
                            <button onClick={() => this.onLike(this.post)} className="btn-actions"><img className="n-card-img-heart" src={likeIcon} alt="Like"></img></button>
                            <SimpleLink to={`/post/${this.post._id}`}>
                                <button className="btn-actions">{this.state.numberOfComments} <img className="n-card-img-comment" src={commentIcon} alt="Comment"></img></button> 
                            </SimpleLink>
                            {this.post.description}</div>              
                        </div>
                        </SimpleLink>          
                    </div>
                </div>
                
            );
            

        
    
    }
}