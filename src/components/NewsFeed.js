"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { Post } from './Post';
import Page from './Page'
import { Grid, Cell } from 'react-md';

const dataTableStyle = {
  'marginBottom': '36px'
};

export const NewsFeed = ({postData}) => (
    <Page>
      <Grid className="grid">
                {postData.map((post, i) => <Cell key={i} size={4}> <Post key={i} post={post} /> </Cell>)}
      </Grid>
    </Page>
);

