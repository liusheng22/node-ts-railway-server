import request from 'request'

/**
 * fetch请求
 * @param {*} url
 * @param {*} options
 * @returns Promise
 */
export default (url, options) => {
  const { method, body } = options || {}

  // 设置 body
  if (body && typeof body === 'object') {
    options.body = JSON.stringify(body)
  }

  // 如果是POST请求，设置Content-Type
  if (method && method.toUpperCase() === 'POST') {
    options.headers = {
      'Content-Type': 'application/json',
    }
  }

  return new Promise((resolve, reject) => {
    request(url, options, (error, response, resBody) => {
      if (!error && response.statusCode === 200) {
        let obj = {}
        try {
          obj = JSON.parse(resBody)
        } catch (err) {
          obj = { msg: resBody }
          reject(err)
        }
        resolve(obj)
      } else {
        reject(error)
      }
    })
  })
}
