import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskId, TaskWithId } from "../../../types/task";

const DEFAULT_STATE: TaskWithId[] = [
	{
		id: "1",
		title: "Tarea #1",
		content: "El contenido de esta tarea esta terminado",
		status: "done",
	},
	{
		id: "2",
		title: "Tarea #2",
		content: "El contenido de esta tarea esta pendiente",
		status: "pending",
	},
	{
		id: "3",
		title: "Tarea #3",
		content: "El contenido de esta tarea esta en curso",
		status: "ongoing",
	},
	{
		id: "4",
		title: "Tarea #4",
		content: "El contenido de esta tarea esta terminado",
		status: "done",
	},
	{
		id: "5",
		title: "Tarea #5",
		content: "El contenido de esta tarea esta pendiente",
		status: "pending",
	}
];

export const taskSlice = createSlice({
	name: "tasks",
	initialState: DEFAULT_STATE,
	reducers: {
		addTask: (state, action: PayloadAction<Task>) => {
			const { payload } = action
			const newTask: TaskWithId = {
				id: crypto.randomUUID(),
				...payload
			}
			state .push(newTask)
		},
		deleteTaskById: (state, action: PayloadAction<TaskId>) => {
			const id = action.payload
			const newState = state.filter(task => task.id !== id)
			return [...newState]
		},
		editTask: (state, action: PayloadAction<TaskWithId>) => {
			const { payload } = action;
			return state.map((task) => {
				if (task.id === payload.id) return { ...payload };
				return task
			});
		},
	},
});

export default taskSlice.reducer;
export const { addTask, deleteTaskById, editTask } = taskSlice.actions;
