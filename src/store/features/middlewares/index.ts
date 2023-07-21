import { Middleware } from "@reduxjs/toolkit"

export const persistanceDateLocalStorage: Middleware = (store) => (next) => (action) => {
  next(action)
  const stringifyTask = JSON.stringify(store.getState())
  localStorage.setItem('__LOCAL__TASK__', stringifyTask)
}