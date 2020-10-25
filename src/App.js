import React, { Component } from 'react';
import { Layout } from 'antd';


import Herder from "./header/HeaderIndex"
import FileTitle from "./header/FileTitle"
import ContentIndex from "./content/ContentIndex"
import MenuLeft from "../src/Menu/MenuLeft"
import BCrumb from "../src/Breadcrumb/BCrumb"
import FooterS from "../src/footer/Footer"
import PlayDemo from "./player/Play-demo"

import './App.css';

const { Header, Content } = Layout;


class App extends Component {
  state = {
    leftContent: "200px",
    Widthcont: "calc(100% - 200px)",
    WidthPlay: "calc(100% - 248px)",
  }
  getChildrenMsg = (e) => {
    if (e === true) {
      this.setState({
        leftContent: "80px",
        Widthcont: "calc(100% - 80px)",
        WidthPlay: "calc(100% - 128px)",
      })
    } else {
      this.setState({
        leftContent: "200px",
        Widthcont: "calc(100% - 200px)",
        WidthPlay: "calc(100% - 248px)",
      })
    }
  }

  componentDidMount() {
    if (localStorage.getItem("collapsed") === 'true') {
      this.getChildrenMsg(true);
    }


  }

  render() {

    return (
      <div className="App">
      
        <Herder />
        <Layout >
          <MenuLeft getChildrenMsg={this.getChildrenMsg} />
          <Layout className="site-layout " style={{ position: 'absolute', left: this.state.leftContent, transition: "all 0.2s", height: "100%", width: this.state.Widthcont }} >
            <Header className="site-layout-background" style={{ padding: 0, position: "fixed", zIndex: 999, width: this.state.Widthcont, transition: "all 0.2s" }} >
              <FileTitle />
            </Header>
            <Content style={{ margin: '62px 16px' }}>
              <BCrumb />
              <ContentIndex />
              <FooterS />
            </Content>
            <PlayDemo WidthPlay={this.state.WidthPlay} />

          </Layout>

        </Layout>





      </div >
    )
  };
}

export default App;

