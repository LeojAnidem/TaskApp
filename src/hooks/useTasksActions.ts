import { addTask, deleteTaskById, editTask } from "../store/features/tasks/slice"
import { TaskId, Task, TaskWithId } from "../types/task"
import { useAppDispatch } from "./store"

export const useTasksActions = () => {
  const dispatch = useAppDispatch()
  
  const add = ({title, status, content}: Task) => {
    dispatch(addTask({title, status, content}))
  }

  const edit = ({id, title, status, content}: TaskWithId) => {
    dispatch(editTask({id, title, status, content}))
  }

  const deleteById = (id: TaskId) => {
    dispatch(deleteTaskById(id))
  }

  return {add, edit, deleteById}
}