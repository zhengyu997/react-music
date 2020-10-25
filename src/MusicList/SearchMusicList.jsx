import React, { Component } from 'react';
import { getMusicUrl, Cloudsearch, Like, Likelist } from '../api/api'
import { connect } from "react-redux"

import { Table, Space, message, Modal, Radio } from 'antd';
import { HeartTwoTone, HeartOutlined, createFromIconfontCN } from '@ant-design/icons';
import { MusList } from "../redux/actions"

import { saveAs } from 'file-saver';
const { confirm } = Modal;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2149026_wn08z6xsxm.js',
});
class MusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            accountID: localStorage.getItem('accountID'),
            Listdata: [],
            initLoading: false,
            likeid: [],

        };
    }
    xuanTitle = (value) => {

        getMusicUrl(`/song/url?id=${value.key}`).then((res) => {
            // console.log("我是地址", res.data[0].url)
            let url = res.data[0].url;
            let arr = []
            arr.push(value)
            let datas = arr.map(item => {
                // return { src:url,artist:item.singer,name:item.name,img:item.picUrl,id:item.key}
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

    componentDidUpdate(prevProps) {
        if (prevProps.seachMusic !== this.props.seachMusic) {
            //第二次
            // let value = this.props.seachMusic;
            let value = this.props.location.search.substring(6);
            // console.log("第二次", value)
            this.request(value)
            // this.request(this.props.match.params.name)

        }

    }

    componentDidMount() {
        //第一次
        let value = this.props.location.search.substring(6);
        // console.log("第一次", decodeURIComponent(value))

        this.request(value)
        // this.request(this.props.match.params.name)
    }

    request = (value) => {
        const accountID = this.state.accountID;
        let timestamp = new Date().getTime();
        this.setState({
            initLoading: true
        })

        Cloudsearch(`/cloudsearch?keywords=${value}&timestamp=${timestamp}`).then((res) => {
            let data = res.result.songs.map((item, index) => {
                this.setState({
                    initLoading: false
                })
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

            let token = this.state.token;
            if (token !== null) {
                Likelist(`/likelist?uid=${accountID}&timestamp=${timestamp}`).then((res) => {
                    this.setState({
                        likeid: res.ids
                    })

                    // console.log(this.state.likeid)
                })
            }



            this.setState({
                Listdata: data,
            })
        }).catch(function (error) {
            message.error("搜索错误" + error)
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
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
            <div >
                <Table columns={columns} locale={{ emptyText: "暂无数据请搜索" }}
                    loading={{
                        spinning: this.state.initLoading,
                        tip: "加载中..."
                    }}

                    dataSource={this.state.Listdata} size="Default" onRow={record => {
                        return {
                            onDoubleClick: event => { this.xuanTitle(record) }, // 点击行
                        };
                    }} pagination={{ position: ['bottomCenter'] }} />
            </div>
        );
    }
}


export default connect(store => ({ musiclists: store.musiclists.list, seachMusic: store.SeachMusic }), { MusList })(MusicList);