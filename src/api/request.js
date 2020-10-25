import axios from 'axios'
// import {getToken} from './auth'
const instance = axios.create({
    // baseURL: 'http://127.0.0.1:4000',
    baseURL: 'http://api.taizzpx.com',
    // baseURL: 'http://zhengyu.zicp.vip',
    timeout: 9000
})


// instance.defaults.headers = {
//     'Authorization':'Basic cGxhdGZvcm1fbGljZW5zZV9hZG1pbjpod192ZGlfbGljZW5zZQ=='
// }
//请求发出前拦截
instance.interceptors.request.use(function(config) {
        // if(getToken()){
        //     //已经登录的请求头配置，主要用于登录成功后后台返回的token,做权限
        //     config.headers['Content-Type'] = 'application/json;charset=UTF-8';

        // }else{
        //     // 未登录的请求头配置
        // }
        return config;
    }, function(error) {
        return Promise.reject(error)
    })
    // 请求响应拦截
instance.interceptors.response.use(function(response) {
    return response.data;
}, function(error) {
    return Promise.reject(error)
})

// export function getAction(url,params){
//     return instance.get(url,{
//         params
//     })
// }

// export function post(url, data){
//      return instance.post(url,data)
// }
export function postAction(url, parameter) {
    return instance({
        url: url,
        method: 'post',
        data: parameter,
        withCredentials: true,
        xhrFields: { withCredentials: true },
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
}

// get
export function getAction(url, parameter) {

    return instance({
        url: url,
        method: 'get',
        params: parameter,
        withCredentials: true,
        xhrFields: { withCredentials: true }
    })

}
export function deleteAction(url, parameter) {

    return instance({
        url: url,
        method: 'delete',
        params: parameter,
        ithCredentials: true
    })
}
export function putAction(url, parameter) {
    return instance({
        url: url,
        method: 'put',
        data: parameter
    })
}