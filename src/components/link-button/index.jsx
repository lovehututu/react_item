import React from 'react'

import './index.less'
/* 
自定义的看似链接实是button的组件
1. {...props}: 将接收的所有属性传递给子标签
*/
export default function LinkButton(props) {
    return <button className="link-button" {...props} />
}