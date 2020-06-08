"use strict";

import React from 'react';
import { Toolbar, Button, Avatar } from 'react-md';
import { withRouter } from 'react-router-dom'

import KebabMenu from './KebabMenu';
import logo from '../css/images/karmadilloIcon.png';

console.log(logo);


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar
                colored
                nav={<Button onClick={() => this.props.history.push('/')}><img src={logo} alt="Logo" width={50} /></Button>}
                title={this.props.title}
                actions={<KebabMenu id="toolbar-colored-kebab-menu" />}>
            </Toolbar>
        );
    }
};

export default withRouter(Header);