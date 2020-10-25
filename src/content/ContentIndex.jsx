import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter, Redirect } from "react-router-dom"
import { KeepAlive } from 'react-keep-alive';


import Index from "./Index"
import Recommend from "./recommend/index"
import Video from "./video/index"
import Friend from "./friend/index"
import Lovemusic from "./Lovemusic"
import SearchMusicList from "../MusicList/SearchMusicList"
import AddPlaylist from "../MusicList/AddPlaylist"
import Everyday from './everyDay/index'

import "../style/style.css"

class ContentIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }


    render() {

        return (
            <div >

                <div className="site-layout-background" style={{ padding: '0 24px 24px', minHeight: "62vh", position: "relative" }}>

                    <Switch>

                        <Route exact path="/recommend" component={Recommend} />
                        <Route exact path="/video" component={Video} />
                        <Route exact path="/friend" component={Friend} />
              
                        <Route exact path="/lovemusic" component={Lovemusic} />
                        <Route path="/lovemusic/addplaylist" component={AddPlaylist} />
                        <Route path="/search" component={SearchMusicList} />

                        <Route path="/everyday"  >
                            <KeepAlive name="everyday">
                                <Router>
                                    <Everyday />
                                </Router>
                            </KeepAlive>
                        </Route>
                        <Route component={Index} />
                        <Redirect to="/" />
                    </Switch>

                </div>
            </div>
        );
    }
}

export default withRouter(ContentIndex);