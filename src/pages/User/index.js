import React from "react";
import styles from './user.module.css'
import Breadcrumb from "../../components/breadcrumb";
import Nav from '../../components/nav'
import {history} from 'react-router-dom'
export default class User extends React.Component{
  logout=()=>{
    window.localStorage.removeItem('user');
    this.props.history.push('/login')
  };
  render() {
    return(
      <div className={styles.user}>
        <Breadcrumb to={{pathname:"/user",text:"我的账户"}}/>
        <h2>欢迎
          <span>欢喜</span>
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