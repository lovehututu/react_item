import React, {Component} from 'react'
import { Redirect } from "react-router-dom"
import {Form,Input,Icon,Button,message} from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import logo from './images/logo.png'
import './login.less'
import {reqLogin} from '../../api'


const Item = Form.Item

class Login extends Component {
  handleSubmit = (e)=>{
    e.preventDefault()
    // const form = this.props.form;
    // const resault = form.getFieldsValue();
    // const username = form.getFieldValue('username');
    // const password = form.getFieldValue('password');
    // console.log(resault,username,password)
    //统一验证
    this.props.form.validateFields(async (err, {username,password}) => {
      if (!err) {
       const resault = await reqLogin(username,password);
       if(resault.status===0){
          // 将user信息保存到local
          const user = resault.data
          // 设置原生保存用户名到localStorage
          // localStorage.setItem('user_key', JSON.stringify(user))


          //工具方法实现保存并放入内存中!
          storageUtils.saveUser(user)
          memoryUtils.user = user
           
         this.props.history.replace('/');
         message.success('登录成功');
       }else{
         message.error(resault.msg)
       }
      }
    })
  }

  //自定义校验
  validator = (rule, value, callback)=>{
    value = value.trim();
    if (!value) {
      callback('不能为空！')
    }else if (value.length<4){
      callback('必须大于四位')
    }else if(value.length>12){
      callback('不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('用户名必须是英文、数字或下划线组成')
    }else{
      callback()//验证通过
    }
    
  }
  render() {
    // 原生读取用户名，如果有就直接去admin路由组件
    // const user = JSON.parse(localStorage.getItem('user_key')||'{}')
    const user = memoryUtils.user
    if(user._id){
      return <Redirect to='/'/>
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>

        <section className='login-content'>
          <h3>用户登陆</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            
            <Item>
              {
                getFieldDecorator('username', {
                  initialValue:'',
                  rules: [{ required: true,whitespace:true, message: '请输入你的用户名!' },
                          { min:4,message:'最少四个字'},
                          { max:12,message:'最多12个字'},
                          { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                ],
                })(
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="用户名"/>
                )
              }
            </Item>

            <Item>
              {
                getFieldDecorator('password', {
                  initialValue:'',
                  rules: [{ required: true, message: '请输入你的密码!' },
                    {validator:this.validator}
                  ],
                })(
                  <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  type="password" placeholder="密码"/>
                )
              }
            </Item>
            
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WrapperForm = Form.create()(Login)

export default WrapperForm;