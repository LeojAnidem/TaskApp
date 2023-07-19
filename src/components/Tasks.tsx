import { PencilIcon, SaveIcon, TrashIcon } from "@heroicons/react/outline";
import {
	Bold,
	Button,
	Card,
	Flex,
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
				input.values = {
					...input.values,
					[keyName]: value,
				};

				const someInputEmpty = Object.values(input.values).some((val) => val === '')
				input.isSomeChange = !someInputEmpty ? true : false;
			}
			return input;
		});

		setEditInputs(updateEditInputs);
	};

	const handlerEdit = (id: TaskId) => {
		const oldStateValue = tasks.find((task) => task.id === id);
		const updateEditInputs = editInputs.map((input) => {
			if (input.id === id) {
				input.isBeingEdited = !input.isBeingEdited;
				(Object.keys(input.values) as Array<keyof typeof input.values>).map((key) => {
					if (input.values[key] === '' && key !== 'status' && typeof oldStateValue !== 'undefined') {
						input.values[key] = oldStateValue[key]
					}
				})
			}
			return input;
		});

		setEditInputs(updateEditInputs);
	};

	const handlerEnter = (id: TaskId, keyCode: number, value: string) => {
		if (keyCode !== 13 || value === "") return;
		handlerSubmitEdit(id);
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
										className="!bg-dark-tremor-border"
										maxLength={23}
										icon={PencilIcon}
										name="title"
										onKeyUp={({ keyCode, target }) =>
											handlerEnter(
												id,
												keyCode,
												(target as HTMLButtonElement).value,
											)
										}
										onChange={({ target }) =>
											handlerOnChange(id, target.name, target.value)
										}
										value={values.title}
									/>
								) : (
									<Bold>{values.title}</Bold>
								)}
							</TableCell>
							<TableCell className={`${isBeingEdited && "w-48"}`}>
								{isBeingEdited ? (
									<div className="absolute">
										<div className="relative">
											<Select
												className="absolute w-40 -top-5 -left-1"
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
										</div>
									</div>
								) : (
									<>{setBadgeStatus(values.status)}</>
								)}
							</TableCell>
							<TableCell>
								{isBeingEdited ? (
									<TextInput
										className="!bg-dark-tremor-border"
										maxLength={30}
										icon={PencilIcon}
										name="content"
										onKeyUp={({ keyCode, target }) =>
											handlerEnter(
												id,
												keyCode,
												(target as HTMLButtonElement).value,
											)
										}
										onChange={({ target }) =>
											handlerOnChange(id, target.name, target.value)
										}
										value={values.content}
									/>
								) : (
									<Text>{values.content}</Text>
								)}
							</TableCell>
							<TableCell>
								<Flex justifyContent="start">
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
								</Flex>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};
