import {
	MenuAlt2Icon,
	PencilIcon,
	PlusCircleIcon,
	XCircleIcon,
} from "@heroicons/react/solid";
import {
	Badge,
	Button,
	Card,
	Divider,
	Flex,
	Icon,
	Metric,
	Select,
	SelectItem,
	TextInput,
	TextInputProps,
	Title,
} from "@tremor/react";
import { FormEvent, JSXElementConstructor, useState } from "react";
import { useTasksActions } from "../hooks/useTasksActions";
import { Task } from "../types/task";
import { STATUS } from "./utils/badge";
import { someObjectKeysEmpty } from "./utils/utilities";

export interface InputWithTitle extends TextInputProps {
	text: string;
	placeholder?: string;
	icon?: React.ElementType;
}

const InputWithTitle = ({
	text,
	icon,
	placeholder,
	...props
}: InputWithTitle) => {
	return (
		<Flex flexDirection="col" alignItems="start" className="gap-3">
			<Title className="flex gap-2 items-center">
				{icon && <Icon size="xs" variant="light" icon={icon} />}
				{text}
			</Title>
			<TextInput
				className="!bg-dark-tremor-background-subtle"
				placeholder={placeholder ?? "Text Here..."}
				{...props}
			/>
		</Flex>
	);
};

export const AddTask = () => {
	interface AddInputs {
		values: Task;
		someInputEmpty: boolean;
	}

	const INITIAL_STATE: AddInputs = {
		values: {
			title: "",
			status: "pending",
			content: "",
		},
		someInputEmpty: false,
	}

	const { add } = useTasksActions();
	const [addInputs, setAddInputs] = useState(INITIAL_STATE);

	const handlerOnChange = (
		keyName: string,
		value: string | FormEvent<HTMLDivElement>,
	) => {
		setAddInputs((prev) => ({
			...prev,
			values: {
				...prev.values,
				[keyName]: value,
			},
			someInputEmpty: false,
		}));
	};

	const handlerSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (someObjectKeysEmpty(addInputs.values)) {
			setAddInputs((prev) => ({
				...prev,
				someInputEmpty: true,
			}));
			return;
		}

		add({ ...addInputs.values });
		setAddInputs(INITIAL_STATE)
	};

	return (
		<Card>
			<form onSubmit={(e) => handlerSubmit(e)}>
				<Metric className="flex gap-2">Add Task</Metric>
				<Divider />
				<Flex flexDirection="col" className="gap-5">
					<InputWithTitle
						text="Title"
						name="title"
						icon={PencilIcon}
						maxLength={23}
						placeholder="Write title here..."
						onChange={({ target }) =>
							handlerOnChange(target.name, target.value)
						}
						value={addInputs.values.title}
					/>
					<InputWithTitle
						text="Content"
						name="content"
						icon={MenuAlt2Icon}
						maxLength={42}
						placeholder="Write Content here..."
						onChange={({ target }) =>
							handlerOnChange(target.name, target.value)
						}
						value={addInputs.values.content}
					/>
					<div className="relative w-full h-9">
						<div className="relative">
							<Select
								icon={
									STATUS.find((e) => e.name === addInputs.values.status)
										?.icon as JSXElementConstructor<React.ElementType>
								}
								value={addInputs.values.status}
								onChange={(e) => handlerOnChange("status", e)}
							>
								{STATUS.map((status) => (
									<SelectItem
										className="cursor-pointer"
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
				</Flex>
				<Divider />
				<Flex flexDirection="col" justifyContent="start" className="gap-4">
					{addInputs.someInputEmpty && (
						<Badge color="red" icon={XCircleIcon}>
							Fill in all fields!
						</Badge>
					)}
					<Button
						icon={PlusCircleIcon}
						type="submit"
						disabled={addInputs.someInputEmpty}
					>
						Save
					</Button>
				</Flex>
			</form>
		</Card>
	);
};
