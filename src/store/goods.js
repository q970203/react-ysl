
import axios from '../plugins/axios'
import {action, observable} from "mobx";

class Goods {
  constructor(store) {this.store=store}

  @observable currentApiname = ''
  @observable foundCZ=[]
  @observable banner = []
  @observable list = []
  @observable cartgoods=[]
  @observable detail = {}

  @action
  clear = (proName) => this[proName]=null
  @action
  update = async ({collectionName,_id=null,proName})=>{
    try {
      let res = await axios({
        url: _id ? `/api/goods/${collectionName}/${_id}`: `/api/goods/${collectionName}`,

      });
      console.log('goods//',collectionName,proName,res)
      if (proName==='foundCZ'){
        this.currentApiname=collectionName
      }
      if(_id){
        this.detail = res.data.data
      } else {
        this[proName]=res.data.data
      }
      return res
    }catch (e) {
      console.log('store/goods/err',e)
    }
  }

}
export default Goods