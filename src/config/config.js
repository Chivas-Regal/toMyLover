const fetch = require('node-fetch')
// var sendMessage = reqiure('../sendMessage')
// import fetch from 'node-fetch'
const params = {
  appid: 'wx52becdd5e225a35f',
  secret: 'f2c1571225d22855797cbe6a8e8e91fb',
  touser: 'owLw-5ijZBB2GxgMT9jheAXjqpzU',
  template_id: 'JthZOXjbbUSG-CUPnmny2D93p4vnSos1DOB713CVN4c',
}

const api_url = 'https://devapi.qweather.com/v7/weather/3d?location=101180101&key=30a8036a37ae4bacadfac7b6bcf24bed'

// 获取列表信息
async function getHigh () {
    // 提取天气 api
    const response = await fetch(api_url)
    const data = await response.json()
    // 提取日期
    const today = new Date();
    const year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate();
    const weekday_number = today.getDay();
    let weekday = ''
    if (weekday_number == 0) weekday = '日';
    if (weekday_number == 1) weekday = '一';
    if (weekday_number == 2) weekday = '二';
    if (weekday_number == 3) weekday = '三';
    if (weekday_number == 4) weekday = '四';
    if (weekday_number == 5) weekday = '五';
    if (weekday_number == 6) weekday = '六';
    // 恋爱时间
    const LoveTime = parseInt((new Date() - Date.parse('2022/10/11'))/1000/60/60/24)+1
    return {
        data: {
          nowDate: {
            value: '今天是 ' + year + '/' + month + '/' + today.getDate() + ' 周' + weekday,
            color: '#57E6E2',
          },
          weather: {
            value: '白天' + data.daily[0].textDay + ' 晚间' + data.daily[0].textNight,
            color: '#FFCCFF'
          },
          city: {
            value: '郑州',
            color: '#9CA2A0',
          },
          low: {
            value: data.daily[0].tempMin,
            color: '#7CD47D',
          },
          high: {
            value: data.daily[0].tempMax,
            color: '#CBA476',
          },
          loveDate: {
            value: LoveTime,
            color: '#FF0033',
          },
        },
      }
}

// async function getLow () {
//     const response = await fetch(api_url)
//     const data = await response.json()
//     data2 = data.daily[0].tempMin
//     // return data.daily[0].tempMin
// }
// getHigh ()
// getLow ()

// const listConfig = {
//   data: {
//     nowDate: {
//       value: '今天是 2022/08/20 周天 ',
//       color: '#57E6E2',
//     },
//     city: {
//       value: '北京',
//       color: '#9CA2A0',
//     },
//     low: {
//       value: '',
//       color: '#7CD47D',
//     },
//     high: {
//       value: '',
//       color: '#CBA476',
//     },
//     loveDate: {
//       value: '999',
//       color: '#AEC5C8',
//     },
//   },
// }

/* 上述代码是需要自定义的配置项 */
function verifyEmpty() {
  var flag = ''
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      if (!params[key]) {
        flag = key
        break
      }
    }
  }
  return flag
}

// 校验为空
if (verifyEmpty()) {
  console.error(
    '警告：请完善 “/src/config/config.js中的配置项: ' +
      verifyEmpty() +
      '”的内容,再执行代码！'
  )
  process.exit(0)
}

module.exports = {
  params,
//   listConfig,
  getHigh
}
