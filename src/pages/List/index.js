import React from "react";
import './list.css'
import Cell from "../../components/cell";
import Breadcrumb from "../../components/breadcrumb";
import qs from 'qs'
class List extends React.Component{
  state={
    list:[]

  }
  constructor(props) {
    super(props);
    // this.state.list=[]

      this.axios({
        url:`/api/goods/${props.match.params._type}`
      }).then(
        res=>{
          this.setState({
            list:res.data.data
          })
        }
      )

  }
// componentDidMount() {
//   let data=qs.parse(this.props.location.search,{ignoreQueryPrefix:true}).data
//   console.log("zgdx",data)
//   if (data){
//     this.setState({
//       list:data
//     })
//   }
// }

  render() {
    let {list} = this.state
    return(
      <div className={'list'}>
        <Breadcrumb to={{pathname:this.props.location.pathname,text:this.props.match.params._type}}></Breadcrumb>
        <div className={'list__choose'}>
          <div>筛选 <span>{" + "}</span></div>
          <div>排序按照 <span>{" + "}</span></div>
        </div>
        {list.length>0 ? list.map(item=>(
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