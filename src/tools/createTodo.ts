import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import Todo from '../models/Todo'

function createTodo(server: McpServer) {
  server.registerTool(
    'create_todo',
    {
      title: 'Create Todo',
      description: 'Creates a new todo item under a specified project.',
      inputSchema: z.object({
        projectId: z.string().min(1),
        title: z.string().min(1).max(200),
        priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
        description: z.string().max(1000).optional()
      })
    },
    async ({ projectId, title, priority, description }) => {
      const todo = await Todo.create({
        id: crypto.randomUUID(),
        projectId,
        title,
        status: 'PENDING',
        priority: priority || 'LOW',
        description: description || '',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(todo, null, 2)
          }
        ]
      }
    }
  )
}

export default createTodo
