import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,HashRouter} from 'react-router-dom';
//引入字体、基础样式
import './assets/css/index.css'
import './utils/font'
import './plugins/axios'
import Default from "./layouts/default";
import qs from 'qs'
import {BaseUrl} from './server'
React.baseUrl = BaseUrl;
React.Component.prototype.baseUrl=BaseUrl;

// ReactDOM.render(
//       <Router>
//         <Route component={Default}/>
//       </Router>,
//   document.getElementById('root')
// );

//引入mobx配置
import store from './store'
import {Provider} from "mobx-react";

//强刷抓取本地，同步mobx
let local=window.localStorage.getItem('user');
if (local) store.user.user = qs.parse(local);



ReactDOM.render(
  <Provider store={store} {...store}>
    <HashRouter>
      <Route component={Default}/>
    </HashRouter>
  </Provider>
      ,
  document.getElementById('root')
);

