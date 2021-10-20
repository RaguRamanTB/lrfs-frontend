import {
  FETCH_CRITERIA_LIST,
  FETCH_CRITERIA_LIST_LOADING,
  FETCH_CRITERIA_LIST_FAILED,
} from "../actions/types";

const INITIAL_STATE = {
  criteriaListItems: {},
  loading: false,
  loaded: false,
  error: null,
};

const extractObjects = (listItems, payload) => {
  payload.forEach((item) => {
    listItems = { ...listItems, [item.cl_ID]: item };
  });
  return listItems;
};

const criteriaListsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CRITERIA_LIST_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_CRITERIA_LIST:
      return {
        ...state,
        // criteriaListItems: [...state.criteriaListItems, ...action.payload],
        criteriaListItems: extractObjects(
          state.criteriaListItems,
          action.payload
        ),
        loading: false,
        loaded: true,
        error: null,
      };

    case FETCH_CRITERIA_LIST_FAILED:
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

export default criteriaListsReducer;
