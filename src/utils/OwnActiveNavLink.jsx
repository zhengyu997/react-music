
// 实现Tag的封装
import styled from "styled-components";
import {  withRouter } from 'react-router-dom'
import React from 'react'


const OwnLinkItem = (props) => {
    // 渲染成tag  实现vue中的tag功能
    // console.log(props.location.pathname, props.to, props.nav)
    let Tag = props.tag || 'a'
    // 需要添加的类名  也可以自己定义active类型 默认是active
    let _class = props.className || ''
    let _activeClassName = props.activeClassName || 'active'
    // toObj 判断参数的类型 如果to是一个对象 需要取到props.to.pathname 否则建议是否以props.to开头
    let isActive = props.toObj ? props.location.pathname === props.to.pathname : props.location.pathname.startsWith(props.to)
    // props.nav 可以保证都能加到类名 避免isActive没匹配到时 丢失类名
    let className = (props.nav && isActive) ? _class + ' ' + _activeClassName : _class
    return <Tag className={className} onClick={() => props.history.push(props.to)}> {props.children} </Tag>

}



export const OwnNavLink = props => {  // 加上自定义类名
    let Item = withRouter(OwnLinkItem)  // 用withRouter包上后就有了路由对象 history location match
    return (
        <Item {...props} nav />      // 返回的就是tag的类型
    )
}


export const OwnActiveNavLink = styled(OwnNavLink)
`

  &.ok{                // 给需要的link的标签自定义加上的类名 可以在这里配置样式
    color:red
  }

`