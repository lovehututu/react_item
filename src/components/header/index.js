import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Modal, message
} from 'antd';

import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import './index.less'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now())
  }
  logout=()=>{
    Modal.confirm({
    title: '确定退出吗?',
    onOk : ()=>{
      //用箭头函数的this
      // 删除保存的user数据
      storageUtils.removeUser()
      memoryUtils.user = {}
      message.success('退出成功')
      // 跳转到login renser里面用路由，回掉里面用属性
      this.props.history.replace('/login')
      },
      onCancel() {
      console.log('Cancel');
    },
  })
  }
  getTitle = () => {
    let title = '';
    const path = this.props.location.pathname
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const citem = item.children.find(citem =>citem.key === path)
        if (citem) {
          title = citem.title;
        }
      }
    })
    return title;
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: formateDate(Date.now())
      })
    },1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
        return (
          <div className="header">
            <div className="header-top">
              < span > 欢迎,{memoryUtils.user.username}</span>
              <a href='javascript:;' onClick={this.logout}>退出</a>
            </div>
            <div className="header-bottom">
              <div className="header-bottom-left">{this.getTitle()}</div>
              <div className="header-bottom-right">
                <span>{this.state.currentTime}</span>
                <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather"/>
                <span>晴</span>
              </div>
            </div>
          </div>
        )
    }
}

export default withRouter(Header)