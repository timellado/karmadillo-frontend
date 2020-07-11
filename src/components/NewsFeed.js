"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { Post } from './Post';
import Page from './Page'
import { Grid, Cell } from 'react-md';
import UserService from '../services/UserService';

const dataTableStyle = {
  'marginBottom': '36px'
};

export const NewsFeed = ({postData, currentUser}) => (

    <Page>
      <Grid className="grid">
        
     
        {postData.filter(p => p.activity.user.localeCompare(currentUser.id)).map((post, i) => <Cell key={i} size={4}> <Post key={i} post={post} /> </Cell>)}
      </Grid>
    </Page>
);
