import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom"
import { Userplaylist } from '../api/api'
import { Layout, Menu } from 'antd';
// import Draggable from 'react-draggable';
import {
    HeartOutlined,
    createFromIconfontCN
    // PlusCircleOutlined

} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2149026_wn08z6xsxm.js',
});
class ContentLeft extends Component {

    state = {
        collapsed: false,
        title: "",
        Uplaylist: [],
        visible: false,
        disabled: true,
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


    onCollapse = collapsed => {
        this.setState({ collapsed });
        this.props.getChildrenMsg(collapsed)
        localStorage.setItem("collapsed", collapsed);

    };
    addsong = () => {
        // this.setState({ visible: true });


    };
    componentDidMount() {
        if (localStorage.getItem("collapsed") === 'true') {
            this.setState({ collapsed: true });
        }

        let accountID = localStorage.getItem('accountID');
        let timestamp = new Date().getTime();
        if (localStorage.getItem('token') !== null) {
            Userplaylist(`/user/playlist?uid=${accountID}&timestamp=${timestamp}`).then(res => {
                this.setState({
                    Uplaylist: res.playlist.slice(1)
                })
                // console.log("数据",res.playlist.slice(1))
            })
        }

    }

    render() {
        return (
            <div className="MenuLeft" >
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} >
                    <div className="logo" />
                    <Menu theme="light" defaultOpenKeys={['/love']} selectedKeys={[this.props.location.pathname]} mode="inline"
                    >
                        <Menu.Item key="/" icon={< IconFont type="icon-menu" style={{ fontSize: 21 }} />}>
                            <NavLink to={{
                                pathname: '/',

                            }}>发现音乐</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/recommend" icon={< IconFont type="icon-shouyinji" style={{ fontSize: 20 }} />}>
                            <NavLink to='/recommend'>私人 FM</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/video" icon={< IconFont type="icon-shipin" style={{ fontSize: 20 }} />}>
                            <NavLink to='/video'>视频</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/friend" icon={< IconFont type="icon-mn_pengyou" style={{ fontSize: 20 }} />}>
                            <NavLink to='/friend'>朋友</NavLink>
                        </Menu.Item>
                        {
                            localStorage.getItem('token') ? (
                                <SubMenu key="/love" title="创建的歌单" >
                                    <Menu.Item key="/lovemusic" icon={<HeartOutlined />} className="ilove">
                                        <NavLink to="/lovemusic">我喜欢的音乐</NavLink>
                                    </Menu.Item>
                                    {
                                        this.state.Uplaylist.map((item) => {
                                            return (
                                                <Menu.Item key={`/lovemusic/addplaylist/${item.id}`} icon={< IconFont type="icon-music-list" style={{ fontSize: 21, top: 3, position: "relative", left: -3 }} />} className="ilove" >
                                                    <NavLink to={{ pathname: `/lovemusic/addplaylist/${item.id}`, state: { id: item.id } }}>{item.name}</NavLink>

                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            ) : null

                        }




                    </Menu>

                </Sider>

            </div >
        );
    }
}

export default withRouter(ContentLeft);