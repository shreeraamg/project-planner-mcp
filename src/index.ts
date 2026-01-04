import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import { config } from 'dotenv'
import db from './config/db'
import createProject from './tools/createProject'
import createTodo from './tools/createTodo'

config()
db()

export class MyMCP extends McpAgent {
  server = new McpServer({
    name: 'Project Planner MCP',
    version: '1.0.0'
  })

  async init() {
    // Register tools
    createProject(this.server)
    createTodo(this.server)
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url)

    if (url.pathname === '/sse' || url.pathname === '/sse/message') {
      return MyMCP.serveSSE('/sse').fetch(request, env, ctx)
    }

    if (url.pathname === '/mcp') {
      return MyMCP.serve('/mcp').fetch(request, env, ctx)
    }

    return new Response('Not found', { status: 404 })
  }
}
