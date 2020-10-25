import React, { Component } from 'react';
import { Avatar, Menu, Dropdown, message } from 'antd';
import { withRouter } from "react-router-dom"
import { Logout } from '../api/api'

import { UserAddOutlined, UserOutlined, DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { OwnActiveNavLink } from '../utils/OwnActiveNavLink';


class HeaderRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: localStorage.getItem('nickname'),
            avatarUrl: localStorage.getItem('avatarUrl'),
        }
    }

    componentDidMount() {


    }

    render() {

        const handleMenuClick = (e) => {
            if (e.key === '1') {
                message.info("还没开通呢");
            } else if (e.key === '2') {
                // localStorage.clear()
                localStorage.removeItem('token')
                localStorage.removeItem('nickname')
                localStorage.removeItem('avatarUrl')
                localStorage.removeItem('accountID')
                this.props.history.push("/")
                // window.location.reload();
                Logout();

                message.success("退出成功", 2);

            }
        };

        const menu = (
            <Menu onClick={handleMenuClick} >
                <Menu.Item key="1" icon={<SettingOutlined style={{ fontSize: '17px', float: "left" }} />}>
                    <span > 个人信息</span>
                </Menu.Item>
                <Menu.Item key="2" icon={<LogoutOutlined style={{ fontSize: '17px', float: "left" }} />}> <span> 退出</span></Menu.Item>
            </Menu>
        );
        return localStorage.getItem('token') ? (
            <Dropdown overlay={menu} overlayClassName="LoginMenu">
                <div className="loginin" >
                    <Avatar size={40} src={this.state.avatarUrl} />&nbsp;
                <span style={{ textAlign: 'right' }}> {this.state.nickname} </span>
                    <DownOutlined />
                </div>
            </Dropdown>
        ) : (
                <div>
                    <OwnActiveNavLink to="/register" tag="a" className="register" >
                        <UserAddOutlined style={{ fontSize: '17px' }} twoToneColor="#ffffff" />
                              注册
                </OwnActiveNavLink>
                    <OwnActiveNavLink to="/login" tag="a" className="login" >
                        <UserOutlined style={{ fontSize: '17px' }} twoToneColor="#ffffff" />
                    登录
                 </OwnActiveNavLink>
                </div>
            )
    }
}

export default withRouter(HeaderRight);