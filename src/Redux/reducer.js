const { LOGIN, LOGOUT} = require("./types");


const initialState ={
    user: {}
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                user: action.payload
            }
        case LOGOUT:
            return{
                ...state,
                user: {}
            }
        default:
            return state
    }
}

export default reducer;