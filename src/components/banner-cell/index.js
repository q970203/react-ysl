import React from "react";
import './bannerCell.css'
import {withRouter} from 'react-router-dom'
import propTypes from 'prop-types'
class BannerCell extends React.Component{
  static defaultProps={
    style:null,
    to:'',
    data:{},
    type:'default'
  }
  static propTypes={
    style:propTypes.object,
    to:propTypes.string,
    data:propTypes.shape({
      img:propTypes.string,
      title:propTypes.string,
      subTitle:propTypes.string,
      des:propTypes.string
    })
  }

  to=()=>{
    if (!this.props.to) return;
    let {history,to}=this.props;
    history.push({pathname:to})
  }
  renderEl(){
    let {style,data,type} = this.props
    let el=null;
    if(type==="default"){
      el=(
        <div className={'bannerCell'} style={style}>
          <div className={'bannerCell__img'} ><img onClick={this.to} src={"/img/"+data.img} alt=""/></div>
          <div className={'bannerCell__info'}>
            <h2 onClick={this.to}> {data.title}</h2>

            <h3>{data.subTitle}</h3>
            <p>{data.des}</p>
            <span onClick={this.to}>{">"}</span>
          </div>
        </div>
      )
    }else if(type==='up'){
          el=(<div className={'bannerCell__up'} style={style}>
            <div className={'bannerCell__up--img'} ><img onClick={this.to} src={"/img/"+data.img} alt=""/></div>
            <div className={'bannerCell__up--info'}>
              <h2 onClick={this.to}> {data.title}</h2>
              <p>{data.des}</p>
              <span onClick={this.to}>{">"}</span>
            </div>
          </div>)
        }
    return el
  }

  render() {
      let {style,data,type} = this.props

    // return (
    //   <div className={'bannerCell'} style={style}>
    //     <div className={'bannerCell__img'} ><img onClick={this.to} src={"/img/"+data.img} alt=""/></div>
    //     <div className={'bannerCell__info'}>
    //       <h2 onClick={this.to}> {data.title}</h2>
    //
    //       <h3>{data.subTitle}</h3>
    //       <p>{data.des}</p>
    //       <span onClick={this.to}>{">"}</span>
    //     </div>
    //   </div>)
    return this.renderEl()
  }
}

export default withRouter(BannerCell)