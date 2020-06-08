"use strict";

import React from 'react';
import { Card, Button, TextField, DatePicker } from 'react-md';
import { withRouter } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';


const style = { maxWidth: 500 };


class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var newdate = day + "/" + month + "/" + year;

        this.state = {
            username: '',
            password: '',
            email: '',
            birth: newdate
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeBirth = this.handleChangeBirth.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(value) {
        this.setState(Object.assign({}, this.state, { username: value }));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, { password: value }));
    }

    handleChangeEmail(value) {
        this.setState(Object.assign({}, this.state, { email: value }));
    }

    handleChangeBirth(value) {
        this.setState(Object.assign({}, this.state, { birth: value }));
    }

    handleSubmit(event) {
        event.preventDefault();

        let dateObj = new Date();
        let birth = this.state.birth.slice(-4);
        console.log(birth);
        if ( birth <= dateObj.getUTCFullYear() - 6) {
            console.log("Good date");
        } else {
            console.log("Bad date");
            throw "invalid birth day";
        }

        let user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            birth: this.state.birth
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Username"
                            id="UsernameField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                            errorText="Username is required" />
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required" />
                        <TextField
                            label="Email"
                            id="EmailField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.email}
                            onChange={this.handleChangeEmail}
                            errorText="Email is required" />
                        <DatePicker
                            style={{ marginBottom: "30px", marginRight: "250px" }}
                            id="BirthField"
                            label="Birth"
                            className="md-row"
                            displayMode="portrait"
                            required={true}
                            value={this.state.birth}
                            onChange={this.handleChangeBirth}
                            errorText="Birth date is required" />

                        <Button id="submit" type="submit"
                            disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' || this.state.email == undefined || this.state.email == '' ? true : false}
                            raised primary className="md-cell md-cell--2">Register</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
};

export default withRouter(UserSignup);