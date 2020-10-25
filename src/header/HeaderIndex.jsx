import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import HeaderRight from "./HeaderRight"

import "../style/HeaderIndex.css"

const { Header } = Layout;

class HeaderIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Layout>
                    <Header breakpoint="lg" className="header_top">

                        <Row>
                            <Col span={12}>云音乐展示·当你</Col>
                            <div className="header_right">
                                <HeaderRight />
                            </div>

                        </Row>

                    </Header>

                </Layout>
            </div>
        );
    }
}

export default HeaderIndex;