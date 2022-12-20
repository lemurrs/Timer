import {combineReducers,configureStore} from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form"
const rootReducer = combineReducers({
    form: formReducer,
})
export const store = configureStore({
    reducer:rootReducer
})
