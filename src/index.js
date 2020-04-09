import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

//引入字体、基础样式
import './assets/css/index.css'
import './utils/font'
import './plugins/axios'
import Default from "./layouts/default";

import {BaseUrl} from './server'
React.baseUrl = BaseUrl;
React.Component.prototype.baseUrl=BaseUrl;

ReactDOM.render(
      <Router>
        <Route component={Default}/>
      </Router>,
  document.getElementById('root')
);

