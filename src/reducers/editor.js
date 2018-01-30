import * as actionTypes from '../constants/action-types';

const defaultState = {
  fontSize: 13,
  theme: 'monokai',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.EDITOR_SET_THEME:
      return { ...state, theme: action.theme };
    case actionTypes.EDITOR_SET_FONT_SIZE:
      return { ...state, fontSize: action.fontSize };
    default:
      return state;
  }
}
