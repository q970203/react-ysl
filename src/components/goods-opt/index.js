import React from "react";
import styles from './goods-opt.module.css'
import './icon/iconfont.css'
import {array} from "prop-types";
import propTypes from 'prop-types'
 class GoodsOpt extends React.Component{
  state={
    arrow:false,
    optShow:false,
    checked:{}
  }
  static defultProps={
    opt:[],
  }
  static propTypes={
    opt:propTypes.arrayOf(propTypes.shape(
      {img:propTypes.string,
      text:propTypes.string}
    )
    )
  }
  chooseOpt=()=>{
    this.setState({
      arrow:!this.state.arrow,
      optShow:!this.state.optShow
    })
  }
  changeChecked=(item)=>{
    this.setState({
      checked:item,
      arrow:!this.state.arrow,
      optShow:!this.state.optShow
    })
}
  componentDidMount() {
    this.setState({
      checked:this.props.opt[0]
    })
}

  render() {
    let {arrow,optShow,checked} = this.state
    let {style,opt} = this.props
    return(
      <div className={styles.goodsopt__box} style={style}>
        <div className={`${styles.goodsopt} ${styles.clear}` } onClick={this.chooseOpt}>
          <span className={styles.goodsopt__color} style={{backgroundColor:checked.img}}></span>
          <span className={styles.goodsopt__text}>{checked.text}</span>
          <span className={`${styles.goodsopt__arrow} iconfont ${!arrow? 'icon-arrow-down' :'icon-down2'}`}></span>
        </div>
        <div className={styles.goodsopt__opt} style={!optShow ?{display:"none"}:{display:"block"}}>
          {opt.map((item,index)=>(
            <a key={index} onClick={()=>{this.changeChecked(item)}}>
              <span className={styles.goodsopt__color} style={{backgroundColor:item.img}}></span>
              <span className={styles.goodsopt__text}>{item.text}</span>
            </a>
          ))}
        </div>
      </div>
    )
  }
}

class GoodsOptNum extends React.Component{
  state={
    arrow:false,
    optShow:false,
    arr:[],
    checked:1
  }
  // static defultProps={
  //   num:1
  // }
  chooseOpt=()=>{
    this.setState({
      arrow:!this.state.arrow,
      optShow:!this.state.optShow
    })
  }
  changeChecked=(item)=>{
    this.setState({
      checked:item,
      arrow:!this.state.arrow,
      optShow:!this.state.optShow
    })
    this.props.changeNum(item)
  }
  componentDidMount() {
    for(let i=1;i<=this.props.num;i++){
      this.state.arr.push(i)
    }
    this.setState({
      checked:this.props.checked || 1,
      arr:this.state.arr
    })
  }

  render() {
    let {arrow,optShow,checked,opt,arr} = this.state
    let {num,style} = this.props
    return(
      <div className={styles.goodsopt__box} style={style} >
        <div className={`${styles.goodsopt} ${styles.clear}` } onClick={this.chooseOpt}>
          <span className={styles.goodsopt__text}>{checked}</span>
          <span className={`${styles.goodsopt__arrow} iconfont ${!arrow? 'icon-arrow-down' :'icon-down2'}`}></span>
        </div>
        <div className={styles.goodsopt__opt} style={!optShow ?{display:"none"}:{display:"block"}}>
          {arr.map((item,index)=>(
            <a key={index} onClick={()=>{this.changeChecked(item)}}>
              <span className={styles.goodsopt__text}>{item}</span>
            </a>
          ))}
        </div>
      </div>
    )
  }
}
export  {GoodsOpt,GoodsOptNum}