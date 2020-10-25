import 'core-js/es/map';
import 'core-js/es/set';
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as MobxProvider } from 'react-keep-alive';
import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import store from "../src/redux/store"
//全局配置中文
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

//引入组件
import Register from "../src/header/register"
import Login from "../src/header/login"
import Modify from "../src/header/modify"
import App from './App';


moment.locale('zh-cn')
// function render() {
ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Provider store={store}>
      <MobxProvider>
        <Router >
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/modify" component={Modify} />
            <Route component={App} />


          </Switch>
        </Router>
      </MobxProvider>
    </Provider>
  </ConfigProvider>
  ,
  document.getElementById('root')
);
// }
// render()
// store.subscribe(render)



