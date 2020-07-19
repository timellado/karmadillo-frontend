"use strict";

import HttpService from './HttpService';

export default class CommentService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:3000/comments' }

    static getComments(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getCommentFromPost(PostId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${CommentService.baseURL()}/${PostId}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving Comment');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteComment(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${CommentService.baseURL()}/${id}`, function(data) {
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

    static updateComment(comment) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${comment._id}`, comment, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createComment(comment) {
        comment.id = Math.floor((Math.random() * 100000000) + 1).toString();
        
        return new Promise((resolve, reject) => {
            HttpService.post(CommentService.baseURL(), comment, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}