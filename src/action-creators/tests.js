import { TEST_CREATE, TEST_DROP_CURRENT } from '../constants/action-types';
import { API_BASE } from '../constants/settings';


export const createTest = data =>
  dispatch => fetch(`${API_BASE}/`, { method: 'POST', body: JSON.stringify(data) })
    .then(r => Promise.all([r, r.json()]))
    .then(([r, json]) => r.ok ? json : Promise.reject(json))
    .then(json => dispatch({ type: TEST_CREATE, testId: json.test_id }))
    .catch(e => console.log(e));

export const dropCurrentTest = () => ({ type: TEST_DROP_CURRENT });
