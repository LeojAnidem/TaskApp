import { createSlice } from "@reduxjs/toolkit";
import { TaskWithId } from "../../../types/task";

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
];

export const taskSlice = createSlice({
	name: "tasks",
	initialState: DEFAULT_STATE,
	reducers: {
		addTask: (state, action) => {},
		deleteTaskById: (state, action) => {},
		editTask: (state, action) => {},
	},
});

export default taskSlice.reducer;
export const { addTask } = taskSlice.actions;
