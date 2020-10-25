import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import moment from 'moment'
import { Card, notification } from 'antd';
const { Meta } = Card;
class Demo extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            XQ: "",
            RQ: "",
        }
    }
    componentDidMount() {
        let XQ = moment().format('dddd');
        let RQ = moment().format("D");
        this.setState({ XQ, RQ })

    }
    everyday = () => {

        if (localStorage.getItem('token') !== null) {
            this.props.history.push("/everyday")
          
        } else {
            this.loginyz()
        }

    }
    loginyz = () => {
        notification['info']({
            message: '提示',
            duration: 2,
            placement: "topLeft",
            description: (<span style={{ fontSize: 18 }}>请先登录</span>),
        });
    }
    render() {
        return (
            <div>
                <Card hoverable bodyStyle={{ padding: 0 }} style={{ width: 150, height: 150, textAlign: "center", }}
                    onClick={this.everyday}>
                    <p style={{ marginTop: 10, color: "#666666" }}>  {this.state.XQ}</p>
                    <p style={{ marginTop: -22, color: '#c62f2f', fontSize: 97 }}>{this.state.RQ}</p>
                    <Meta title="每日歌曲推荐" />
                </Card>
            </div>
        );
    }
}

export default withRouter(Demo);