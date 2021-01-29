import {stateKeys} from "./actions";

const initialState = {};
initialState[stateKeys.PAGE_CLASS] = '';
initialState[stateKeys.SITE_NAME] = 'Sample React Site';
initialState[stateKeys.SITE_DOMAIN] = 'example.ng';
initialState[stateKeys.DIALOG_TITLE] = null;
initialState[stateKeys.DIALOG_CONTENT] = null;
initialState[stateKeys.DIALOG_ACTION] = null;
initialState[stateKeys.DIALOG_ACTION_TEXT] = 'Ok, Continue';
initialState[stateKeys.OPEN_GUEST_CART] = null;
initialState[stateKeys.CLOSE_GUEST_CART] = null;
initialState[stateKeys.GUEST_CART_TOTAL] = localStorage.getItem('guestCartTotal');

export function reducer(state = initialState, action) {
    let data = {};
    data[action.type] = action.value;
    return Object.assign({}, state, data);
}