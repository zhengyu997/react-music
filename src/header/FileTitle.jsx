import React, { Component } from 'react';
// import { withRouter } from "react-router-dom"


import Search from "../content/Search"
class FileTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    // componentDidUpdate() {
    //           console.log(this.props.match.params)
    // }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <Search />
            </div>
        );
    }
}

export default FileTitle;