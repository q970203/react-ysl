import React from "react";
import styles from './button.module.css'

import propTypes from 'prop-types'
export default class Button extends React.Component{
  static defaultProps={
    clickHandler:()=>{},
    type:null,
    style:{}
  }

  static propTypes={
    clickHandler:propTypes.func,
    type: propTypes.string,
    style: propTypes.object
  }
  render() {
  let {style,type,clickHandler,children} = this.props
    return(
        <button
          style={style}
          className={`${styles.button} ${!type?"iconfont icon-gouwudai":''}`}
          onClick={event => clickHandler(event)}
        >
          {children}
        </button>
    )
  }
}