const { LOGIN, LOGOUT, SET_POSTS, ADD_POST, DELETE_POST} = require("./types");


const initialState ={
    user: {},
    post: []
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

        case SET_POSTS:
            return{
                ...state,
                post: action.payload
            }

        case ADD_POST:
            let nuevoArrayAddPost = [...state.post];
            nuevoArrayAddPost.push(action.payload);
            return{
                ...state,
                post: nuevoArrayAddPost
            }

        case DELETE_POST:
            let nuevoArrayPost = state.post.filter(post => post._id !== action.payload);
            return{
                ...state,
                post: nuevoArrayPost
            }

        default:
            return state
    }
}

export default reducer;