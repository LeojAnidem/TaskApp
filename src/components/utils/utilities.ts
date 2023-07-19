import { TaskEditInputs, TaskWithId } from "../../types/task";

// Verifica que ningun input este vacio
export const someObjectKeysEmpty = (obj: object) => {
	return Object.values(obj).some((val) => val === "");
};

// Transforma una arreglo de tasks en Arreglo de objetos con
// parametros a usar por los inputs
export const parseTasksToInputs = (tasks: TaskWithId[]): TaskEditInputs[] => {
	return tasks.map((task) => ({
		id: task.id,
		isSomeChange: false,
		isBeingEdited: false,
		values: {
			title: task.title,
			status: task.status,
			content: task.content,
		},
	}));
};