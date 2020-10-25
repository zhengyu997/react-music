import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { Input, AutoComplete, message } from 'antd';
import { connect } from "react-redux"
import { Seach } from "../redux/actions"

import { HotList } from '../api/api'


const renderItem = (title, id) => ({
    value: title.searchWord,
    label: (
        <div className="HotSearch">
            <div>
                <span className="HotID" >{id + 1}

                </span>
                <p style={{ fontWeight: 'bold', marginBottom: 6 }}> {title.searchWord}
                    <span style={{ fontWeight: '300', color: "#ccc", marginLeft: 10, marginRight: 10, }}>{title.score} </span>
                    <img src={title.iconUrl} style={{ width: "auto", height: 15 }} alt='' />
                </p>
                <span style={{ color: "#999" }}>  {title.content} </span>
            </div>

        </div>
    ),
});

class Searchs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [{
                label: '热搜榜',
            }],
            Listdata: [],
            initLoading: false,
            open: false,
            searchV: "",

        };
    }

    componentDidMount() {

        this.HotListrequest();
        this.props.history.listen((res) => {
            let Urlname = decodeURIComponent(res.search.substring(6))
            this.setState({ searchV: Urlname })
            // console.log("路由变化",Urlname)
            this.props.Seach(Urlname)
        })
        this.setState({ searchV: decodeURIComponent(this.props.location.search.substring(6)) })
    }


    HotListrequest = () => {
        /*热搜榜 */
        HotList("/search/hot/detail").then((res) => {
            let datas = res.data;
            // console.log(111,datas)
            let Hotmusic = datas.map((item) => {
                return { searchWord: item.searchWord, content: item.content, score: item.score, iconUrl: item.iconUrl }
            })
            let arr = []
            for (let i = 0; i < Hotmusic.length; i++) {
                let obj = renderItem(Hotmusic[i], i)  //在里面定义对象
                arr.push(obj)
            }
            // console.log(arr)
            this.setState({
                options: [{
                    label: '热搜榜',
                    options: arr,
                }]
            })
        }).catch(function (error) {

            message.error("热搜错误" + error)
        });
    }
    onSelect = (value) => {
        this.requestMusic(value)

    }

    clickValue = (value) => {
        if (value.length !== 0) {
            this.requestMusic(value)
        }

    }
    requestMusic = (value) => {
        //  this.props.history.replace(`/search?s=${value}`);


        this.props.history.push({
            pathname: '/search',
            search: `?name=${decodeURIComponent(value)}`,
        });

        this.props.Seach(value)


        // console.log(str)
    }
    inputValue = (e) => {
        this.setState({ searchV: e })

    }

    render() {
        return (
            <div className="SearchHeader">


                <div style={{ height: 66 }}>
                    {/* <h3>搜索</h3> */}
                    <AutoComplete
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={500}
                        style={{
                            width: 500,
                            margin: "0 auto",
                            left: 0,
                            right: 0,
                            position: "absolute"

                        }}
                        value={this.state.searchV}
                        onChange={this.inputValue}
                        onSelect={this.onSelect}
                        defaultOpen={this.state.open}
                        options={this.state.options}
                    >
                        <Input.Search size="large" placeholder="搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户" enterButton onSearch={this.clickValue} />
                    </AutoComplete>
                </div>

            </div>
        );
    }
}

export default connect(store => ({ musiclists: store.SeachMusic.list }), { Seach })(withRouter(Searchs));
// export default withRouter(Searchs);