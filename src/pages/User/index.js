import React from "react";
import styles from './user.module.css'
import Breadcrumb from "../../components/breadcrumb";
import Nav from '../../components/nav'
import {history} from 'react-router-dom'

import qs from 'qs'

import {inject,observer} from "mobx-react";

@inject("user")
@observer
class User extends React.Component{
  // state={user:null}
  constructor() {
    super();

    // let user=qs.parse(window.localStorage.getItem('user')).data
    // this.state.user=user
  }
  logout=()=>{
    this.props.user.logout()
    window.localStorage.removeItem('user');
    this.props.history.push('/login')
  };
  render() {
    // let {user} = this.state
    let {user} = this.props.user
    return(
      <div className={styles.user}>
        <Breadcrumb to={{pathname:"/user",text:"我的账户"}}/>
        <h2>欢迎
          <span>{user?user.data.username:"用户名"}</span>
          <a onClick={this.logout}>退出</a>
        </h2>
        <div className={styles.user__nav}>
          <Nav text={'我的订单'}  to={'/orderList'}/>
          <Nav text={'个人信息'} to={"/profile"}/>
          <Nav text={'我的心愿单'} to={"/favorite"}/>
          <Nav text={'我的地址薄'} to={"/addressList"}/>
          <Nav text={'我的优惠券'} to={"/showAllCoupons"} style={{borderBottom:"none"}}/>

        </div>
      </div>
    )
  }
}

export default User