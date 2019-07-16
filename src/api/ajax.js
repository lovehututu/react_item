// 封装发ajax请求的函数
import axios from "axios";
import qs from 'qs'
import {message} from 'antd'


//请求拦截器（在真正请求前）
axios.interceptors.request.use(function (config) {
    //得到请求方式和请求数据并返回！
    const {method,data}= config;
    if(method.toLocaleLowerCase()==='post' && typeof data === 'object'){
        config.data = qs.stringify(data)
    }
    return config;
  });


// 添加响应拦截器，在请求返回之后，在.then指定回调之前
// 直接返回数据，统一处理异常错误
  axios.interceptors.response.use((response)=>{
    return response.data
  }, (err)=>{
    message.error('请求出错'+err.message)
    //返回pending状态的promise，中断promise链，.then不会执行
    return new Promise(()=>{});
  });
export default axios;