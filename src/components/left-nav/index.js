import React, { Component } from 'react'
import { Link,withRouter } from "react-router-dom"
import { Menu, Icon } from 'antd';

import './index.less'
import menuList  from '../../config/menuConfig'
import logo from './images/logo.png'
const { SubMenu } = Menu;

class LeftNav extends Component {
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  getMenuList = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map(item=>{
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                     </Menu.Item>
                )
            } else {
              //有二级菜单的情况下，遍历二级，在和path相等的情况下则返回
              const citem = item.children.find(citem => citem.key === path)
              if (citem) {
                this.openKey = item.key
              }
            }
             return (
                <SubMenu
                key={item.key}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </span>
                }
              >
                {this.getMenuList(item.children)}
              </SubMenu>
                )
        })
      
  }
  componentWillMount() {
    this.getMenuList = this.getMenuList(menuList)
  }
  render() {
    let path = this.props.location.pathname
      //因为不能先试用再调用，所以先放在变量里面缓存,但是会执行两次！
    // const getMenuList = this.getMenuList(menuList)
    return (
        <div className="left-nav">
            <Link className="left-nav-link" to="/home">
            <img src={logo} alt="logo"/>
            <h1>硅谷后台</h1>
            </Link>
        <Menu
          // defaultSelectedKeys={[path]}//默认选中路径的选项 ，但直接通过地址栏不会展开，重新登陆没有默认选中的home
          mode="inline"
          theme="dark"
          selectedKeys={[path]} //地址栏和选中栏一致  重新登陆会有默认home
          defaultOpenKeys={[this.openKey]}  //能匹配展开，openkey不是path而是相对应的上一级
          >      
          {
              this.getMenuList
          }
        </Menu>
        </div>
    )
    }
}
//包装非路由组件使用withRouter高阶组件
export default withRouter(LeftNav)