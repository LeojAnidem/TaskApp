import {
	ExclamationCircleIcon,
	PencilIcon,
	StatusOfflineIcon,
	StatusOnlineIcon,
	TrashIcon,
} from "@heroicons/react/outline";
import {
	Badge,
	Bold,
	Button,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Text,
	TextInput,
	Title,
} from "@tremor/react";

import { useState } from "react";
import { useAppSelector } from "../hooks/store";
import { Task, TaskId, TaskStatus } from "../types/task";

export interface TaskEditInputs {
	id: TaskId;
	isBeingEdited: boolean;
	values: Task;
}

export const Tasks = () => {
	const tasks = useAppSelector((store) => store.tasks);

	const DEFAULT_STATE_INPUT: TaskEditInputs[] = tasks.map((task) => ({
		id: task.id,
		isBeingEdited: false,
		values: {
			title: task.title,
			status: task.status,
			content: task.content,
		},
	}));

	const [editInputs, setEditInputs] = useState(DEFAULT_STATE_INPUT);

	const setBadgeStatus = (status: TaskStatus) => {
		switch (status) {
			case "done":
				return (
					<Badge color="emerald" icon={StatusOnlineIcon}>
						{status}
					</Badge>
				);
			case "ongoing":
				return (
					<Badge color="orange" icon={ExclamationCircleIcon}>
						{status}
					</Badge>
				);
			case "pending":
				return (
					<Badge color="red" icon={StatusOfflineIcon}>
						{status}
					</Badge>
				);
		}
	};

	const handlerOnChange = (id: TaskId, keyName: string, value: string) => {
		const updateEditInputs = editInputs.map((input) => {
			if (input.id === id) {
				input.values = {
					...input.values,
					[keyName]: value,
				};
			}
			return input;
		});

		setEditInputs(updateEditInputs);
	};

	const handlerEditBtn = (id: TaskId) => {
		const updateEditInputs = editInputs.map((input) => {
			if (input.id === id) input.isBeingEdited = !input.isBeingEdited;
			return input;
		});

		setEditInputs(updateEditInputs);
	};

	return (
		<Card>
			<Title>Tasks</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Title</TableHeaderCell>
						<TableHeaderCell>Status</TableHeaderCell>
						<TableHeaderCell>Content</TableHeaderCell>
						<TableHeaderCell>Actions</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{editInputs.map(({ id, isBeingEdited, values }) => (
						<TableRow key={id}>
							<TableCell>
								{isBeingEdited ? (
									<TextInput
										name="title"
										onChange={(e) =>
											handlerOnChange(id, e.target.name, e.target.value)
										}
										placeholder={values.title}
										value={values.title}
									/>
								) : (
									<Bold>{values.title}</Bold>
								)}
							</TableCell>
							<TableCell>{setBadgeStatus(values.status)}</TableCell>
							<TableCell>
								<Text>{values.content}</Text>
							</TableCell>
							<TableCell className="flex gap-2">
								<Button
									tooltip="edit"
									size="md"
									variant="light"
									icon={PencilIcon}
									onClick={() => handlerEditBtn(id)}
								/>
								<Button
									tooltip="remove"
									size="md"
									variant="light"
									icon={TrashIcon}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};
