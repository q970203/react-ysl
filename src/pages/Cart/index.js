import React from "react";

import styles from './cart.module.css'
import logo from '../../assets/img/logo_2x.png'
import Breadcrumb from '../../components/breadcrumb'
import CartGoods from '../../components/cart-goods'
import Button from "../../components/button";
import {Link} from "react-router-dom";

export default class Cart extends React.Component{
 state={
   checkAll:true,
   hasChecked:[],
   list:[]
 }
  constructor() {
   super();
   this.axios({
     url:"/api/goods/cart"
   }).then(
     res=>{
       if(res.data.err===0){
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
            list:this.state.list
          })
          console.log('resss',this)
        }else {
          console.log(res.data.msg)
        }
      }
    )
  }

  getGoodsChecked=(data,index,item)=>{
   console.log(index,data,item)
    data?
      this.state.hasChecked.unshift(item):
      this.state.hasChecked.shift(item)
    if(this.state.hasChecked.length===this.state.list.length){
      this.setState({
        checkAll:true
      })
    }else {
      this.setState({
        checkAll:false
      })
    }
    this.setState({
      hasChecked:this.state.hasChecked
    })
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
         hasChecked:[]
       })
     }

    }

  render() {
   let {checkAll,list} = this.state
    return(
      <div>
        <Link to={'/home'} style={{ margin:"-1.41rem -0.3rem 0", display:"block",borderBottom:"1px solid #333"}}><img style={{width:"40%",margin:"0.3rem auto",display:"block"}} src={logo} alt=""/></Link>

        {list.length>0 ?
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
            <div>商品价格 <span>￥{0}</span> </div>
            <div>价格优惠 <span>￥{0}</span> </div>
            <div>运费 <span>￥{0}</span> </div>
          </div>
         <h2 style={{lineHeight:"1rem",backgroundColor:"#fff",fontWeight:700}}>总价 <span style={{float:"right"}} >￥{0}</span></h2>
          <div className={styles.settlement}>
            <span>总价：￥{0}</span>
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
