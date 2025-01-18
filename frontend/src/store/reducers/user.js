import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from '../types';

const userReducer = (state = {}, action) => {
    switch(action?.type) {
        case SET_CURRENT_USER:
            localStorage.setItem('currentUser', JSON.stringify(action?.payload));
            return action.payload;
        case CLEAR_CURRENT_USER:
            localStorage.removeItem("currentUser");
            return {};
        default:
            //initialState
            return JSON.parse(localStorage.getItem("currentUser"));
            return state;
    }
}

export default userReducer;