"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, Media, MediaOverlay, Grid, GridList, Cell, Button, FontIcon } from 'react-md';

import Page from './Page';

import UserService from '../services/UserService';

import moment from 'moment';

const style = { maxWidth: 1200 };

export class PostDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                            <Cell align={"bottom"} size={5}>Created by: {}</Cell>
                        </GridList>
                        
                    </Grid>

                    <CardTitle title={this.props.post.activity.name} subtitle={this.props.post.activity.category} />

                    <CardText>
                        <p>
                            {this.props.post.activity.name}
                        </p>
                        <p>
                            {this.props.post.description}
                        </p>
                    </CardText>
                </Card>
            </Page>
        );
    }
}