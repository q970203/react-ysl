import React from "react";

import $ from 'jquery'
import Swipe from "./assets/swipe";

import propTypes from 'prop-types'
import {withRouter} from 'react-router-dom';

import './swiper.css'
class QSwiper extends React.Component{
  static propTypes={
    style:propTypes.object,
    data:propTypes.array.isRequired,
    to:propTypes.shape({//是否符合指定格式的对象
      pathname:propTypes.string.isRequired,
      apiname:propTypes.string.isRequired
    })
  }
state={
  data:[{_id:"1",banner:'/img/15838584827261659.jpg'},
    {_id:"2",banner:"/img/15838587315719084.jpg"},
    {_id:"3",banner:"/img/15838587315719084.jpg"},
    {_id:"4",banner:"/img/15838587315719084.jpg"}
  ]
}

  to=(_id)=>{
    if(!this.props.to) return;
    let {history,to:{pathname,apiname}} = this.props
    history.push({pathname:`${pathname}/${_id}`,search:`apiname=${apiname}`})
  }
constructor(props) {
  super(props);
  console.log("propsww", props)
  props.data.map(item=>{
    // console.log('cgbhn',item.includes('//upload/banner'))
    console.log(item)
    // if (item)
      // return item.banner===false && "/images/"+item
   // return (item.banner?item.banner.includes('//upload/banner'):item.includes('//upload/banner')) ? item : (item._id?"/images/"+item.banner:"/images/"+item)
   // if(item.indexOf('/upload/banner')==-1)  {
   //   return   item="/images/"+item
   // }
}
  )
}

  componentDidMount() {
    new Swipe($('.banner')[0],{
      auto:2000,
      continuous:true,
      stopPropation:false,
      callback:function (index,element){
        $('.banner ol').removeClass('active');
        $('.banner ol').eq(Math.floor(index+1/2)).addClass('active');
      }
    })

      }


  render() {
    let {style,data} = this.props;
    // let {data} = this.state

    console.log(data)
    return(
      <div className={'banner'} >
        <ul >
          {data.map((item,index)=>(
            <li key={item._id ? item._id : index} onClick={()=>this.to(item._id)}>
              <img  src={item._id?(this.baseUrl +'/'+item.banner):(this.baseUrl +'/'+item)} alt=""/>
            </li>
          ))}
        </ul>
        <ul className={"swiper__circle"}>
          {data.map((item,index)=>{
           return(<ol key={item._id ? item._id : index} className={index===0  ?'active': ""}></ol>)
          })}
        </ul>
      </div>

    )
  }
}
export default withRouter(QSwiper)