import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { PlaylistDetail, getMusicUrl, Like, Likelist, Songdetail } from '../api/api'
import { connect } from "react-redux"
import { MusList } from "../redux/actions"

import { Avatar, Modal, Table, Space, message, Radio, Tag } from 'antd';
import { saveAs } from 'file-saver';
import { HeartTwoTone, HeartOutlined, createFromIconfontCN } from '@ant-design/icons';

const { confirm } = Modal;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2149026_wn08z6xsxm.js',
});

class AddPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountID: localStorage.getItem('accountID'),
            Listdata: [],
            initLoading: true,
            likeid: [],
            coverImgUrl: "",
            songSheet: []
        }
    }
    componentWillUnmount() {
        //卸载组件时
        this.setState = () => false;

    }
    xuanTitle = (value) => {
        // console.log(value)
        getMusicUrl(`/song/url?id=${value.key}`).then((res) => {
            let url = res.data[0].url;
            let arr = []
            arr.push(value)
            let datas = arr.map(item => {
                let id = item.key;
                let ids = id.toString();
                if (url === null) {

                    return { resource: url, id: ids }
                } else {
                    return { resource: url, info: item.singer, title: item.name, img: item.picUrl, id: ids }
                }
            })


            this.props.MusList(datas)
        })


    }

    download = (key, name, singer) => {
        //下载音乐
        confirm({
            title: (<Radio.Group defaultValue="1"><Radio value="1">极高（320kbit/s）</Radio></Radio.Group>),
            icon: "",
            okText: '确定',
            width: 310,
            mask: false,
            centered: true,
            cancelText: '取消',
            onOk: () => {
                getMusicUrl(`/song/url?id=${key}`).then((res) => {
                    let url = res.data[0].url;
                    if (url !== null) {
                        new Blob([url], { type: "audio/mpeg;charset=utf-8" });
                        saveAs(url, `${name}-${singer}.mp3`);
                    } else {
                        message.info("因合作方要求，该资源暂时下架")
                    }

                })

            }
        });

    }

    like = (keys) => {

        let timestamp = new Date().getTime();
        if (this.state.likeid.indexOf(keys) !== -1) {
            Like(`/like?id=${keys}&like=false&timestamp=${timestamp}`).then((res) => {
                message.success({ content: '取消喜欢成功', duration: 2 });
                let key = this.state.likeid.indexOf(keys);
                this.setState({
                    dataSource: this.state.likeid.splice(key, 1)
                });
            })
            // console.log("包含")
        } else {
            Like(`/like?id=${keys}&like=true&timestamp=${timestamp}`).then((res) => {
                message.success({ content: '已添加到我喜欢的音乐', duration: 2 });
                this.setState({
                    dataSource: this.state.likeid.unshift(keys)
                });
            }).catch((error) => {
                message.error("添加失败需要VIP");

            });
            // console.log("不包含")

        }


    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.state.id !== this.props.location.state.id) {
            //第二次
            // console.log("第二次接收到", this.props.location.state.id)
            this.request(this.props.location.state.id)

        }

    }
    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            this.request(this.props.location.state.id);
        }
    }
    request = (e) => {
        let timestamp = new Date().getTime();
        const accountID = this.state.accountID;
        PlaylistDetail(`/playlist/detail?id=${e}&timestamp=${timestamp}`).then(res => {
            // console.log("接收的歌单数据", res.playlist)
            this.setState({ songSheet: res.playlist })
            if (res.playlist.tracks.length === 0) {
                this.setState({
                    initLoading: false
                })
            } else {
                let id = res.playlist.tracks.map(item => {
                    return item.id
                })
                Songdetail(`/song/detail?ids=${id}&timestamp=${timestamp}`).then((even) => {

                    let datas = even.songs.map((item, index) => {
                        let ms = item.dt;  //换算成时间
                        let min = Math.floor((ms / 1000 / 60) << 0);
                        let sec = Math.floor((ms / 1000) % 60);
                        if (min < 10) {
                            min = "0" + min
                        }
                        if (sec < 10) {
                            sec = "0" + sec
                        }
                        return { index: index, key: item.id, name: item.name, picUrl: item.al.picUrl, singer: item.ar[0].name, time: min + ':' + sec }
                    })
                    this.setState({
                        Listdata: datas,
                        initLoading: false
                    })
                })

            }

            Likelist(`/likelist?uid=${accountID}&timestamp=${timestamp}`).then((res) => {
                this.setState({
                    likeid: res.ids
                })
            })



        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const columns = [
            {
                title: '',
                dataIndex: 'sort',
                width: 50,
                key: '1',
                render: (text, record) =>
                    (
                        <div>


                            <Space size="middle">
                                <Space style={{ minWidth: 25 }}>
                                    <span style={{ color: "#999", marginRight: 8 }}>{record.index + 1}</span>
                                </Space>
                                {
                                    localStorage.getItem('token') ? (
                                        <Space size="middle">
                                            {
                                                this.state.likeid.indexOf(record.key) !== -1 ? (
                                                    <HeartTwoTone onClick={() => this.like(record.key)} style={{
                                                        cursor: 'pointer'
                                                    }} twoToneColor="#ff0000" />
                                                ) : (
                                                        <HeartOutlined onClick={() => this.like(record.key)} style={{
                                                            cursor: 'pointer'
                                                        }} twoToneColor="#555" />
                                                    )

                                            }
                                        </Space>
                                    ) : null

                                }
                                <IconFont type="icon-download" onClick={() => this.download(record.key, record.name, record.singer)} style={{ cursor: 'pointer' }} />

                            </Space>
                        </div>
                    ),

            },
            {
                title: '音乐标题',
                dataIndex: 'name',
                width: 800,

            },
            {
                title: '歌手',
                dataIndex: 'singer',
                width: 200,
            },
            {
                title: '时长',
                dataIndex: 'time',
                width: 100,
            },
        ];
        return (
            <div>
                {
                    localStorage.getItem('token') ? (
                        <div style={{ paddingTop: 10 }}>
                            <div style={{ height: 200 }}>
                                <Avatar size={200} shape="square" style={{ border: "1px solid  #dedede" }} src={this.state.songSheet.coverImgUrl} />
                                <div style={{ position: "absolute", top: 15, left: 240 }}>
                                    <Tag color="#1890ff" style={{ float: "left", marginTop: 8 }}>歌单</Tag>
                                
                                    <span style={{ fontSize: 22, fontWeight: 300 }}>{this.state.songSheet.name}
                                        <IconFont type="icon-bianji" style={{ cursor: 'pointer', fontSize: 17, marginLeft: 10 }} />
                                    </span>
                                </div>
                                <span style={{ float: "right", right: 0, color: "#999", textAlign: 'right' }}>歌曲数<br />{this.state.Listdata.length} </span>
                            </div>

                            <Table columns={columns} locale={{ emptyText: "暂无数据请搜索" }}
                                loading={{
                                    spinning: this.state.initLoading,
                                    tip: "加载中..."
                                }}

                                dataSource={this.state.Listdata} size="Default" onRow={record => {
                                    return {
                                        onDoubleClick: event => { this.xuanTitle(record) }, // 点击行
                                    };
                                }} pagination={false} />
                        </div>
                    ) : <Redirect to="/" />
                }


            </div>
        );
    }
}
export default connect(store => ({ musiclists: store.musiclists.list }), { MusList })(AddPlaylist);
