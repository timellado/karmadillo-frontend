"use strict";

import HttpService from './HttpService';

export default class PostService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:3000/posts' }

    static getPosts(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getPost(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${PostService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving post');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deletePost(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${PostService.baseURL()}/${id}`, function(data) {
                if(data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updatePost(post) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${post._id}`, post, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

}