import React, { Component } from 'react';
import Particles from "../utils/Particles"
import { Link } from 'react-router-dom'

import { Login } from '../api/api'
import { Form, Input, Button, message, Checkbox } from 'antd';
import "../style/register.css"


const phone = (rule, value, callback) => {
    if (value == null) {
        return Promise.resolve();
    } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(value))) {
        return Promise.reject('手机号码有误');
    } else {
        return Promise.resolve();
    }
}
const Password = (rule, value, callback) => {
    if (value == null) {
        return Promise.resolve();
    } else if (value.length < 5) {
        return Promise.reject('密码最少6位数');
    } else {
        return Promise.resolve();
    }
}

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 14,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 12,
    },
};

class Logins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            send_message: "发送验证码",
            disabled: false,
            checkedaccount: true,
            checkedpassword: false,
            zhanghao: localStorage.getItem("checkedaccount"),
            mima: localStorage.getItem("checkedpassword"),
        }
    }

    sussice = () => {
        let valuePhone = this.valuePhone.props.value;
        let valuePass = this.valuePass.props.value;
        let timestamp = new Date().getTime();
        Login(`/login/cellphone?phone=${valuePhone}&password=${valuePass}&timestamp=${timestamp}`).then((res) => {
            switch (res.code) {
                case 200:
                    message.success("登录成功", 2);
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("nickname", res.profile.nickname);
                    localStorage.setItem("avatarUrl", res.profile.avatarUrl);
                    localStorage.setItem("accountID", res.account.id);
                    this.props.history.push("/")
                  
                    if (this.state.checkedaccount === true) {
                        localStorage.setItem("checkedaccount", valuePhone);
                    } else if (this.state.checkedpassword === true) {
                        localStorage.setItem("checkedpassword", valuePass);
                    }
                    if (this.state.checkedaccount === false) {
                        localStorage.removeItem('checkedaccount')
                    }
                    if (this.state.checkedpassword === false) {
                        localStorage.removeItem('checkedpassword')
                    }
                    if (this.state.checkedaccount === true && this.state.checkedpassword === true) {
                        localStorage.setItem("checkedaccount", valuePhone);
                        localStorage.setItem("checkedpassword", valuePass);
                    }
                    if (this.state.checkedaccount === false && this.state.checkedpassword === false) {
                        localStorage.removeItem("checkedaccount");
                        localStorage.removeItem("checkedpassword");
                    }
                    break;
                case 400:
                    message.warning("账号输入错误");
                    break;
                case 501:
                    message.warning("账号不存在");
                    break;
                case 502:
                    message.warning("密码错误");
                    break;
                case 509:
                    message.warning("密码错误超过限制");
                    break;
                default:
                    message.warning("请输入账号或密码");

            }

        }).catch(function (error) {
            console.log("错误", error);
            message.warning("密码错误超过限制");
        });

    }
    componentDidMount() {

        if (localStorage.getItem('checkedpassword') !== null) {
            this.setState({
                checkedpassword: true
            })
        }

    }

    toggleChecked = (e) => {
        this.setState({ checkedaccount: !this.state.checkedaccount });
        if (e.target.checked === false) {
            this.setState({ checkedpassword: false });
        }

    }
    remember = (e) => {
        this.setState({ checkedpassword: !this.state.checkedpassword });
        if (e.target.checked === true) {
            this.setState({ checkedaccount: true });
        }

    }
    render() {

        return (
            <div className="bjys">
                <Particles />
                <div id="particles-js" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                </div>
                <div className="apTitle">登录</div>
                <div className="logcon">
                    <Form
                        {...layout}
                        name="basic"

                        onFinish={this.sussice}

                    >
                        <Form.Item
                            label="手机号"
                            name="phone"
                            rules={[{ required: true, message: '请输入手机号' }, {
                                validator: phone
                            }]}
                            initialValue={this.state.zhanghao}
                        >
                            <Input placeholder="请输入手机号(网易云音乐账号)" ref={(valuePhone) => { this.valuePhone = valuePhone }} />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }, {
                                validator: Password
                            }]}
                            initialValue={this.state.mima}
                        >
                            <Input.Password placeholder="请输入密码" ref={(valuePass) => { this.valuePass = valuePass }} />
                        </Form.Item>
                        <div style={{ margin: "7px 0 25px 0" }} >
                            <Checkbox checked={this.state.checkedaccount} style={{ color: "#fff" }} onChange={this.toggleChecked}>记住账号</Checkbox>
                            <Checkbox checked={this.state.checkedpassword} style={{ color: "#fff" }} onChange={this.remember}>记住密码</Checkbox>
                        </div>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{ width: "20%" }} >
                                登录
                                </Button>
                        </Form.Item>
                        <Link to="/register"> 还没有账号，去注册?</Link>  &nbsp;&nbsp; <Link to="/modify"> 忘记密码?</Link> <br />
                        <Link to="/"> 首页</Link>
                    </Form>
                </div>

            </div >
        );
    }
}

export default Logins;