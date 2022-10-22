const { params, getHigh } = require('./src/config/config')
const getToken = require('./src/getToken/index')
const sendMessage = require('./src/sendMessage/index')

async function start() {
  let access_token

  try {
    access_token = await getToken(params)
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
  let result = await getHigh()
  console.log('res',result);
  sendMessage({
    ...params,
    access_token,
    ...result,
  })
    .then((res) => {
      if (res.data && res.data.errcode) {
        console.error('发送失败', res.data)
        return
      }
      console.log('发送成功-请在微信上查看对应消息')
      console.table(res.config.data);
    })
    .catch((err) => console.error('发送失败', err))
}

start()
