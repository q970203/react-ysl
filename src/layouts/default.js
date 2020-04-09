import React from "react";
import Header from "./header/header";
import Footer from "./footer";

import {Switch,Route,Redirect} from 'react-router-dom'

import Home from '../pages/Home'
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import User from "../pages/User";
import Cart from "../pages/Cart";
import List from "../pages/List";
import Reg from "../pages/Reg";
import NoPage from "../pages/NoPage";

import pubsub from 'pubsub-js'
import Search from "../components/search";

export default class Default extends React.Component{
  state={
    bHeader:true,
    bFoot:true

  }
  constructor() {
    super();
  }
  static getDerivedStateFromProps(nextProps,nextState){
    console.log(nextProps)
    console.log(nextState)

    let path = nextProps.location.pathname;
    console.log(path)

    if(/home|detail|list|login|reg|user/.test(path)){
      return{
        bHeader:true,
    bFoot:true
      }
    }
    if(/cart/.test(path)){
      return{
        bHeader:false,
        bFoot:true
      }
    }
    // if(!//.test(path)){
    //   return{
    //     bHeader:false
    // bFoot:false
    //   }
    // }
  }
  render() {
    let {bHeader} = this.state
    return(
      <div>
        {bHeader && <Header/>}
        <Switch>
          <Route path={'/home'} component={Home}/>
          <Route path={'/cart'} component={Cart}/>
          <Route path={'/detail/:_id'} component={Detail}/>
          <Route path={'/list/:_type'} component={List}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/reg'} component={Reg}/>
          <Route path={'/user'} component={User}/>
          <Redirect exact from='/' to='/home' />
          <Route component={NoPage}/>

        </Switch>

        <Footer/>
      </div>
    )
  }
}