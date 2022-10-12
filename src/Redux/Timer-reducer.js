import {createSlice} from "@reduxjs/toolkit";
const timerReducer=createSlice({
    name:'timer',
    initialState:{
        timerCount:0,
        maxCount:0,
        isGoing:false,
    },
    reducers:{
        resetTimer(state){
            state.timerCount=state.maxCount
        },
        goTimer(state){
            state.timerCount=state.timerCount-1
        },
        goingToggle(state,action){
            state.isGoing=action.payload
        },
        setTimer(state,action){
            state.timerCount=action.payload
            state.maxCount=action.payload
        },
    }
})
export default timerReducer.reducer
export const {resetTimer,goTimer,goingToggle,setTimer}=timerReducer.actions