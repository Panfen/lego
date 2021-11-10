import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import Index from '../pages/Index';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Index} />
  </Router>,
  document.getElementById('root')
);
