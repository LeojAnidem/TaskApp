export type TaskId = string;
export type TaskStatus = "done" | "pending" | "ongoing";

export interface Task {
	title: string;
	content: string;
	status: TaskStatus;
}

export interface TaskWithId extends Task {
	id: TaskId;
}
