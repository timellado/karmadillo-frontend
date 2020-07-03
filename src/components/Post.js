"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';

import { SimpleLink } from './SimpleLink';

import UserService from '../services/UserService';


export class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div key={this.props.key}>{this.props.post.description}</div>
        );
    }
}