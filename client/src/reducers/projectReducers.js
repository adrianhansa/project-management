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

export const createProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return { loading: true };
    case CREATE_PROJECT_SUCCESS:
      return { loading: false, project: action.payload };
    case CREATE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_REQUEST:
      return { loading: true };
    case UPDATE_PROJECT_SUCCESS:
      return { loading: false, project: action.payload };
    case UPDATE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECT_REQUEST:
      return { loading: true };
    case GET_PROJECT_SUCCESS:
      return { loading: false, project: action.payload };
    case GET_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProjectsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return { loading: true };
    case GET_PROJECTS_SUCCESS:
      return { loading: false, projects: action.payload };
    case GET_PROJECTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return { loading: true };
    case DELETE_PROJECT_SUCCESS:
      return { loading: false, project: action.payload };
    case DELETE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
