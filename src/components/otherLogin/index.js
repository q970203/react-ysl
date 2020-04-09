import React from "react";

import styles from './otherLogin.module.css'
import './icon/iconfont.css'
// import '/at.alicdn.com/t/font_1688463_l9z0mben6sq.js'
// let IconFont = Icon.createFromIconfontCN({scriprtUrl:'//at.alicdn.com/t/font_1688463_l9z0mben6sq.js'})

export default class OtherLogin extends React.Component{
  render() {
    return(
      <div className={styles.other}>
        <h1 style={{ position:"relative",height:"1px",backgroundColor:"#dbdbdb"}}>
          <span style={{display:"block",fontSize:"12px",fontWeight:"normal", position:"absolute",padding:"0 12px",left:"42%",top:'-10px',backgroundColor:"#fff"}}>或</span>
        </h1>
        <p>使用合作网站账号登录</p>
        <div>
          <ul>
            <li>
              <span>
                <i className={'iconfont icon-qq-copy'} style={{color:'red'}}></i>
              </span>
              <p>QQ</p>
            </li>
            <li>
              <span>
                <i className={'iconfont icon---'} style={{color:'red'}}></i>
              </span>
              <p>新浪</p>
            </li>
            <li>
              <span>
                <i className={'iconfont icon--zhifubao'} style={{color:'red'}}></i>
              </span>
              <p>支付宝</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}