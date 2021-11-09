import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './App.css';

import Editor from '../pages/editor';
import preview from '../pages/preview';
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={Editor} />
      <Route path="/preview" component={preview} />
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);
