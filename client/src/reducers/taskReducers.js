import {
  TASK_CREATE_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_DELETE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_LIST_FAIL,
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
} from "../constants/tasks";

export const getTaskDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DETAILS_REQUEST:
      return { loading: true };
    case TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTaskListReducer = (state = [], action) => {
  switch (action.type) {
    case TASK_LIST_REQUEST:
      return { loading: true };
    case TASK_LIST_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_DELETE_REQUEST:
      return { loading: true };
    case TASK_DELETE_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_UPDATE_REQUEST:
      return { loading: true };
    case TASK_UPDATE_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_CREATE_REQUEST:
      return { loading: true };
    case TASK_CREATE_SUCCESS:
      return { loading: false, task: action.payload };
    case TASK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
