// 接口请求的函数
import ajax from './ajax'
import axios from './ajax';
//将JSON格式的请求体参数转化 为urlencodeed形式
import qs from 'qs'
import josnp from 'jsonp'
import { message } from 'antd';
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

//请求天气
export const reqWeather = (city) => {
    return new Promise((resove,reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        josnp(
          url, {},
          (err, data) => {
            if (!err && data.error === 0) {
              const {dayPictureUrl,weather}=data.results[0].weather_data[0]
              resove({dayPictureUrl,weather})
            } else {
              message.error('获取天气失败')
            }
          }
        )
    })
}

//获取分类列表
export const reqCategorys = () => ajax('/manage/category/list')

// 添加分类
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {
  categoryName
})

// 修改分类
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax.post('/manage/category/update', {
  categoryId,
  categoryName
})

/* 获取商品分页列表 */
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {
  params: { // 包含所有query参数的对象
    pageNum,
    pageSize
  }
})