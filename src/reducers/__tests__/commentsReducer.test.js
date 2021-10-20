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
} from "../../actions/types";
import commentsReducer from "../commentsReducer";

const INITIAL_STATE = {
  comments: {},
  loading: false,
  loaded: false,
  error: null,
};

describe("Patient Comments Reducer", () => {
  it("should return default state", () => {
    const newState = commentsReducer(INITIAL_STATE, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it("should update the state on fetch comments loading", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: FETCH_COMMENTS_LOADING,
    });
    expect(newState).toEqual({
      comments: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on update summary loading", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: UPDATE_SUMMARY_LOADING,
    });
    expect(newState).toEqual({
      comments: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on revert summary loading", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: REVERT_SUMMARY_LOADING,
    });
    expect(newState).toEqual({
      comments: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on delete comment loading", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: DELETE_COMMENTS_LOADING,
    });
    expect(newState).toEqual({
      comments: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on fetch comments loaded", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: FETCH_COMMENTS,
      payload: [
        {
          id: 10,
          patId: 10,
          status: "No Status Found",
          comment: "No Comment Found",
          commented_AT: "2021-03-11T11:47:13.000+00:00",
        },
        {
          id: 64,
          patId: 10,
          status: "Mark callback incomplete",
          comment: "Test errors",
          commented_AT: "2021-03-16T05:17:04.000+00:00",
        },
        {
          id: 66,
          patId: 10,
          status:
            "Reviewed by Provider, No further action required. Patient Contacted",
          comment: "Patient informed via Phone",
          commented_AT: "2021-03-16T13:25:18.000+00:00",
        },
      ],
    });
    expect(newState).toEqual({
      comments: [
        {
          id: 10,
          patId: 10,
          status: "No Status Found",
          comment: "No Comment Found",
          commented_AT: "2021-03-11T11:47:13.000+00:00",
        },
        {
          id: 64,
          patId: 10,
          status: "Mark callback incomplete",
          comment: "Test errors",
          commented_AT: "2021-03-16T05:17:04.000+00:00",
        },
        {
          id: 66,
          patId: 10,
          status:
            "Reviewed by Provider, No further action required. Patient Contacted",
          comment: "Patient informed via Phone",
          commented_AT: "2021-03-16T13:25:18.000+00:00",
        },
      ],
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on update summary loaded", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: UPDATE_SUMMARY,
      payload: [
        {
          id: 10,
          patId: 10,
          status: "No Status Found",
          comment: "No Comment Found",
          commented_AT: "2021-03-11T11:47:13.000+00:00",
        },
        {
          id: 64,
          patId: 10,
          status: "Mark callback incomplete",
          comment: "Test errors",
          commented_AT: "2021-03-16T05:17:04.000+00:00",
        },
        {
          id: 66,
          patId: 10,
          status:
            "Reviewed by Provider, No further action required. Patient Contacted",
          comment: "Patient informed via Phone",
          commented_AT: "2021-03-16T13:25:18.000+00:00",
        },
      ],
    });
    expect(newState).toEqual({
      comments: [
        {
          id: 10,
          patId: 10,
          status: "No Status Found",
          comment: "No Comment Found",
          commented_AT: "2021-03-11T11:47:13.000+00:00",
        },
        {
          id: 64,
          patId: 10,
          status: "Mark callback incomplete",
          comment: "Test errors",
          commented_AT: "2021-03-16T05:17:04.000+00:00",
        },
        {
          id: 66,
          patId: 10,
          status:
            "Reviewed by Provider, No further action required. Patient Contacted",
          comment: "Patient informed via Phone",
          commented_AT: "2021-03-16T13:25:18.000+00:00",
        },
      ],
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on revert summary loaded", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: REVERT_SUMMARY,
      payload: [
        {
          id: 10,
          patId: 10,
          status: "No Status Found",
          comment: "No Comment Found",
          commented_AT: "2021-03-11T11:47:13.000+00:00",
        },
        {
          id: 64,
          patId: 10,
          status: "Mark callback incomplete",
          comment: "Test errors",
          commented_AT: "2021-03-16T05:17:04.000+00:00",
        },
        {
          id: 66,
          patId: 10,
          status:
            "Reviewed by Provider, No further action required. Patient Contacted",
          comment: "Patient informed via Phone",
          commented_AT: "2021-03-16T13:25:18.000+00:00",
        },
      ],
    });
    expect(newState).toEqual({
      comments: [
        {
          id: 10,
          patId: 10,
          status: "No Status Found",
          comment: "No Comment Found",
          commented_AT: "2021-03-11T11:47:13.000+00:00",
        },
        {
          id: 64,
          patId: 10,
          status: "Mark callback incomplete",
          comment: "Test errors",
          commented_AT: "2021-03-16T05:17:04.000+00:00",
        },
        {
          id: 66,
          patId: 10,
          status:
            "Reviewed by Provider, No further action required. Patient Contacted",
          comment: "Patient informed via Phone",
          commented_AT: "2021-03-16T13:25:18.000+00:00",
        },
      ],
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on delete comment loaded", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: DELETE_COMMENTS,
      payload: [
        {
          id: 10,
          patId: 10,
          status: "No Status Found",
          comment: "No Comment Found",
          commented_AT: "2021-03-11T11:47:13.000+00:00",
        },
        {
          id: 64,
          patId: 10,
          status: "Mark callback incomplete",
          comment: "Test errors",
          commented_AT: "2021-03-16T05:17:04.000+00:00",
        },
        {
          id: 66,
          patId: 10,
          status:
            "Reviewed by Provider, No further action required. Patient Contacted",
          comment: "Patient informed via Phone",
          commented_AT: "2021-03-16T13:25:18.000+00:00",
        },
      ],
    });
    expect(newState).toEqual({
      comments: [
        {
          id: 10,
          patId: 10,
          status: "No Status Found",
          comment: "No Comment Found",
          commented_AT: "2021-03-11T11:47:13.000+00:00",
        },
        {
          id: 64,
          patId: 10,
          status: "Mark callback incomplete",
          comment: "Test errors",
          commented_AT: "2021-03-16T05:17:04.000+00:00",
        },
        {
          id: 66,
          patId: 10,
          status:
            "Reviewed by Provider, No further action required. Patient Contacted",
          comment: "Patient informed via Phone",
          commented_AT: "2021-03-16T13:25:18.000+00:00",
        },
      ],
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on fetch comments failed", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: FETCH_COMMENTS_FAILED,
      payload: "Error in loading comments, please try again.",
    });
    expect(newState).toEqual({
      comments: {},
      loading: false,
      loaded: true,
      error: "Error in loading comments, please try again.",
    });
  });

  it("should update the state on update summary failed", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: UPDATE_SUMMARY_FAILED,
      payload: "Error in loading comments, please try again.",
    });
    expect(newState).toEqual({
      comments: {},
      loading: false,
      loaded: true,
      error: "Error in loading comments, please try again.",
    });
  });

  it("should update the state on revert summary failed", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: REVERT_SUMMARY_FAILED,
      payload: "Error in loading comments, please try again.",
    });
    expect(newState).toEqual({
      comments: {},
      loading: false,
      loaded: true,
      error: "Error in loading comments, please try again.",
    });
  });

  it("should update the state on delete comment failed", () => {
    const newState = commentsReducer(INITIAL_STATE, {
      type: DELETE_COMMENTS_FAILED,
      payload: "Error in loading comments, please try again",
    });
    expect(newState).toEqual({
      comments: {},
      loading: false,
      loaded: true,
      error: "Error in loading comments, please try again",
    });
  });
});
