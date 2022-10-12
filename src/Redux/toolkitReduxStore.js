import {combineReducers,configureStore} from "@reduxjs/toolkit";
import timerReducer from "./Timer-reducer";
const rootReducer = combineReducers({
    mainTimer:timerReducer
})
export const store = configureStore({
    reducer:rootReducer
})