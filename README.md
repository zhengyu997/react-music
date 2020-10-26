# react 网易云音乐

## 按需引入
   ### 安装antd组件库  cnpm install --save antd
> 1. 安装依赖包：cnpm install babel-plugin-import customize-cra react-rewired --save
> 2. 在项目根目录新建 config-overrides.js 文件，写入以下内容：
>> const { override, fixBabelImports } = require('customize-cra'); 

                module.exports = override(
                fixBabelImports('import', {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: 'css',
                }),
                );    
>3.修改packages.json文件

            "scripts": {

                "start": "react-app-rewired start",

                "build": "react-app-rewired build",

                "test": "react-app-rewired test"

                }
--------------------------------
>**如果报错：'react-app-rewired' 不是内部或外部命令，也不是可运行的程序是因为版本问题重新安装合适版本启动即可：cnpm i react-app-rewired@2.0.2-next.0**   
>>>   import {Button}  from 'antd';` <Button type="primary">button</Button>`

>>>  网易云音乐 NodeJS 版 API[网易云音乐API](https://neteasecloudmusicapi.vercel.app/#/ "网易云音乐API") 

>>>>时间插件 npm install moment --save <br/>
>>>>可拖拽组件 npm install react-draggable --save
