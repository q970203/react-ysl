import React from 'react';

import {BrowserRouter as Router,HashRouter} from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';
import pubsub from 'pubsub-js'
// 添加一个请求的拦截
axios.interceptors.request.use((config) => {
  //1抓取本地token，携带在请求头里
  let user = window.localStorage.getItem('user');
  user = user ? qs.parse(user) : '';
  config.headers={'token': user.token};
  //显示loading...
  // pubsub.publish('UPDATE_LOADING',true)
  return config;//2返回请求
}, function(error) {
  // 请求错误时做点事
  return Promise.reject(error);
});
//添加一个响应拦截
axios.interceptors.response.use(function(response) {
  // pubsub.publish('UPDATE_LOADING',false)
  // let router=new Router();//Router 是BroswerRouter别名，也是一个类，实例化
 let router = new HashRouter()
  //token过期: 返回值2,当前路由不是login时跳转
  if (response.data.err === 2 && !router.history.location.pathname.includes('/login')) {

    // window.location.href=window.location.origin+'/login?path='+router.history.location.pathname

    router.history.push({  //hash 模式可以，history模式有问题
      pathname: '/login',
      search: "path="+router.history.location.pathname
    })

  }
  return response;

}, function(error) {

  return Promise.reject(error);
});

React.axios = axios;//axios绑到对象包上  React.axios
React.Component.prototype.axios = axios; // axios绑定到Component类的原型   组件|this.axios
window.axios = axios;  //×   希望全局使用window.axios , 使用webpack 来配置
export default axios;