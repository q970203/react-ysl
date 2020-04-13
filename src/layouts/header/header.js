import React from "react";
import './header.css'
import logo from '../../assets/img/logo_2x.png'
import './iconfont.css'
import {Link} from 'react-router-dom'
import Search from "../../components/search";
import {inject,observer} from "mobx-react";

@inject('goods')
@observer
 class Header extends React.Component{
  state={
    show:false
  }
  render() {
    let {show}=this.state
    let {update} = this.props.goods
    return(
      <div className={"header"} >
        <div className="header__top">
          <a className={"iconfont icon-toggle"}></a>
          <Link to={'/user'} className={"iconfont icon-yonghu"}></Link>
          <Link to={'/home'} className="header__logo"><img src={logo} alt=""/></Link>
          <a className={"iconfont icon-sousuo"} onClick={()=>{this.setState({show:!this.state.show})}}></a>
          <Link to={"/cart"} className={"iconfont icon-gouwudai"}></Link>
        </div>
        <div className={"header__nav"}>
          <ul>
            <li><a onClick={()=>{update({collectionName:"makeup",proName:'list'});this.props.history.push("/list/makeup")}}>彩妆</a></li>
            <li><a onClick={()=>{update({collectionName:"fragrance",proName:'list'});this.props.history.push("/list/fragrance")}}>香水</a></li>
            <li><a onClick={()=>{update({collectionName:"gifts",proName:'list'});this.props.history.push("/list/gifts")}}>护肤</a></li>
            <li><a onClick={()=>{update({collectionName:"fragrance",proName:'list'});this.props.history.push("/list/fragrance")}}>尊享礼盒</a></li>
            <li><a onClick={()=>{update({collectionName:"makeup",proName:'list'});this.props.history.push("/list/makeup")}}>明星单品</a></li>




            {/*<li><Link to={'/list/makeup'}>彩妆</Link> </li>*/}
            {/*<li><Link to={'/list/fragrance'}>香水</Link></li>*/}
            {/*<li><Link to={'/list/gifts'}>护肤</Link></li>*/}
            {/*<li><Link to={'/list/gifts'}>尊享礼盒</Link></li>*/}
            {/*<li><Link to={'/list/makeup'}>明星单品</Link></li>*/}
          </ul>
        </div>
        <Search style={!show?{position:"fixed",top:"0.855rem",display:"none"}:{position:"fixed",top:"0.855rem",display:"block"}} history={this.props.history}/>
      </div>
    )
  }
}
export default Header