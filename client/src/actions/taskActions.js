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
import axios from "axios";

export const getTask = (projectId, id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/projects/${projectId}/tasks/${id}`
    );
    dispatch({ type: TASK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_DETAILS_FAIL, payload: error.response.data.message });
  }
};

export const getTasks = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/projects/${projectId}/tasks`
    );
    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_LIST_FAIL, payload: error.response.data.message });
  }
};

export const createTask = (projectId, task) => async (dispatch) => {
  try {
    dispatch({ type: TASK_CREATE_REQUEST });
    const { data } = await axios.post(
      `http://localhost:5000/projects/${projectId}/tasks`,
      task
    );
    dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
    const result = await axios.get(
      `http://localhost:5000/projects/${projectId}/tasks`
    );
    dispatch({ type: TASK_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: TASK_CREATE_FAIL, payload: error.response.data.message });
  }
};

export const taskUpdate = (projectId, id, task) => async (dispatch) => {
  try {
    dispatch({ type: TASK_UPDATE_REQUEST });
    const { data } = await axios.put(
      `http://localhost:5000/projects/${projectId}/tasks/${id}`,
      task
    );
    dispatch({ type: TASK_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_UPDATE_FAIL, payload: error.response.data.message });
  }
};

export const taskDelete = (projectId, id) => async (dispatch) => {
  try {
    dispatch({ type: TASK_DELETE_REQUEST });
    const { data } = await axios.delete(
      `http://localhost:5000/projects/${projectId}/tasks/${id}`
    );
    dispatch({ type: TASK_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_DELETE_FAIL, payload: error.response.data.mesage });
  }
};
