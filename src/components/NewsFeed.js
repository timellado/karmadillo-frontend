"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { Post } from './Post';
import Page from './Page'

const dataTableStyle = {
  'marginBottom': '36px'
};

export const NewsFeed = ({data}) => (
    <Page>
                {data.map((post, i) => <Post key={i} post={post} />)}
    </Page>
);

