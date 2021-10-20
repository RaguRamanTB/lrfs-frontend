import {
  FETCH_COMMENTS,
  FETCH_COMMENTS_FAILED,
  FETCH_COMMENTS_LOADING,
  UPDATE_SUMMARY,
  UPDATE_SUMMARY_FAILED,
  UPDATE_SUMMARY_LOADING,
  REVERT_SUMMARY,
  REVERT_SUMMARY_FAILED,
  REVERT_SUMMARY_LOADING,
  DELETE_COMMENTS_LOADING,
  DELETE_COMMENTS,
  DELETE_COMMENTS_FAILED,
} from "../actions/types";

const INITIAL_STATE = {
  comments: {},
  loading: false,
  loaded: false,
  error: null,
};

const commentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_LOADING:
    case UPDATE_SUMMARY_LOADING:
    case REVERT_SUMMARY_LOADING:
    case DELETE_COMMENTS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_COMMENTS:
    case UPDATE_SUMMARY:
    case REVERT_SUMMARY:
    case DELETE_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };

    case FETCH_COMMENTS_FAILED:
    case UPDATE_SUMMARY_FAILED:
    case REVERT_SUMMARY_FAILED:
    case DELETE_COMMENTS_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default commentsReducer;
