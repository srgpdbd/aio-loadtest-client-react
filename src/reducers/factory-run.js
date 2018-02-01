import { FACTORY_RUN_SUCCESS, FACTORY_RUN_FAILURE, FACTORY_RUN_SKIP } from '../constants/action-types';

const defaultState = {
  traceBack: null,
  result: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FACTORY_RUN_SUCCESS:
      return { traceBack: null, result: action.data };
    case FACTORY_RUN_FAILURE:
      return { traceBack: action.data.traceback, result: null };
    case FACTORY_RUN_SKIP:
      return { traceBack: null, result: null };
    default:
      return state;
  }
}
