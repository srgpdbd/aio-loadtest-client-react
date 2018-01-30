import * as actionTypes from '../constants/action-types';

const defaultState = {
  tests: [],
  currentTest: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.TEST_CREATE:
      return {
        tests: state.tests.concat(action.testId),
        currentTest: action.testId,
      };
    case actionTypes.TEST_DROP_CURRENT:
      return {
        ...state,
        currentTest: null,
      };
    default:
      return state
  }
}
