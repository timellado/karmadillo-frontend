"use strict";

import React from 'react';
import { Card, Button, FontIcon, TextField } from 'react-md';
import { withRouter } from 'react-router-dom'

import { AlertMessage } from './AlertMessage';
import Page from './Page';
import UserService from '../services/UserService';
import Cloudinary from './Cloudinary';


class ActivityForm extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
                name : '',
                category : '', 
                description : '',
                user: UserService.isAuthenticated() ? UserService.getCurrentUser().id : undefined,
                checked: false, 
                image: ''
            };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
    }

    handleChangeName(value) {
        this.setState(Object.assign({}, this.state, {name: value}));
    }

    handleChangeCategory(value) {
        this.setState(Object.assign({}, this.state, {category: value}));
    }

    handleSubmit(event) {
        event.preventDefault();
        let activity = {};
        let post = {};
        activity.name = this.state.name;
        activity.category = this.state.category;
        activity.user =this.state.user;
        if(!this.state.checked){
            this.props.onSubmit(activity);
        } else {
            post.description = this.state.description;
            post.activity = 0;
            post.postPic = this.state.image;
            this.props.onSubmit(activity, post);
        }
        
    }

    saveImage(image)
    {
        this.state.image = image;
    }

    handleChange() {
        this.setState({
            checked: !this.state.checked
        });

    }

    handleChangeDescription(value) {
        this.setState(Object.assign({}, this.state, {description: value}));
    }
    
    render() {
        return (

            <Page>
                <div className="activity">
                    <div className="headline">New Activity</div>
                        <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        
                            <TextField
                                label="Activity Name *"
                                id="NameField"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.name}
                                onChange={this.handleChangeName}
                                errorText=""/>
                            <TextField
                                label="Category *"
                                id="CategoryField"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.category}
                                onChange={this.handleChangeCategory}
                                errorText=""/>   
                            
                            
                            <div style={{ width: "100%" }}>
                                <input type="checkbox" checked={ this.state.checked } onChange={ this.handleChange }></input>
                                <label>I want to post this activity so my followers can see it</label>
                            </div>
                            
                            {this.state.checked === false &&
                            <div className="buttons">
                                <Button id="submit" type="submit"
                                        disabled={this.state.name == undefined || this.state.name == '' || this.state.category == undefined || this.state.category == ''}
                                        raised primary className="md-cell md-cell--2">Save
                                </Button>
                                <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                                <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                            </div>
                            }

                            {this.state.checked === true &&
                                <div>
                                    <TextField
                                    label="Description"
                                    id="DescriptionField"
                                    type="text"
                                    className="md-row"
                                    value={this.state.description}
                                    onChange={this.handleChangeDescription}
                                    errorText=""/>

                                <Cloudinary saveImage={(image) => this.saveImage(image)}></Cloudinary>

                                <Button id="submit" type="submit"
                                        disabled={this.state.name == undefined || this.state.name == '' || this.state.category == undefined || this.state.category == ''}
                                        raised primary className="md-cell md-cell--2">Save
                                </Button>
                                <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                                <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                       

                                </div>
                            }
                              

                        </form>
                </div>
            </Page>
        );
    }
}

export default withRouter(ActivityForm);