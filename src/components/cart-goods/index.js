import React from "react";

import {GoodsOptNum} from '../goods-opt'
import styles from './cartGoods.module.css'
import {Link} from "react-router-dom";

export default class CartGoods extends React.Component{
  state={
    checked:"",
    checkdeNum:1,
  }
constructor(props) {
  super(props);
    this.state.checked=props.checked
}

  static getDerivedStateFromProps(nextProps, nextState){
    return {checked:nextProps.checked}
  }
  changeNum=(data)=>{
      this.state.checkdeNum=data
      this.props.change(this.state.checkdeNum)
  }

  beCheck=()=>{
    this.setState({
      checked:!this.state.checked
    })
    this.props.check(!this.state.checked)

  }

  render() {
    let {checked} = this.state
    let {data,handlerCkick} = this.props
    return(
      <div className={styles.cartgoods} >
        {/*<input type="checkbox" checked={data.checked} onChange={(ev)=>{this.beCheck(ev)}}/>*/}
        <span style={checked?{backgroundColor:"#333"}:{}} onClick={this.beCheck}></span>
        <img src={this.baseUrl+data.img} alt=""/>
        <div>
          <p>{data.title}</p>
          <div className={styles.goodsopt}>
            <span style={{backgroundColor:data.optColor}}></span>
            {data.optText}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",position:"relative"}}>
            <GoodsOptNum style={{width:"50%"}} num={5} checked={data.num} changeNum={this.changeNum}/>
            <span style={{display:"block",position:"absolute",top:"50%",transform: "translateY(-50%)",right:0,fontSize:"14px",fontWeight:600}}>￥{data.price}</span>
          </div>
          <div>
            <a >修改</a> · <a>+心愿单</a> · <a onClick={handlerCkick}>删除</a>
          </div>
        </div>

      </div>
    )
  }
}