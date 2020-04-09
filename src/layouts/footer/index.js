import React from "react";
import './footer.css'
import './iconfont.css'
import logo from '../../assets/img/logo_2x.png'
export default class Footer extends React.Component{
  render() {
    return(
      <div className={'foot'}>
        <div className={'foot__top'}>
            <div className={'foot__top--top'}>
              <p>客户咨询热线：400-820-6362 </p>
              <p>（9:00-18:00）</p>
              <a className={'iconfont icon-zaixianzixun'}>在线咨询</a>
            </div>
          <h1>
            <a ><img src={logo} alt=""/></a>
          </h1>
          <div className={'foot__top--bottom'}>
            <span className={'iconfont icon-weibo'}></span>
            <span className={'iconfont icon-weixin'}></span>
            <span style={{fontSize:'12px'}}>请关注 <br/>YSL圣罗兰美妆 <br/>微信公众号 </span>
          </div>
        </div>
        <div className={'foot__bottom'}>
          <p> 中国工商  沪ICP备08100043号-28  </p>
          <p>沪公网安备 31010602001529号</p>
          <p> 欧莱雅中国有限公司  地址：上海市静安区南京西路1601号  </p>
          <a>Cookies政策</a> <a>使用条款</a> <a>隐私政策</a>
        </div>
      </div>
    )
  }
}