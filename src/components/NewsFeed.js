"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { Post } from './Post';
import Page from './Page'
import { Grid, Cell } from 'react-md';
import SearchField from 'react-search-field';

const dataTableStyle = {
  'marginBottom': '36px'
};

export const NewsFeed = ({ postData, currentUser }) => (
  <Page className="">
    <SearchField
    placeholder='Search posts'
  />
    <Grid>
      {postData.filter(p => p.activity.user.localeCompare(currentUser.id)).map((post, i) => <Cell key={i} size={12}> <Post key={i} post={post} /> </Cell>)}
    </Grid>
  </Page>
);
