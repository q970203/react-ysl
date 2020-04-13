import {observable,action} from "mobx";
import axios from "axios"
import qs from 'qs'
class User {
  constructor(store) {
    this.store = store
  }

  @observable user = {err: 1, msg: '未登录', data: {}, token:''};

  @action
    logout = () => this.user = {err: 1, msg: '未登录', data: {}, token:''};
  @action
    checkUser =async ({
    collectionName,method="post",username,password,tel
    })=>{
      let res= await axios({
        url:`/api/${collectionName}`,
        method,
        data:{
          tel,
          username:username || "",
          password
        }
      })

      if (res.data.err===0){
        window.localStorage.setItem('user',qs.stringify(res.data));
        this.user = res.data;
      }

      return  res
    }


}


export default User