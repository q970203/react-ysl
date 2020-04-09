import React from "react";
import Banner from '../../components/banner'
import QSwiper from '../../components/swiper'
import Button from '../../components/button'
import {GoodsOpt,GoodsOptNum} from '../../components/goods-opt'
import styles from './detail.module.css'
import qs from 'qs'

export default class Detail extends React.Component{
  state={
    checkedServer:false,
    data:{
      // maxNum:5
    },
    cartgoods:{

    }

  }

  constructor(props) {
    super(props);
    let apiname = qs.parse(props.location.search,{ignoreQueryPrefix:true}).apiname;
    let _id = props.match.params._id
    this.axios({
      url:`/api/goods/${apiname}/${_id}`
    }).then(
      res=>{
        this.setState({
          data:res.data.data
        })
        console.log("fxxn",this.state.data)
      }
    )
  }

  renderOptColor=(optColor)=>{
    if(optColor){
      return(
        <ul>
          {
            optColor.map((item,index)=>(
              <li key={index} className={styles.active} style={{backgroundColor:item}}><a ></a></li>
            ))}

        </ul>
      )
    }else {
      return null
    }
  }

  renderOpt=(optText,optColor)=>{
    let arr=[]
    for(let i=0;i<optText.length;i++){
      if (optColor){
        arr.push({img:optColor[i],text:optText[i]})
      }else {
        arr.push({img:'',text:optText[i]})

      }
    }
  return  <GoodsOpt opt={arr} style={{width:'60%'}} ref={el=>this.goodsOpt=el}/>

  }

  renderPage=({title,price,banner,tag,des,info,optText,optColor,optImg,maxNum,detailImg,type,time})=>{
    let {checkedServer,data} = this.state
    return (
    <div className={styles.detail}>
      <Banner title={title}/>
      <div style={{position:"relative"}}>
        <QSwiper  data={optImg}/>
        <span className={styles["detail__swiper--tag"]}>{tag}</span>
      </div>
      <div className={styles['detail__goods--opt']}>
        <div>
          {this.renderOptColor(optColor)}
        </div>
        <div style={{width:"100%", display:"flex",justifyContent:"space-between"}}>
          {this.renderOpt(optText,optColor)}
          <GoodsOptNum ref={el=>this.goodsOptNum = el } num={maxNum} style={{width:'38%'}}/>

        </div>
        <div className={styles['product-service']}>
          <div>
            <span onClick={()=>{this.setState({checkedServer:!this.state.checkedServer})}}><i style={ checkedServer ? {backgroundColor:"#333333"}:{}}></i></span>
            <p>专属刻字</p>
          </div>
          <p>勾选后点击加入购物袋，即享专属定制刻字服务。</p>
          <p>刻字服务为80元/次，如果每笔订单满800元，可尊享免费刻字服务。刻字工艺需耗时5工作日，最终配送时间会相应延长</p>
          <span>￥{price}</span>
          <Button style={{width:"60%",fontSize:"12px"}} clickHandler={this.addCart}> 加入购物袋</Button>
        </div>
      </div>
      <div className={styles.detail__artical}>
        <ul>
          <li>产品详情</li>
        </ul>
        <p dangerouslySetInnerHTML={{__html:info}}>
        </p>
      </div>
      <div className={styles.detail__detailImg}>
        {detailImg.map((item,index)=>(
          <img key = {index} src={this.baseUrl+'/'+item || this.baseUrl+'/images/'+item} alt=""/>

        ))}
      </div>
      <div className={styles.detail__addCart}>
        <Button style={{width:"100%",height:'0.8rem',fontSize:"16px"}} type={'other'} clickHandler={this.addCart}> ￥{price} - 加入购物车</Button>
      </div>
    </div>
  )}

  addCart=()=>{
    let {title,price,optImg} = this.state.data
    console.log ("vv", {
      title:title,
      price:price,
      img:optImg[0],
      num:this.goodsOptNum.state.checked,
      optColor:this.goodsOpt.state.checked.img,
      optText:this.goodsOpt.state.checked.text
    })
    this.axios({
      url:('/api/addcart'),
      method:"post",
      data:{
        title:title,
        price:price,
        img:optImg[0],
        num:this.goodsOptNum.state.checked,
        optColor:this.goodsOpt.state.checked.img,
        optText:this.goodsOpt.state.checked.text,

      }
    }).then(
      res=>{
        if(res.data.err===0){
          console.log(res.data.msg)
        }else {
          console.log(res.data.msg)
        }
      }
    )
  }

  render() {
    // let {checkedServer,data}=this.state
    if(this.state.data.title){
      return this.renderPage(this.state.data)
    }else {
      return null
    }
  }
}