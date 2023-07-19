import { PencilIcon, SaveIcon, TrashIcon } from "@heroicons/react/outline";
import {
	Bold,
	Button,
	Card,
	Select,
	SelectItem,
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

import React, { FormEvent, JSXElementConstructor, useState } from "react";
import { useAppSelector } from "../hooks/store";
import { TaskEditInputs, TaskId } from "../types/task";
import { STATUS, setBadgeStatus } from "./utils/badge";

export const Tasks = () => {
	const tasks = useAppSelector((store) => store.tasks);
	const DEFAULT_STATE_INPUT: TaskEditInputs[] = tasks.map((task) => ({
		id: task.id,
		isSomeChange: false,
		isBeingEdited: false,
		values: {
			title: task.title,
			status: task.status,
			content: task.content,
		},
	}));
	const [editInputs, setEditInputs] = useState(DEFAULT_STATE_INPUT);

	const handlerOnChange = (
		id: TaskId,
		keyName: string,
		value: string | FormEvent<HTMLDivElement>,
	) => {
		const updateEditInputs = editInputs.map((input) => {
			if (input.id === id) {
				input.isSomeChange = true;
				input.values = {
					...input.values,
					[keyName]: value,
				};
			}
			return input;
		});

		setEditInputs(updateEditInputs);
	};

	const handlerEdit = (id: TaskId) => {
		const updateEditInputs = editInputs.map((input) => {
			if (input.id === id) {
				input.isBeingEdited = !input.isBeingEdited;
			}
			return input;
		});

		setEditInputs(updateEditInputs);
	};

	const handlerSubmitEdit = (id: TaskId) => {
		const updateEditInputs = editInputs.map((input) => {
			if (input.id === id) {
				input.isBeingEdited = false;
				input.isSomeChange = false;
			}
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
					{editInputs.map(({ id, isSomeChange, isBeingEdited, values }) => (
						<TableRow key={id}>
							<TableCell>
								{isBeingEdited ? (
									<TextInput
										name="title"
										onKeyUp={(e) => {
											if (e.keyCode === 13) handlerSubmitEdit(id);
										}}
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
							<TableCell>
								{isBeingEdited ? (
									<Select
										icon={
											STATUS.find((e) => e.name === values.status)
												?.icon as JSXElementConstructor<React.ElementType>
										}
										value={values.status}
										onChange={(e) => handlerOnChange(id, "status", e)}
									>
										{STATUS.map((status) => (
											<SelectItem
												key={status.name}
												color={status.color}
												icon={status.icon}
												value={status.name}
											>
												{status.name}
											</SelectItem>
										))}
									</Select>
								) : (
									<>{setBadgeStatus(values.status)}</>
								)}
							</TableCell>
							<TableCell>
								<Text>{values.content}</Text>
							</TableCell>
							<TableCell className="flex gap-2">
								<Button
									tooltip="edit"
									size="md"
									variant="light"
									icon={PencilIcon}
									onClick={() => handlerEdit(id)}
									disabled={isSomeChange}
								/>
								<Button
									tooltip="remove"
									size="md"
									variant="light"
									icon={TrashIcon}
									disabled={isBeingEdited}
								/>
								{isBeingEdited && (
									<Button
										loading={!isSomeChange}
										icon={SaveIcon}
										onClick={() => handlerSubmitEdit(id)}
									>
										Guardar
									</Button>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};
