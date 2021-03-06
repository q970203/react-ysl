import React from "react";

import styles from './cart.module.css'
import logo from '../../assets/img/logo_2x.png'
import Breadcrumb from '../../components/breadcrumb'
import CartGoods from '../../components/cart-goods'
import Button from "../../components/button";
import {Link} from "react-router-dom";
import {number} from "prop-types";

export default class Cart extends React.Component{
 state={
   checkAll:true,
   hasChecked:[],
   list:[],
   total:0
 }
  constructor() {
   super();
   this.axios({
     url:"/api/goods/cart"
   }).then(
     res=>{
       if(res.data.err===0){
         res.data.data.map(item=>item.price-0)
         this.setState({
           list:res.data.data,
           hasChecked:res.data.data.filter(item=>item.checked)
         })
       } else {
         console.log(res.data.msg)
       }
     }
   )
 }

 static getDerivedStateFromProps(nextProps, nextState){
   let arr=[]
   nextState.hasChecked.map(item=>item.checked?arr.push(item.price*item.num):arr.push(0))
   return   {total:eval(arr.join('+'))}
 }

  delete=(_id,index)=>{
    console.log("data",_id)
    this.axios({
      url:`/api/addcart/${_id}`,
      method:"delete",
    }).then(
      res=>{
        console.log(res)
        if(res.data.err===0){
          this.state.list.splice(index,1)
          this.setState({
            list:this.state.list,
            hasChecked:this.state.hasChecked.filter(item=>item._id!==_id)
          })
          console.log('resss',this)
        }else {
          console.log(res.data.msg)
        }
      }
    )
  }

  change=(data,_id)=>{
    this.state.hasChecked.map(item=>{
      if (item._id==_id){
        return item.num=data
      }
    })
    this.setState({
      hasChecked:this.state.hasChecked
    })
  }

  getGoodsChecked=(data,index,item)=>{
    this.state.list[index].checked=data
    this.state.hasChecked=[]
    this.state.list.map(item=>item.checked && this.state.hasChecked.push(item))
    this.setState({
      list:this.state.list,
      hasChecked:this.state.hasChecked
    })
    if(this.state.hasChecked.length===this.state.list.length){
      this.setState({
        checkAll:true
      })
    }else {
      this.setState({
        checkAll:false
      })
    }

  }

  allChecked=()=>{
    this.setState({checkAll:!this.state.checkAll})
     if(!this.state.checkAll) {
       this.state.list.map(item=>item.checked=true)
       this.setState({
         list:this.state.list,
       })
     }else{
       this.state.list.map(item=>item.checked=false)
       this.setState({
         list:this.state.list,
       })
     }

    }

  render() {
   let {checkAll,list,total} = this.state
    return(
      <div>
        <Link to={'/home'} style={{ margin:"-1.41rem -0.3rem 0", display:"block",borderBottom:"1px solid #333"}}><img style={{width:"40%",margin:"0.3rem auto",display:"block"}} src={logo} alt=""/></Link>

        {list ?
        <div className={styles.cart}>


          <Breadcrumb style={{backgroundColor:"#fafafa", boxSizing:"border-box",fontSize:"14px", height:"1rem",padding:"0.2rem 0.3rem",margin:"0 -0.3rem"}} to={{pathname:"/home",text:"继续购物"}}/>
          <h2>购物袋（{list.length}）</h2>
          <div className={styles.checkedAll}>
            <span onClick={()=>{this.allChecked()}}>
              <span style={checkAll?{backgroundColor:"#333"}:{}}></span>
            </span>
            全选
          </div>
          <div>
            {
              list.map((item,index)=>(
                <CartGoods
                  change={(data)=>{this.change(data,item._id)}}
                  check={(data)=>{this.getGoodsChecked(data,index,item)}}
                  key={index}
                  checked={item.checked}
                  data={item}
                  handlerCkick={()=>{this.delete(item._id,index)}}
                />
              ))

            }
          </div>
          <div className={styles.sum}>
            <h2>订单总价</h2>
            <div>商品价格 <span>￥{total}</span> </div>
            <div>价格优惠 <span>￥{0}</span> </div>
            <div>运费 <span>￥{0}</span> </div>
          </div>
         <h2 style={{lineHeight:"1rem",backgroundColor:"#fff",fontWeight:700}}>总价 <span style={{float:"right"}} >￥{total}</span></h2>
          <div className={styles.settlement}>
            <span>总价：￥{total}</span>
            <Button type={"other"} style={{width:"30%",border:"1px solid #fff"}} clickHandler={()=>{this.props.history.push('/home')}}>继续购物</Button>
            <Button type={"other"} style={{width:"30%",border:"1px solid #999",background:"#999",marginLeft:"3px",marginRight:"3px"}}>立即结算</Button>

          </div>
        </div> : (<div
            style={{width:"80%",height:"2rem",border:"1px solid #333",margin:"1rem auto",fontSize:"20px",textAlign:"center",lineHeight:"1rem"}}
          >您的购物车为空 <br/>
          <a onClick={()=>this.props.history.push('/home')} style={{textDecoration:"underline"}}>
            继续购物
          </a>
        </div>)}
      </div>
    )
  }

}
