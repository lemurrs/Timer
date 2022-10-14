import {combineReducers,configureStore} from "@reduxjs/toolkit";
import timerReducer from "./Timer-reducer";
import { reducer as formReducer } from "redux-form"
const rootReducer = combineReducers({
    mainTimer:timerReducer,
    form: formReducer,
})
export const store = configureStore({
    reducer:rootReducer
})