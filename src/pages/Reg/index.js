import React from "react";
import styles from './reg.module.css'
import Input from "../../components/input";
import Button from '../../components/button';
import OtherLogin from '../../components/otherLogin'
import {inject,observer} from "mobx-react";

@inject("user")
@observer
class Reg extends React.Component{
  state={
    userTel:"",
    username:"",
    password:"",
    msg:""
  }
  changeIpt=(ev)=>{
    this.setState({
      [ev.target.name]:ev.target.value
    })
  }
  reg=()=>{
    let {username,userTel,password}=this.state
    let {checkUser} = this.props.user
    checkUser({
      collectionName:'reg',
      username,
      tel:userTel,
      password
    // })
    // this.axios({
    //   url:"/api/reg",
    //   method:"post",
    //   data:{
    //     tel:userTel,
    //     username:username,
    //     password:password
    //   }
    }).then(
      res=>{
        console.log(res)
        if(res.data.err==0){
          this.setState({
            msg:"注册成功",
          })
        setTimeout(()=> {
             this.props.history.push('/login')
        },1000)
        }else {
          this.setState({
            msg:"该号码已存在",
            userTel:"",
            username:"",
            password:"",
          })
        }
      }
    )
  }

  render() {
    let {userTel,password,username,msg} = this.state
    return(
      <div className={styles.login}>
        <h2 style={{color:"red",textAlign:"center"}}>{msg}</h2>
        <h2>注册</h2>
        <div className="">
          <span className={styles.tag}>请输入您的手机</span>
          <Input model={{name:"userTel",value:userTel,onChange:this.changeIpt}}/>
          {/*<span>请输入有效手机号</span>*/}
        </div>
        <div className="">
          <span className={styles.tag}>用户名</span>
          <Input model={{name:"username",value:username,onChange:this.changeIpt}}/>
          {/*<span>请输入有效手机号</span>*/}
        </div>
        <div className="">
          <span className={styles.tag}>密码</span>
          <Input type={'password'} model={{name:"password",value:password,onChange:this.changeIpt}}/>
          {/*<span>请输入正确的密码</span>*/}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:'0.5rem'}}>
          <Button type={'other'} style={{backgroundColor:"#fff",color:"#333",border:"1px solid #333"}} clickHandler={()=>{this.reg()}}>注 册</Button>
          <Button clickHandler={()=>{this.props.history.push('/login')}}  type={'other'}>登 录</Button>
        </div>
        <OtherLogin></OtherLogin>

      </div>
    )
  }
}

export default Reg