import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../store/features/tasks/slice";

const store = configureStore({
	reducer: {
		tasks: taskReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
