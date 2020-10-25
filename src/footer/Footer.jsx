import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;


class Footers extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Layout>
                    <Footer className="footer" style={{ textAlign: 'center', color: "#000"}} >接口由网易云提供 · 佳宇鸭制作
                     <br />   更多功能请前往"网易云音乐"设置
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default Footers;