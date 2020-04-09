import React from "react";

import styles from './nav.module.css'
import {Link, withRouter} from 'react-router-dom'

 class Nav extends React.Component{
   state={
     path:'/user'
   }
  render() {
    let {text,style,to} = this.props
    let {path} = this.state


    return(
      <div className={styles.nav} style={style}>
        <Link to={path+to}>
          {text}
          <span>{">"} </span>
        </Link>
      </div>
    )
  }
}
export default withRouter(Nav)