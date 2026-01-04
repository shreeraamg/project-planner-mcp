import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { McpAgent } from 'agents/mcp'
import { config } from 'dotenv'
import { z } from 'zod'
import db from './config/db'
import Project from './models/Project'

config()
db()

interface Todo {
  id: string
  projectId: string
  title: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  description: string
  createdAt: string
  updatedAt: string
}

export class MyMCP extends McpAgent {
  server = new McpServer({
    name: 'Project Planner MCP',
    version: '1.0.0'
  })

  async init() {
    this.server.registerTool(
      'create_project',
      {
        title: 'Create Project',
        description:
          'Creates a new project with the given name and description.',
        inputSchema: z.object({
          name: z.string().min(1).max(100),
          description: z.string().max(500).optional()
        })
      },
      async ({ name, description }) => {
        const project = await Project.create({
          id: crypto.randomUUID(),
          name,
          description: description || '',
          createdAt: new Date(),
          updatedAt: new Date()
        })

        return {
          content: [{ type: 'text', text: JSON.stringify(project, null, 2) }]
        }
      }
    )
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
