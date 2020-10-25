import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
const breadcrumbNameMap = {//跟路由路径保持一致
    "/": "发现音乐",
    "/everyday": "每日推荐",
    "/403": "403",
    "/404": "404",
    "/recommend": "私人 FM",
    "/video": "视频",
    "/friend": "朋友",
    "/lovemusic": "我喜欢的音乐",
    "/lovemusic/addplaylist": "创建的歌单",

    "/search": "搜索",


};

class BCrumb extends Component {
    constructor(...props) {
        super(...props);
        this.state = {

        }
    }
    skip = () => {
       
        if (this.props.location.pathname) {
            this.props.history.push({
                pathname: '/',
                state: this.props.tabkey,
            });
        }
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.tabkey !== this.props.tabkey) {
    //         console.log("接收", this.props.tabkey)
    //     }

    // }
    render() {
        const { location } = this.props;
        const pathSnippets = location.pathname.split("/").filter((i) => i);

        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            let url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
            return (
                <Breadcrumb.Item key={url} style={{ fontSize: 15 }}>
                    {breadcrumbNameMap[url]}
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [
            <Breadcrumb.Item key="home" style={{ fontSize: 15 }}>
                {/* <Link to="/" style={{ fontSize: 15 }}> 发现音乐</Link> */}
                <span onClick={this.skip} className="findmusic" style={{ fontSize: 15, cursor: "pointer" }}>发现音乐 </span>
            </Breadcrumb.Item>
        ].concat(extraBreadcrumbItems);
        return (
            <div>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    {breadcrumbItems}
                </Breadcrumb>
            </div>
        );
    }
}

export default connect(store => ({ tabkey: store.TabsKey }))(withRouter(BCrumb));


