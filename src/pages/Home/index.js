import React from "react";
import QSwiper from "../../components/swiper";
import Banner from "../../components/banner";
import Cell from "../../components/cell";
import BannerCell from '../../components/banner-cell'
import Search from '../../components/search'
import './home.css'
import {NavLink,withRouter} from "react-router-dom";

export default class Home extends React.Component{

  state={
    currentIndex:0,
    currentApiname:"",
    banner:[],
    // makeup:[],
    // gifts:[],
    // fragrance:[],
    foundCZ:[]
    // foundCZ:[
    //   {
    //     _id:'1',
    //     tag:"热门",
    //     enTitle:"fxhhgfg",
    //     title:"圣罗兰",
    //     price:334,
    //     des:'的住房租 的v',
    //     img:"15446070755335219_238X265.jpg",
    //     opt:['#9d2430','#8e2d2d','#88332e','#b55358','#9d2430','#8e2d2d','#88332e','#b55358']
    //   },
    //   {
    //     _id:'2',
    //     enTitle:"fxhhgfg",
    //     title:"圣cvv罗兰",
    //     price:334,
    //     des:'的住房租 的v',
    //     img:"15446070755335219_238X265.jpg",
    //     opt:['#9d2430','#8e2d2d','#88332e','#b55358','#9d2430','#8e2d2d','#88332e','#b55358']
    //   },
    //   {
    //     _id:'3',
    //     enTitle:"fxhhgfg",
    //     title:"圣罗兰jj",
    //     price:334,
    //     des:'的住房租 的v',
    //     img:"15446070755335219_238X265.jpg",
    //     opt:['#9d2430','#8e2d2d','#88332e','#b55358','#9d2430','#8e2d2d','#88332e','#b55358']
    //   },
    //   {
    //     _id:'4',
    //     enTitle:"fxhhgfg",
    //     title:"圣bb罗兰jj",
    //     price:334,
    //     des:'的住房租 的v',
    //     img:"15446070755335219_238X265.jpg",
    //     opt:['#9d2430','#8e2d2d','#88332e','#b55358','#9d2430','#8e2d2d','#88332e','#b55358']
    //   },
    //   {
    //     _id:'35',
    //     enTitle:"fxhhgfg",
    //     title:"圣罗兰jj",
    //     price:3334,
    //     des:'的住房租 的v',
    //     img:"15446070755335219_238X265.jpg",
    //     opt:['#9d2430','#8e2d2d','#88332e','#b55358','#9d2430','#8e2d2d','#88332e','#b55358']
    //   },
    //   {
    //     _id:'6',
    //     enTitle:"fxhhgfg",
    //     title:"圣罗兰jj",
    //     price:3734,
    //     des:'的住房租 的v',
    //     img:"15446070755335219_238X265.jpg",
    //     opt:['#9d2430','#8e2d2d','#88332e','#b55358','#9d2430','#8e2d2d','#88332e','#b55358']
    //   }
    // ]
  }

  componentDidMount() {
    //读取数据
    this.axios.all([
      this.axios({url:"/api/goods/banner"}),
      this.axios({url:"/api/goods/makeup"})
    ]).then(this.axios.spread((banner,makeup)=>{
      console.log("goods",makeup)
      this.setState({
        banner:banner.data.data,
        foundCZ:makeup.data.data,
        currentApiname:'makeup'
        // fragrance:goods.data.data.fragrance,
        // gifts:goods.data.data.gifts,
      })
    }))
  }

  renderFoundCircle=()=>{
    let foundCircle=Math.ceil(this.state.foundCZ.length/2);
    let arr = [];
    for(let i=0;i<foundCircle;i++){
      arr.push(<span key={i}></span>)
    }
    arr.map(item=>(
      {item}
    ))
    return arr
  }
  prev=()=>{
    this.setState({currentIndex:this.state.currentIndex-1})
    document.getElementsByClassName('home__div--next')[0].style.display="block"
    if(this.state.currentIndex+1===Math.ceil(this.state.foundCZ.length/2)){
      document.getElementsByClassName('home__div--next')[0].style.display="block"
    }
    if(this.state.currentIndex-1===0){
      document.getElementsByClassName('home__div--prev')[0].style.display="none"
    }
  }

  next=()=>{
    this.setState({currentIndex:this.state.currentIndex+1})
    document.getElementsByClassName('home__div--prev')[0].style.display="block"
    if(this.state.currentIndex+2===Math.ceil(this.state.foundCZ.length/2)){
      this.setState({
        currentIndex:this.state.currentIndex+2
      })
      document.getElementsByClassName('home__div--next')[0].style.display="none"
    }
    if(this.state.currentIndex-2===0){
      document.getElementsByClassName('home__div--prev')[0].style.display="none"
    }
  }

