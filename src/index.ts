import Koa from "koa"
import bodyParser from "koa-bodyparser"
import Router from "koa-router"

const port = process.env.PORT || 3000
const app = new Koa()
const router = new Router()

router.get("/", async (ctx, next) => {
	ctx.body = "Hello World!"
})

router.get("/user", async (ctx, next) => {
	ctx.body = "Hello User!"
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

console.log('port => ', port)

app.listen({ port }, () => {
	console.log(`🚀 Server ready at http://localhost:${port}`)
})
