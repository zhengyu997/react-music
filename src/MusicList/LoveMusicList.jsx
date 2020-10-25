import React, { Component } from 'react';
import { Like, Likelist, Songdetail, getMusicUrl } from '../api/api'
import { connect } from "react-redux"
import { MusList } from "../redux/actions"
import { Modal, Table, Space, message, Radio } from 'antd';
import { saveAs } from 'file-saver';
import { HeartTwoTone, createFromIconfontCN } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'
const { confirm } = Modal;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2149026_wn08z6xsxm.js',
});
class LoveMusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountID: localStorage.getItem('accountID'),
            Listdata: [],
            initLoading: true,
            visible: false,
            downloadvisible: false,
        };
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

    nolike = (keys) => {

        confirm({
            title: '确定将选中歌曲从我喜欢的音乐中删除？',
            icon: "",
            okText: '确定',
            okType: 'danger',
            width: 310,
            mask: false,
            centered: true,
            cancelText: '取消',
            onOk: () => {
                const dataSource = [...this.state.Listdata];
                let timestamp = new Date().getTime();
                Like(`/like?id=${keys}&like=false&timestamp=${timestamp}`).then((res) => {
                    if (res.code === 200) {
                        this.setState({
                            Listdata: dataSource.filter((item) => item.key !== keys),
                        });
                        message.success({ content: '删除成功', duration: 2 });
                    }
                })

            }
        });

    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    componentDidMount() {
        this.likes();
    }
    likes = () => {
        const accountID = this.state.accountID;
        let timestamp = new Date().getTime();
        Likelist(`/likelist?uid=${accountID}&timestamp=${timestamp}`).then((res) => {
            if (res.ids.length === 0) {
                this.setState({
                    initLoading: false
                })
            } else {

                Songdetail(`/song/detail?ids=${res.ids}&timestamp=${timestamp}`).then((even) => {
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
        })
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
                        <Space size="middle">
                            <Space style={{ minWidth: 25 }}>
                                <span style={{ color: "#999", marginRight: 8 }}>{record.index + 1}</span>
                            </Space>
                            {/*用()=>执行 然后传值 */}
                            <HeartTwoTone twoToneColor="#ff0000" onClick={() => this.nolike(record.key)} style={{ cursor: 'pointer' }} />
                            <IconFont type="icon-download" onClick={() => this.download(record.key, record.name, record.singer)} style={{ cursor: 'pointer' }} />

                        </Space>

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
                {
                    localStorage.getItem('token') ? (
                        <Table columns={columns} locale={{ emptyText: "暂无数据" }}
                            loading={{
                                spinning: this.state.initLoading,
                                tip: "加载中..."
                            }} dataSource={this.state.Listdata} size="Default" onRow={record => {
                                return {
                                    onDoubleClick: event => { this.xuanTitle(record) }, // 双击行
                                    // onContextMenu: event => { this.download(event, record) },//右键
                                };
                            }} pagination={{ position: ['bottomCenter'], showTotal: () => `共${this.state.Listdata.length}条`, }} />
                    ) : <Redirect to="/"/>
                }



            </div>

        );
    }
}




export default connect(store => ({ musiclists: store.musiclists.list }), { MusList })(LoveMusicList);

