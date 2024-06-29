import * as actionTypes from './actions';

export const initialState = {
    isOpen: [],
    defaultId: 'default',
    // fontFamily: config.fontFamily,
    // borderRadius: config.borderRadius,
    opened: true,
    snackBar: { open: false, type: 'success', message: '', horizontal: 'left', vertical: 'bottom', timeout: 6000 },
    categories: [],
    navigation: []
};

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };

        default:
            return state;
    }
};

export default customizationReducer;
