const { LOGIN, LOGOUT, SET_POSTS, ADD_POST, DELETE_POST, LIKE_POST, UNLIKE_POST} = require("./types");


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
            nuevoArrayAddPost.unshift(action.payload);
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

        case LIKE_POST: 
            let nuevoArrayLikePost = [...state.post];
            let indicePostLike = nuevoArrayLikePost.findIndex((post)=>{
                return post._id === action.payload._id
            })

            nuevoArrayLikePost[indicePostLike].usuariosLike.push({
                nick: action.payload.nick,
                nombreCuenta: action.payload.nombreCuenta,
                avatar: action.payload.avatar
            })
            return{
                ...state,
                post: nuevoArrayLikePost
            }

        case UNLIKE_POST:
            let nuevoArrayUnlikePost = [...state.post];
            let indicePostUnlike = nuevoArrayUnlikePost.findIndex((post)=>{
                return post._id === action.payload._id
            })

            let indiceUsuarioLike =  nuevoArrayUnlikePost[indicePostUnlike].usuariosLike.findIndex((usuarioLike)=> {
                return usuarioLike.nombreCuenta === action.payload.nombreCuenta
            })

            nuevoArrayUnlikePost[indicePostUnlike].usuariosLike.splice(indiceUsuarioLike, 1)

            return{
                ...state,
                post: nuevoArrayUnlikePost
            }

        default:
            return state
    }
}

export default reducer;