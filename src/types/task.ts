export type TaskId = string

export interface Task {
  title: string,
  content: string,
  status: 'done' | 'pending' | 'ongoing'
}

export interface TaskWithId extends Task {
  id: TaskId
}