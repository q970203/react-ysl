import React from "react";
import './header.css'
import logo from '../../assets/img/logo_2x.png'
import './iconfont.css'
import {Link} from 'react-router-dom'
export default class Header extends React.Component{
  render() {
    return(
      <div className={"header"} >
        <div className="header__top">
          <a className={"iconfont icon-toggle"}></a>
          <Link to={'/user'} className={"iconfont icon-yonghu"}></Link>
          <Link to={'/home'} className="header__logo"><img src={logo} alt=""/></Link>
          <a className={"iconfont icon-sousuo"}></a>
          <Link to={"/cart"} className={"iconfont icon-gouwudai"}></Link>
        </div>
        <div className={"header__nav"}>
          <ul>
            <li><Link to={'/list/makeup'}>彩妆</Link> </li>
            <li><Link to={'/list/fragrance'}>香水</Link></li>
            <li><Link to={'/list/gifts'}>护肤</Link></li>
            <li><Link to={'/list/gifts'}>尊享礼盒</Link></li>
            <li><Link to={'/list/makeup'}>明星单品</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}