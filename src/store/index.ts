import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../store/features/tasks/slice";
import { persistanceDateLocalStorage } from "./features/middlewares";

const store = configureStore({
	reducer: {
		tasks: taskReducer ?? [],
	},
	middleware: [persistanceDateLocalStorage],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
