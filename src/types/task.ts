import { Color } from "@tremor/react";

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

export interface TaskEditInputs {
	id: TaskId;
	isBeingEdited: boolean;
	isSomeChange: boolean;
	values: Task;
}

export interface BadgeStatus {
	name: TaskStatus;
	color: Color;
	icon: React.ElementType;
}
