import { PencilIcon, SaveIcon, TrashIcon } from "@heroicons/react/outline";
import {
	Bold,
	Button,
	Card,
	Divider,
	Flex,
	Metric,
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

import React, {
	FormEvent,
	JSXElementConstructor,
	useEffect,
	useState,
} from "react";
import { useAppSelector } from "../hooks/store";
import { useTasksActions } from "../hooks/useTasksActions";
import { TaskId } from "../types/task";
import { STATUS, setBadgeStatus } from "./utils/badge";
import { parseTasksToInputs, someObjectKeysEmpty } from "./utils/utilities";

export const Tasks = () => {
	const tasks = useAppSelector((store) => store.tasks);
	const { edit, deleteById } = useTasksActions();

	const DEFAULT_STATE_INPUT = parseTasksToInputs(tasks);
	const [editInputs, setEditInputs] = useState(DEFAULT_STATE_INPUT);

	// Cada que la store se actualice se volvera a establecer el valor
	// de editInputs (Tasks en pantalla)
	useEffect(() => {
		setEditInputs(parseTasksToInputs(tasks));
	}, [tasks]);

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
				input.isSomeChange = !someObjectKeysEmpty(input.values) ? true : false;
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

				const needOldValues =
					someObjectKeysEmpty(input.values) &&
					typeof oldStateValue !== "undefined";

				if (needOldValues) input.values = oldStateValue;
			}
			return input;
		});

		setEditInputs(updateEditInputs);
	};

	const handlerEnter = (id: TaskId, keyCode: number) => {
		const idInputVals = editInputs.find((input) => input.id === id)?.values;

		const isValidSubmit =
			keyCode === 13 &&
			typeof idInputVals !== "undefined" &&
			!someObjectKeysEmpty(idInputVals);

		if (!isValidSubmit) return;
		handlerSubmit(id);
	};

	const handlerSubmit = (id: TaskId) => {
		const updateEditInputs = editInputs.map((input) => {
			if (input.id === id) {
				// ... space for dispatch edit task by id in reducer
				const newTaskId = {
					id: input.id,
					...input.values,
				};
				edit(newTaskId);

				input.isBeingEdited = false;
				input.isSomeChange = false;
			}
			return input;
		});

		setEditInputs(updateEditInputs);
	};

	const handlerRemove = (id: TaskId) => deleteById(id);

	return (
		<Card>
			<Metric>Tasks</Metric>
			<Divider />
			<Table className="overflow-y-auto overflow-x-hidden !max-h-[350px] scroll">
				<TableHead>
					<TableRow className="header_table">
						<TableHeaderCell>
							<Title>Title</Title>
						</TableHeaderCell>
						<TableHeaderCell>
							<Title>Status</Title>
						</TableHeaderCell>
						<TableHeaderCell>
							<Title>Content</Title>
						</TableHeaderCell>
						<TableHeaderCell>
							<Title>Actions</Title>
						</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody className="table_elements">
					{editInputs.map(({ id, isSomeChange, isBeingEdited, values }) => (
						<TableRow key={id}>
							<TableCell>
								{isBeingEdited ? (
									<TextInput
										className="!bg-dark-tremor-border"
										maxLength={23}
										icon={PencilIcon}
										name="title"
										onKeyUp={({ keyCode }) => handlerEnter(id, keyCode)}
										onChange={({ target }) =>
											handlerOnChange(id, target.name, target.value)
										}
										value={values.title}
									/>
								) : (
									<Bold>{values.title}</Bold>
								)}
							</TableCell>
							<TableCell className={`${isBeingEdited && "w-48"} select_bx`}>
								{isBeingEdited ? (
									<Select
										className="select"
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
								{isBeingEdited ? (
									<TextInput
										className="!bg-dark-tremor-border"
										maxLength={42}
										icon={PencilIcon}
										name="content"
										onKeyUp={({ keyCode }) => handlerEnter(id, keyCode)}
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
										onClick={() => handlerRemove(id)}
										disabled={isBeingEdited}
									/>
									{isBeingEdited && (
										<Button
											loading={!isSomeChange}
											icon={SaveIcon}
											onClick={() => handlerSubmit(id)}
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
