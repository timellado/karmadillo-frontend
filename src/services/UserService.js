"use strict";

import HttpService from './HttpService';

export default class UserService {

    constructor() {
    }

    static baseURL() {return 'http://localhost:3000/auth'; }

    static register(user, pass, email, birthDate) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, {
                username: user,
                password: pass,
                email: email,
                birth: birthDate
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
                username: user,
                password: pass
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout(){
        window.localStorage.removeItem('jwtToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id : JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username
        };
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }

    static getUser(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`http://localhost:3000/users/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving user');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}