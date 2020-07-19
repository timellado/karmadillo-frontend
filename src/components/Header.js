"use strict";

import React from 'react';
import { Toolbar, Button, Avatar, FontIcon, Chip } from 'react-md';
import { withRouter } from 'react-router-dom'

import UserService from '../services/UserService';

import KebabMenu from './KebabMenu';
import logo from '../css/images/karmadilloIcon.png';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }
    }

    render() {
        return (
            <Toolbar
                colored
                nav={<Button onClick={() => this.props.history.push('/')}><img src={logo} alt="Logo" width={50} /></Button>}
                title={this.props.title}
                children={this.state.user ? [<Button  onClick={() => this.props.history.push('/')} flat secondary iconChildren="account_circle" style={{ marginLeft: "890px" }}>{this.state.user.username}</Button>
                ] : []}
                fixed={true}
                actions={<KebabMenu id="toolbar-colored-kebab-menu" />}>
            </Toolbar>
        );
    }
};

export default withRouter(Header);