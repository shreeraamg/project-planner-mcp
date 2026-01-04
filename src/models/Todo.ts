import { model, Schema } from 'mongoose'

export interface ITodo {
  id: string
  projectId: string
  title: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  description: string
  createdAt: Date
  updatedAt: Date
}

const todoSchema = new Schema<ITodo>({
  id: { type: String, required: true, unique: true },
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
  priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' },
  description: { type: String, default: '' },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
})

const Todo = model<ITodo>('Todo', todoSchema, 'todos')

export default Todo