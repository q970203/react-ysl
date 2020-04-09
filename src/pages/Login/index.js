import React from "react";
import styles from './login.module.css'
import Input from "../../components/input";
import Button from '../../components/button';
import OtherLogin from '../../components/otherLogin'
import qs from 'qs'

export default class Login extends React.Component{
  state={
    userTel:"",
    password:"",
    msg:""
  }
  changeIpt=(ev)=>{
    this.setState({
      [ev.target.name]:ev.target.value
    })
  }

  login=async ()=>{
    let {userTel,password} = this.state
    let res = await this.axios({
      url:"/api/login",
      method:"post",
      data:{
        tel:userTel,
        password:password
      }
    })
    if (res.data.err===0){
      //更新同步localStrage
      window.localStorage.setItem("user",qs.stringify(res.data));
      //跳转到之前
      let path = qs.parse(this.props.location.search,{ignoreQueryPrefix:true}).path;

      if (path && !path.includes('/login')){
        this.props.history.push({
          pathname:qs.parse(this.props.location.search,{ignoreQueryPrefix:true}).path
        })
      } else {
        this.props.history.push('/user')
      }

    } else {
      this.setState({mag:res.data.msg})
    }
      // .then(
      // res=>{
      //   this.setState({msg:res.data.msg})
      //   if(res.data.err===0){ console.log(res)
      //   window.localStorage.setItem("user",qs.stringify(res.data))
      //
      //   let path = qs.parse(this.props.location.search,{ignoreQueryPrefix:true}).path
      //   if(path && !path.includes('/login')){
      //     this.props.history.push({
      //       pathname:qs.parse(this.props.location.search,{ignoreQueryPrefix:true}).path
      //     })
      //   }else {
      //     this.props.history.push('/user')
      //   }}
      // }
    // )
  }

  render() {
    let {userTel,password,msg} = this.state
    return(
      <div className={styles.login}>
        <h4 style={{textAlign:"center"}}>{msg}</h4>
        <h2>登录</h2>
        <div className="">
          <span className={styles.tag}>请输入您的手机</span>
          <Input model={{name:"userTel",value:userTel,onChange:this.changeIpt}}/>

        </div>
        <div className="">
          <span className={styles.tag}>密码</span>
          <Input type={'password'} model={{name:"password",value:password,onChange:this.changeIpt}}/>

        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:'0.5rem'}}>
          <Button clickHandler={()=>{this.props.history.push('/reg')}} type={'other'} style={{backgroundColor:"#fff",color:"#333",border:"1px solid #333"}}>注 册</Button>
          <Button type={'other'} clickHandler={()=>this.login()}>登 录</Button>
        </div>
        <OtherLogin></OtherLogin>

      </div>
    )
  }
}