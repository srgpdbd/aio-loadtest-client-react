import { API_BASE } from '../constants/settings';
import { FACTORY_RUN_SUCCESS, FACTORY_RUN_FAILURE, FACTORY_RUN_SKIP } from '../constants/action-types';

export const skip = () => ({ type: FACTORY_RUN_SKIP });

export const run = factory =>
  dispatch => {
    dispatch(skip());
    return fetch(`${API_BASE}/run-factory`, {
        method: 'POST',
        body: JSON.stringify({ factory })
      })
        .then(r => Promise.all([r, r.json()]))
        .then(([r, data]) => r.ok ?
          dispatch({ type: FACTORY_RUN_SUCCESS, data }) :
          dispatch({ type: FACTORY_RUN_FAILURE, data }));
  };
