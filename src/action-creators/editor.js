import * as actionTypes from '../constants/action-types';

export const setFontSize = fontSize => ({ type: actionTypes.EDITOR_SET_FONT_SIZE, fontSize });
export const setTheme = theme => ({ type: actionTypes.EDITOR_SET_THEME, theme });
