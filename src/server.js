import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'


const server = http.createServer(async (req,res) => {
    const { method, url } = req

    await json(req,res)

    const route = routes.find(route => {
        return route.method === method && url.match(route.path)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        req.params = { ...routeParams.groups }
        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req,res)
    }

    return Response.writeHead(404).end('Not Found')
})

server.listen(3333, () => console.log("Server is Running"));