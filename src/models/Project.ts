import { model, Schema } from 'mongoose'

export interface IProject {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
})

const Project = model<IProject>('Project', projectSchema, 'projects')

export default Project
