import React from "react";
import Header from "./header/header";
import Footer from "./footer";
import asyncComponent from '../plugins/asyncComponent'

import {Switch,Route,Redirect} from 'react-router-dom'
const Home = asyncComponent(()=>import("../pages/Home"))
// import Home from '../pages/Home'
// import Detail from "../pages/Detail";
const Detail = asyncComponent(()=>import("../pages/Detail"))

import Login from "../pages/Login";
import User from "../pages/User";
// import Cart from "../pages/Cart";
const Cart = asyncComponent(()=>import("../pages/Cart"))

// import List from "../pages/List";
const List = asyncComponent(()=>import("../pages/List"))

import Reg from "../pages/Reg";
import NoPage from "../pages/NoPage";

import pubsub from 'pubsub-js'
import Search from "../components/search";

import {observer,inject} from "mobx-react";

@inject('global')
@observer
class Default extends React.Component{
  state={
    // bHeader:true,
    // bFoot:true
  }
  constructor() {
    super();
  }
  static getDerivedStateFromProps(nextProps,nextState){

    let path = nextProps.location.pathname;
    let {updateHeader,updateFoot} = nextProps.global
    if(/home|detail|list|login|reg|user/.test(path)){
      updateHeader(true);
      updateFoot(true)
      // return{
      //
      //   bHeader:true,
      //   bFoot:true
      // }
    }
    if(/cart/.test(path)){
      updateHeader(false);
      updateFoot(true)
      // return{
      //   bHeader:false,
      //   bFoot:true
      // }
    }
    // if(!//.test(path)){
    //   return{
    //     bHeader:false
    // bFoot:false
    //   }
    // }
    return null
  }
  render() {
    let {bHeader} = this.props.global
    return(
      <div>
        {bHeader && <Header history={this.props.history}/>}
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

export default Default