  toFound=(text)=>{
    this.axios({
      url:`/api/goods/${text}`
    }).then(
      res=>{
        this.setState({
          foundCZ:res.data.data,
          currentApiname:text
        })
      }
    )
  }
  render() {
    let  {foundCZ,currentIndex,banner,currentApiname} = this.state;
    return(
      <div>
        {/*轮播图*/}
      {banner.length>0 && (<QSwiper
          data={banner}
          to={{pathname:"/detail",apiname:'banner'}}
        />)}
{/*        // data={[{_id:"1",banner:'/img/15838584827261659.jpg'},*/}
{/*        //   {_id:"2",banner:"/img/15838587315719084.jpg"},*/}
{/*        //   {_id:"3",banner:"/img/15838587315719084.jpg"},*/}
{/*        //   {_id:"4",banner:"/img/15838587315719084.jpg"}*/}
{/*        // ]}  to={{pathname:"/detail",apiname:"banner"}}*/}
{/*// />*/}
        {/*明星产品*/}
        <div style={{marginBottom:"0.5rem"}}>
          <Banner title={'明星产品'}/>
          <nav className={"home__nav--nav"}>
            <ul >
              <li onClick={()=>{this.toFound("makeup")}}> 彩妆</li>
              <li onClick={()=>{this.toFound("fragrance")}}> 香水</li>
              <li onClick={()=>{this.toFound("gifts")}} > 限定礼盒</li>
            </ul>
          </nav>
          {foundCZ.length>0 && (<div className={"home__div--found"}>
            <span
              className={"home__div--prev"}
              onClick={this.prev}
            >
              {"<"}
            </span>
            <span
              className={"home__div--next"}
              onClick={this.next}
            >
              {">"}
            </span>

            <Cell
              tag={false}
              key={foundCZ[currentIndex]._id}
              data={foundCZ[currentIndex]}
              to={{pathname:'/detail',apiname:currentApiname}}
            />
            <Cell
              tag={false}
              key={foundCZ[currentIndex+1]._id}
              data={foundCZ[currentIndex+1]}
              to={{pathname:'/detail',apiname:currentApiname}}
            />

          </div>)}

            {/*<div className={'home__found--circle'}>*/}
            {/*  {foundCZ.length>2 && this.renderFoundCircle() }*/}
            {/*</div>*/}
        </div>
        {/*搜索发现*/}
        <div style={{backgroundColor:"#f2f2f2",padding:"0 23px 20px"}}>
          {/*<div></div>*/}
          <Banner title={'搜索发现'}/>
          <BannerCell
            style={{marginBottom:"15px"}}
            to={'/list/makeup'}
            data={
              {title:"彩妆",
              img:"1586018689337606.jpg",
              des:"晶透闪耀 等你来啵"}
            }
          />
          <BannerCell
            style={{marginBottom:"15px"}}
            to={'/list/gifts'}
            data={
              {title:"礼盒",
                img:"15834699528675469.jpg",
                des:"限定星品，光芒瞩目"}
            }
          />
          <BannerCell
            style={{marginBottom:"15px"}}
            to={'/list/fragrance'}
            data={
              {title:"香水",
                img:"15786622523523076.jpg",
                des:"全新圣罗兰女士香水，性感冷艳，刚柔并济"}
            }
          />
          肆意如我
        </div>
        {/*liber*/}
        <div className={'home__liber'}>
          <div><img src="/img/15831313153603541.jpg" alt=""/></div>
          <div>
            <p>LIBRE</p>
            <p>全新圣罗兰女士香水</p>
            <p>馥奇花香 肆意如我</p>
          </div>
        </div>
        {/*//私人订制*/}
        <div style={{paddingBottom:'20px', backgroundColor:"#f2f2f2",padding:"0 23px 20px"}}>
          <Banner title={'私人定制服务'}/>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <BannerCell
              style={{marginBottom:"15px"}}
              type={"up"}
              to={'/list/makeup'}
              data={
                {title:"MAKE IT YOURS 定制专属你的YSL",
                  img:"15834158906356071.jpg",
                  des:"四步定制：线上挑选尊享限定礼盒-刻字礼遇-定制专属卡片-选择高定包装"}
              }
            />
            <BannerCell
              style={{marginBottom:"15px"}}
              type={"up"}
              to={'/list/makeup'}
              data={
                {title:"ENGRAVING  尊享刻字礼遇",
                  img:"15838561836408288.jpg",
                  des:"镌刻YSL明星口红/香水/气垫，留下你的专属印记，表达你的爱意专属卡片-选择高定包装"}
              }
            />
          </div>

        </div>
      {/*  寻找你的彩妆灵感*/}
        <div style={{backgroundColor:"#f2f2f2",padding:"0 23px 20px"}}>
          {/*<div></div>*/}
          <Banner title={'寻找你的彩妆灵感'}/>
          <BannerCell
            style={{marginBottom:"15px"}}
            to={'/list/makeup'}
            data={
              {subTitle:"潮 流 杂 志",
                img:"15849708383321674.jpg",
                des:"高定闪片 耀世登场"}
            }
          />
          <BannerCell
            style={{marginBottom:"15px"}}
            to={'/list/gifts'}
            data={
              {subTitle:"潮 流 杂 志",
                img:"15845276581396642.jpg",
                des:"不羁色 红出界复性不能VB规范性报复性办公费根本承诺花姑娘"}
            }
          />
          <BannerCell
            style={{marginBottom:"15px"}}
            to={'/list/fragrance'}
            data={
              {subTitle:"潮 流 杂 志",
                img:"15312108599314160.jpg",
                des:"为双唇赋予更多魅力不能VB规范性报复性办公费根本承诺花姑娘"}
            }
          />

        </div>
      </div>
    )
  }
}