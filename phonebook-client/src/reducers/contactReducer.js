import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CREATE_NEW_CONTACT:
            let contacts = [...state.items, Object.assign({}, action.contact)];
            initialState.items = contacts;
            return {
                items: contacts,
                loading: false,
                error: null
            };

        case actionTypes.FETCH_CONTACTS_BEGIN:
            return {
              ...state,
              loading: false,
              error: null
            };
      
        case actionTypes.FETCH_CONTACTS_SUCCESS:
            initialState.items = action.payload.contacts;
            return {
              ...state,
              loading: false,
              items: action.payload.contacts
            };

        case actionTypes.FETCH_CONTACTS_FAILURE:
            console.error(action);
            console.error(action.payload);
            console.error(action.payload.error);
            return {
              ...state,
              loading: false,
              error: action.payload.error,
              items: []
            };
        case actionTypes.FILTER_CONTACTS:
            let filteresContacts = initialState.items.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(action.searchValue.toLowerCase())));
            return {
                items: filteresContacts,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};
