import React, { Component } from 'react';
import Particles from "../utils/Particles"
import { Link } from 'react-router-dom'

import { PhoneLogin, PhoneCapTcha, PhoneYZCapTcha, PhoneRegister } from '../api/api'
import { Form, Input, Button, Row, Col, message } from 'antd';
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
const captcha = (rule, value, callback) => {
    let reg = /^\d{4}$/;
    if (value == null) {
        return Promise.resolve();
    } else if (!reg.test(value)) {
        return Promise.reject('验证码输入有误');
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

class Register extends Component {


    constructor(props) {
        super(props);
        this.state = {
            send_message: "发送验证码",
            disabled: false,

        }
    }
    /*注册 */
    sussice = () => {
        let valuePhone = this.valuePhone.props.value;
        let valuePass = this.valuePass.props.value;
        let valueCap = this.valueCap.props.value;
        var timestamp = new Date().getTime();
        PhoneYZCapTcha(`/captcha/verify?phone=${valuePhone}&captcha=${valueCap}&timestamp=${timestamp}`)
            .then((res) => {
                console.log("验证码", res)
                switch (res.code) {
                    case 200:
                        PhoneRegister(`/register/cellphone?phone=${valuePhone}&password=${valuePass}&captcha=${valueCap}&timestamp=${timestamp}`)
                            .then((v) => {
                                console.log("注册成功", v)
                                message.success("注册成功", 2);
                                this.props.history.push("/login")
                            })
                        break;
                    case 400:
                        message.warning("发送验证码超过限制：每个手机号一天只能发5条验证码");
                        break;
                    case 503:
                        message.warning("验证码错误");
                        break;
                    default:
                        message.warning("请输入验证码");

                }

            })


    }

    send = (e) => {
        let valuePhone = this.valuePhone.props.value;
        var timestamp = new Date().getTime();
        console.log(timestamp)

        if ((/^1[3|4|5|7|8]\d{9}$/.test(valuePhone))) {
            PhoneLogin(`/cellphone/existence/check?phone=${valuePhone}&timestamp=${timestamp}`).then((res) => {
                console.log(res);
                if (res.hasPassword === true) {
                    message.warning('手机号码已注册');
                } else {
                    PhoneCapTcha(`/captcha/sent?phone=${valuePhone}&timestamp=${timestamp}`).then((data) => {
                        console.log("成功", data);
                        if (data.code === 200) {
                            message.success('验证码发送成功');
                            let time = 60;
                            let timer = null;
                            this.setState({ send_message: time + "秒", disabled: true })
                            timer = setInterval(() => {
                                if (time === 1) {
                                    clearInterval(timer);
                                    this.setState({ send_message: "发送验证码", disabled: false })
                                    localStorage.removeItem('__captchaTime__');
                                } else {
                                    time--;
                                    this.setState({ send_message: time + "秒", disabled: true })
                                    localStorage.setItem('__captchaTime__', time);
                                }

                            }, 1000)
                        }

                    }).catch((err) => {
                        message.warning("注册失败");
                    })

                }
            }).catch((err) => {
                console.log("验证码发送失败")
            })

        } else {
            message.warning('手机号码有误');
        }

    }

    componentDidMount() {
        let data = localStorage.getItem('__captchaTime__');
        let timer = null;
        if (data !== null) {
            timer = setInterval(() => {
                if (data <= 1) {
                    clearInterval(timer);
                    this.setState({ send_message: "发送验证码", disabled: false })
                    localStorage.removeItem('__captchaTime__');
                } else {
                    data--;
                    this.setState({ send_message: data + "秒", disabled: true })
                    localStorage.setItem('__captchaTime__', data);
                }

            }, 1000)
        }

    }
    render() {

        return (
            <div className="bjys">
                <Particles />
                <div id="particles-js" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                </div>
                <div className="apTitle">注册</div>
                <div className="logcon">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.sussice}

                    >
                        <Form.Item
                            label="手机号"
                            name="phone"

                            rules={[{ required: true, message: '请输入手机号' }, {
                                validator: phone
                            }]}

                        >
                            <Input placeholder="请输入手机号" ref={(valuePhone) => { this.valuePhone = valuePhone }} />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }, {
                                validator: Password
                            }]}
                        >
                            <Input.Password placeholder="请输入密码" ref={(valuePass) => { this.valuePass = valuePass }} />
                        </Form.Item>
                        <Form.Item label="验证码" >
                            <Row>
                                <Col span={20}>
                                    <Form.Item
                                        name="captcha"
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: '请输入4位验证码',
                                            }, {
                                                validator: captcha
                                            }
                                        ]}
                                    >
                                        <Input placeholder="请输入4位验证码" ref={(valueCap) => { this.valueCap = valueCap }} />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Button onClick={this.send} disabled={this.state.disabled} style={{ width: '100%' }}>{this.state.send_message}</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{ width: "20%" }} >
                                注册
                                </Button>
                        </Form.Item>
                        <Link to="/login"> 已有账号，去登录</Link>
                    </Form>
                </div>

            </div>
        );
    }
}

export default Register;