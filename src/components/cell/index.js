import React from "react";
import './cell.css'
import {withRouter} from 'react-router-dom'
import propTypes from 'prop-types';

import Button from "../button";
class Cell extends React.Component{
  static defaultProps = {
    index: undefined,
    to: null,
    grayStar:false,
    style:null,
    tag:true
  };

  static propTypes = {
    index: propTypes.number,
    style:propTypes.object,
    // data: propTypes.shape({
    //   _id: propTypes.string,
    //   img:propTypes.string,
    //   title: propTypes.string,
    //   enTitle:propTypes.string,
    //   price:propTypes.oneOfType([propTypes.string, propTypes.number]),
    //   des: propTypes.string,
    //   tag:propTypes.string
    // }).isRequired,
    to: propTypes.shape({
      pathname: propTypes.string,
      apiname: propTypes.string,
    }),
    grayStar:propTypes.bool
  };

  to=(_id)=>{
    if (!this.props.to) return;
    let {history,to:{pathname,apiname}}=this.props;
    history.push({pathname:`${pathname}/${_id}`,search:`apiname=${apiname}`})
  };
  render() {
    let {index,data,children,grayStar,style,tag} = this.props;
    return(
      <div style={style} className={'cell'} onClick={()=>{this.to(data._id)}}>

        {(data.tag && tag) && <span className={'cell__tag'} >{data.tag}</span>}
        <div className={'cell__img'}>
          <img style={{width:"115px",height:"128.04px"}} src={this.baseUrl+ '/images/'+data.img} alt=""/>
        </div>
        <div className={'cell__opt'}>
          {data.optColor && data.optColor.map((item,index)=>(
            <span key={index} style={{backgroundColor:item}}></span>
          ))}
        </div>
        <h3 className={'cell__enTitle'}>{data.enTitle}</h3>
        <h3 className={'cell__title'}>{data.title}</h3>
        <p className={'cell__des'}>{data.des}</p>
        <div className={grayStar ? "cell__start--gray" :"cell__start--black"}></div>
        <div className={'cell__price'}>￥{data.price}</div>
        <Button> 立即购买</Button>
      </div>
    )
  }

}

export default withRouter(Cell)