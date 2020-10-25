import { postAction } from './request'



// 检测手机号码是否已注册
const PhoneLogin = (url) => postAction(url);
// 发送验证码
const PhoneCapTcha = (url) => postAction(url);
// 验证验证码
const PhoneYZCapTcha = (url) => postAction(url);
// 注册
const PhoneRegister = (url) => postAction(url);
//刷新登录
const RefreshLogin = () => postAction("/login/refresh");
//登录
const Login = (url) => postAction(url);
//退出
const Logout = () => postAction("/logout");
//热搜列表(详细)
const HotList = (url) => postAction(url);
//搜索(详细)
const Cloudsearch = (url) => postAction(url);
//获取音乐 url
const getMusicUrl = (url) => postAction(url);
//喜欢音乐
const Like = (url) => postAction(url);
//喜欢音乐列表
const Likelist = (url) => postAction(url);
//获取歌曲详情
const Songdetail = (url) => postAction(url);
//获取用户歌单名称
const Userplaylist = (url) => postAction(url);
//获取用户歌单列表
const PlaylistDetail = (url) => postAction(url);
//获取每日推荐歌曲
const RecommendSongs = (url) => postAction(url);
export {
    PhoneLogin,
    PhoneCapTcha,
    PhoneYZCapTcha,
    PhoneRegister,
    RefreshLogin,
    Login,
    Logout,
    HotList,
    Cloudsearch,
    getMusicUrl,
    Like,
    Likelist,
    Songdetail,
    Userplaylist,
    PlaylistDetail,
    RecommendSongs,
}