import {
	ExclamationCircleIcon,
	StatusOfflineIcon,
	StatusOnlineIcon,
} from "@heroicons/react/outline";
import { Badge } from "@tremor/react";
import { BadgeStatus, TaskStatus } from "../../types/task";

export const STATUS: BadgeStatus[] = [
	{
		name: "done",
		color: "emerald",
		icon: StatusOnlineIcon,
	},
	{
		name: "ongoing",
		color: "orange",
		icon: ExclamationCircleIcon,
	},
	{
		name: "pending",
		color: "red",
		icon: StatusOfflineIcon,
	},
];

export const setBadgeStatus = (status: TaskStatus) => {
	const statusProperties = STATUS.find((item) => item.name === status);
	return (
		<Badge color={statusProperties?.color} icon={statusProperties?.icon}>
			{statusProperties?.name}
		</Badge>
	);
};
