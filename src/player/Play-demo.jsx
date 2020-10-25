import React, { Component } from 'react';
import { connect } from "react-redux"
import { message } from 'antd';
import AudioPlay from "../player/AudioPlay"


class PlayDemo extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            musicList: [
                {
                    id: "1",
                    title: "请添加歌曲",
                    info: "",
                    resource: "",
                    time: "00:00",
                    img: "http://s4.music.126.net/style/web2/img/default/default_album.jpg"
                }
            ]
        };
    }
    // 删除指定音乐
    // onDeleteMusic = id => {
    //     const { musicList } = this.state;
    //     const newMusicList = [];
    //     musicList.forEach(item => {
    //         if (item.id !== id) {
    //             newMusicList.push(item);
    //         }
    //     });
    //     this.setState({ musicList: newMusicList });
    // };
    // // 删除全部音乐
    // onDeleteAllMusic = () => {
    //     this.setState({ musicList: [] });
    // }


    componentDidUpdate(prevProps) {

        if (prevProps.musiclists !== this.props.musiclists) {
            if (this.props.musiclists[0].resource === null) {
                message.info("暂时没有版权")
                this.setState({
                    musicList: [{
                        id: "1",
                        title: "暂时没有版权 ",
                        time: "00:00",
                        img: "http://s4.music.126.net/style/web2/img/default/default_album.jpg"
                    }]
                })
                this.getSwordButton.totalTime(); //自定义清空时间
                this.getSwordButton.onPause()  //暂停
            } else {
                // console.log('接收歌曲', this.props.musiclists)
                this.setState({
                    musicList: this.props.musiclists
                }, () => {
                  this.getSwordButton.onMusicListItemClick()  //歌单切歌
                  this.getSwordButton.onPlay()  //播放
                })


              
            }
        }

    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() {
        return (
            <div>
                <AudioPlay
                    musicList={this.state.musicList}
                    // onDeleteMusic={this.onDeleteMusic}
                    // onDeleteAllMusic={this.onDeleteAllMusic}
                    WidthPlay={this.props.WidthPlay}
                    ref={getSwordButton => this.getSwordButton = getSwordButton}
                />
            </div>
        );
    }
}
export default connect(store => ({ musiclists: store.musiclists }))(PlayDemo);
