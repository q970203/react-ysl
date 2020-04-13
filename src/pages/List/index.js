import React from "react";
import './list.css'
import Cell from "../../components/cell";
import Breadcrumb from "../../components/breadcrumb";
import qs from 'qs'
import {inject,observer} from "mobx-react";
@inject('goods')
@observer
class List extends React.Component{
  state={
    list:[]

  }
  constructor(props) {
    super(props);
    this.props.goods.list=[]
      let {update,clear} = this.props.goods
    clear('list')
    update({collectionName:props.match.params._type,proName:'list'})
      // this.axios({
    //     url:`/api/goods/${props.match.params._type}`
    //   }).then(
    //     res=>{
    //       this.setState({
    //         list:res.data.data
    //       })
    //     }
    //   )

  }
// componentDidMount() {
//   // let data=qs.parse(this.props.location.search,{ignoreQueryPrefix:true}).data
//   // console.log("zgdx",data)
//   let {update,clear} = this.props.goods
//     clear({proName:'list'})
//     update({collectionName:this.props.match.params._type,proName:'list'})
//   //
//
//   // if (data){
//   //   this.setState({
//   //     list:data
//   //   })
//   // }
// }

  render() {
    let {list} = this.props.goods
    return(
      <div className={'list'}>
        <Breadcrumb to={{pathname:this.props.location.pathname,text:this.props.match.params._type}}></Breadcrumb>
        <div className={'list__choose'}>
          <div>筛选 <span>{" + "}</span></div>
          <div>排序按照 <span>{" + "}</span></div>
        </div>
        {list ? list.map(item=>(
          <Cell
            key={item._id}
            data={item}
            to={{pathname:'/detail',apiname:this.props.match.params._type}}
            style={{border:'1px solid #e5e5e5',marginBottom:"5px",paddingBottom:'10px'}}
          />
        )):null

        }

      </div>
    )
  }
}

export default List