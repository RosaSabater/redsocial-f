// import reducer from './reducer';
// import { createStore } from 'redux';

// const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
//         trace: true
//     })
// )

// export default store;

import { applyMiddleware, createStore } from "redux"
import reducer from "./reducer"

// Import the necessary methods for saving and loading
import { save, load } from "redux-localstorage-simple"

/*
    Saving to LocalStorage is achieved using Redux 
    middleware. The 'save' method is called by Redux 
    each time an action is handled by your reducer.
*/
const createStoreWithMiddleware
    = applyMiddleware(
        save() // Saving done here
    )(createStore)

/*
    Loading from LocalStorage happens during
    creation of the Redux store.
*/
const store = createStoreWithMiddleware(
    reducer,
    load(), // Loading done here
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;