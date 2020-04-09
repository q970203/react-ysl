import React from "react";
import propTypes from 'prop-types'
export default class Banner extends React.Component{
  static defaultProps={
    title:"标题"
  }
  static propTypes={
    title: propTypes.string.isRequired
  }
  render() {
    let {title} = this.props
    return(
      <h2 style={{fontSize:'20px',fontWeight:700,textAlign:"center",lineHeight:'1rem'}}>{title}</h2>
    )
  }

}