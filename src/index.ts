import { toAsyncAwait } from './utils/async'
import request from './utils/request'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

const port = process.env.PORT || 3000
const app = new Koa()
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World!'
})

router.get('/user', async (ctx, next) => {
  ctx.body = 'Hello User!'
})

router.post('/feedback', async (ctx, next) => {
  let data = ctx.request.body
  console.log('data =>', data)
  ctx.body = data
})

router.get('/chat', async (ctx, next) => {
  const url = 'https://api.openai.com/v1/completions'
  const options = {
    method: 'POST',
    url,
    headers: {
      Authorization:
        'Bearer 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',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      // gpt-3.5-turbo
      prompt: '这是一条测试消息',
      max_tokens: null,
      temperature: 1,
      n: 1,
    }),
  }
  const [status, data] = await toAsyncAwait(request(url, options))
  if (status) {
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data,
    }
  } else {
    ctx.body = {
      code: 500,
      msg: '请求失败',
      data,
    }
  }
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

console.log('port => ', port)

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`)
})
