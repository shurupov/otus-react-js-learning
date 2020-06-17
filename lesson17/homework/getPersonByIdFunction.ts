/*
Курс React, урок 17: Middlewares
Домашнее задание 1
src/lesson17/homework/asyncFlow.ts
Напишите async flow который сходит в https://swapi.dev/api/people и сохранит данные в стейте
Нужна обработка различных состояний запроса и тесты
+1 балл за async flow который сохранит данные в стейте
+1 балл за обработку состояний реквеста в пути и ошибок
+1 балл за тесты
+1 балл за разнение по разных файлам и объединение в duck
*/

// Action creators

// Thunks

// Reducer
import { Store } from "redux";
import {
  loadingAction,
  updatePersonAction,
  updatePersonErrorAction,
} from "./actionCreators";

export const getPersonByIdFunction = (store: Store) => (id: number) => {
  store.dispatch(loadingAction());
  return fetch(`https://swapi.dev/api/people/${id}`)
    .then((response: Response) => response.json())
    .then((person: any) => store.dispatch(updatePersonAction(person)))
    .catch((error: Error) => store.dispatch(updatePersonErrorAction(error)));
};
