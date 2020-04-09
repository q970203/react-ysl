import React from "react";
import './icon/iconfont.css'
import styles from './search.module.css'
export default class Search extends React.Component{

  search=(history)=>{
    this.axios({
      url:"/api/goods/makeup",
      params:{q:this.searchText.value}
    }).then(
      res=>{
        if(res.data.err===0){
          console.log(history)
          this.props.history.push(`/list/makeup?data=${res.data.data}`)
        }
      }

    )
  }
  render() {
    let {style,history} = this.props
    return(
      <div className={styles["search-box"]} style={style}>
          <div><input type="text" defaultValue={'搜索'} ref={el=>this.searchText=el}/> </div>
          <span className={"iconfont icon-search"} onClick={()=>{this.search(history)}}></span>
      </div>
    )
  }
}