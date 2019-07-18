// 接口请求的函数
import ajax from './ajax'
import axios from './ajax';
//将JSON格式的请求体参数转化 为urlencodeed形式
import qs from 'qs'

// export function reqLogin (username,password){
//    return axios(
//         {
//             method: 'post',
//             url: '/login',
//             data: {
//              username,
//              password
//             }
//             // post请求携带参数默认是json，需转urlencoded格式
//             // data:qs.stringify({username,password})
//         }
//     )
// }

export const reqLogin = (username,password)=>(ajax.post('/login',{username,password}))
reqLogin('admin','admin')
// .then(resault=>{
//     console.log(resault,'请求成功')
// },error=>{
//     console.log('请求失败'+error)
// })
