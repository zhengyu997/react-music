import React, { Component } from 'react';
import { connect } from "react-redux"
import { TabsKey } from "../redux/actions"



import FindMusicIndex from './FindMusicIndex'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
class Index extends Component {
    constructor(...props) {
        super(...props);
        this.state = {

        }
    }
    onChange = (key) => {
        this.props.TabsKey(key)
        // console.log(key, this.props.tabkey)
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey={this.props.location.state} centered tabBarGutter={60} onChange={this.onChange} size="large" style={{ overflow: "visible" }}>
                    <TabPane tab="个性推荐" key="1" >
                        {/* <Route component={FindMusicIndex} /> */}
                        <FindMusicIndex />
                    </TabPane>
                    <TabPane tab="歌单" key="2">
                        歌单
                    </TabPane>
                    <TabPane tab="主播电台" key="3">
                        主播电台
                            </TabPane>
                    <TabPane tab="排行榜" key="4">
                        排行榜
                            </TabPane>
                    <TabPane tab="歌手" key="5">
                        歌手
                            </TabPane>
                    <TabPane tab="最新音乐" key="6">
                        最新音乐
                            </TabPane>
                </Tabs>


            </div>
        );
    }
}

export default connect(store => ({ tabkey: store.TabsKey }), { TabsKey })(Index);
