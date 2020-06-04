"use strict";

import React from 'react';

import MovieForm from './../components/MovieForm';

import MovieService from '../services/MovieService';


export class MovieFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                movie: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.movie != undefined) {
            this.setState({
                loading: false,
                movie: this.props.location.state.movie,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            MovieService.getMovie(id).then((data) => {
                this.setState({
                    movie: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    async updateMovie(movie) {
        if(this.state.movie == undefined) {
            try {
                let ret = await MovieService.createMovie(movie);
                this.props.history.push('/');
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            }
        } else {
            try {
                let ret = await MovieService.updateMovie(movie);
                this.props.history.goBack();
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<MovieForm movie={this.state.movie} onSubmit={(movie) => this.updateMovie(movie)} error={this.state.error} />);
    }
}
