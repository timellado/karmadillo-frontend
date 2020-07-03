"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';

import { SimpleLink } from './SimpleLink';

import UserService from '../services/UserService';
import '../css/images/App.css';

export class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <div className="post">
                <div className="user">
                        <div>Carina Wollendorfer</div>
                </div>
            <div className="created-at">
                        20.7.2020
                    </div>
            <div key={this.props.key}>{this.props.post.description}</div>            
            <div className="actions">
              <div>
                Like
              </div>
              <div>
                Comment
              </div>
            </div>
        </div>




     /*   
        <div className="test">
            <div key={this.props.key}>{this.props.post.description}</div>
        </div>*/
        );
    }
}