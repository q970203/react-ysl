import React from "react";

import './breadcrumb.css'
import {Link} from "react-router-dom";

class Breadcrumb extends React.Component{
  render() {
    let {to:{pathname,text},style}=this.props
    return(
      <div style={style}>
        <ul style={{height:"0.5rem"}}>
          <li style={{float:"left"}}>
            <Link style={{lineHeight:"0.5rem"}} to={'/home'}>首页 </Link>
          </li>
          <li >
            <Link style={{lineHeight:"0.5rem"}} to={pathname}>{` >${text}`}</Link>
          </li>
        </ul>
      </div>
    )
  }
}
export default Breadcrumb;