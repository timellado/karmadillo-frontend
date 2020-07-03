"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';

import { SimpleLink } from './SimpleLink';

import ActivityService from '../services/ActivityService';
import UserService from '../services/UserService';
import '../css/images/App.css';
import logo from '../css/images/karmadilloIcon.png';


export class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            activityData:null, 
            userData:null
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });
         this.post = this.props.post;
        ActivityService.getActivity(this.post.activity).then((activityData) => {
            this.setState({
                activityData: activityData
            });

            UserService.getUser(this.state.activityData.user).then((userData) => {
                this.setState({
                    loading: false,
                    userData: userData
                });
    
            }).catch((e) => {
                console.error(e);
            });

        }).catch((e) => {
            console.error(e);
        });
        
        
    }


    render() {
        if (this.state.loading) {
           // return (<h2>Loading...</h2>);
           return <div></div>;
        }
        return (
            <div className="post">
                <div className="activity">
                    <div>{this.state.activityData.name}</div>
                </div>
                
                <img className="n-card-img" src={logo} alt=""></img>
                <div className="created-at">
                </div>
                <div className="user">
                    <strong>{this.state.userData.username} </strong>
                    {this.post.description} 
                </div>
                          
                <div className="actions">
                    <div>Like</div>
                    <div>Comment</div>
                </div>
            </div>



        );
    }
}