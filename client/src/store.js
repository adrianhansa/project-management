import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { login, register } from "./reducers/authReducers";
import {
  createProjectReducer,
  getProjectReducer,
  getProjectsReducer,
  updateProjectReducer,
  deleteProjectReducer,
} from "./reducers/projectReducers";

const reducers = combineReducers({
  userLogin: login,
  userRegister: register,
  getProject: getProjectReducer,
  getProjects: getProjectsReducer,
  updatedProject: updateProjectReducer,
  deletedProject: deleteProjectReducer,
  createdProject: createProjectReducer,
});

const userFromStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
const initialState = { userLogin: { user: userFromStorage } };
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
