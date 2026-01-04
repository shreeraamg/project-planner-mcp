import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import Project from '../models/Project'

function createProject(server: McpServer) {
  server.registerTool(
    'create_project',
    {
      title: 'Create Project',
      description: 'Creates a new project with the given name and description.',
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

export default createProject
