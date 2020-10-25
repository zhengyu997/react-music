import React, { Component } from 'react';

import LoveMusicLists from "../MusicList/LoveMusicList"


class Lovemusic extends Component {
    constructor(...props) {
        super(...props);
        this.state = {

        };
    }
    render() {
        return (
            <div>
             
                <LoveMusicLists />
            </div>
        );
    }
}

export default Lovemusic;