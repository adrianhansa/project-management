import axios from "axios";
import {
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_FAIL,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} from "../constants/projects";

export const getProject = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECT_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/projects/${slug}`);

    dispatch({ type: GET_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROJECT_FAIL, payload: error.response.data.message });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECTS_REQUEST });
    const { data } = await axios.get("http://localhost:5000/projects");
    dispatch({ type: GET_PROJECTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROJECTS_FAIL, payload: error.response.data.message });
  }
};

export const createProject =
  ({ name }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_PROJECT_REQUEST });
      const { data } = await axios.post("http://localhost:5000/projects", {
        name,
      });
      dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });
      const result = await axios.get("http://localhost:5000/projects");
      dispatch({ type: GET_PROJECTS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: CREATE_PROJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateProject = (id, project) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROJECT_REQUEST });
    const { data } = await axios.put(
      `http://localhost:5000/projects/${id}`,
      project
    );
    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: data,
    });
    dispatch({ type: GET_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    const { data } = await axios.delete(`http://localhost:5000/projects/${id}`);
    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: data });
    const result = await axios.get("http://localhost:5000/projects");
    dispatch({ type: GET_PROJECTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};
