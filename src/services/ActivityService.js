"use strict";

import HttpService from './HttpService';

export default class ActivityService {

    constructor(){
    }

    static baseURL() {return 'http://localhost:3000/activities' }

    static getActivities(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getActivity(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ActivityService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving activity');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteActivity(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ActivityService.baseURL()}/${id}`, function(data) {
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

    static updateActivity(activity) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${activity._id}`, activity, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createActivity(activity) {
        activity.id = Math.floor((Math.random() * 100000000) + 1).toString();
        return new Promise((resolve, reject) => {
            HttpService.post(ActivityService.baseURL(), activity, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

}