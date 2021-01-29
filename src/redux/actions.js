/*
 * action types
 */

export const stateKeys = {
    PAGE_CLASS: 'pageClass',
    SITE_NAME: 'siteName',
    SITE_DOMAIN: 'siteDomain',
    OPEN_DIALOG: 'openDialog',
    CLOSE_DIALOG: 'closeDialog',
    DIALOG_ACTION: 'dialogAction',
    DIALOG_TITLE: 'dialogTitle',
    DIALOG_CONTENT: 'dialogContent',
    DIALOG_ACTION_TEXT: 'dialogActionText',
    OPEN_GUEST_CART: 'openGuestCart',
    CLOSE_GUEST_CART: 'closeGuestCart',
    GUEST_CART_TOTAL: 'guestCartTotal'
};


export const mapStateToProps = (state, oldProps) => {
    let props = {};
    for (let stateKeysKey in stateKeys) {
        props[stateKeys[stateKeysKey]] = typeof state[stateKeys[stateKeysKey]] !== 'undefined'
            ? state[stateKeys[stateKeysKey]]
            : null;
    }

    return props;
};

export const mapDispatchToProps = (dispatch) => {
    return {
        'setState': (value, key) => {
            dispatch({
                'type': key,
                'value': value
            });
        }
    }
};
