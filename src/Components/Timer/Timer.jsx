import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {goingToggle, goTimer, resetTimer, setTimer} from "../../Redux/Timer-reducer";
import './TimerModule.css'
import Modal from "../../common/Modal/Modal";
import {createField} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ModalForm =(props)=>{
        return(
            <form onSubmit={props.handleSubmit}>
            {createField('0','seconds','input',[],'number',59)}
                {createField('0','minutes','input',[],'number',59)}
                {createField('0','hours','input',[],'number',23)}
                <button className={`formButton`}>Save</button>
        </form>
        )
}
const ModalReduxForm=reduxForm({
    form:'time'
})(ModalForm)

//Timer UI logic
const Time = (count) => {
    //Initial value, in case we don`t set minutes or hours to show them correctly
    let seconds = '00'
    let minutes='00'
    let hours='00'
    //Math part
    if (count < 60){
        seconds=count
    }
    else if (count >= 60 && count < 3600){
        minutes=Math.floor(count / 60)
        seconds=count % 60
    }
    else if (count >= 3600){
        hours=Math.floor(count / 3600)
        minutes=Math.floor(count % 3600 / 60)
        seconds=Math.floor(count % 3600 % 60)
    }
    //Adding 0 before time value in case its value below 10, so it will be not 4:6:3 but 04:06:03
    if(String(seconds).length<2) seconds='0'+seconds
    if(String(minutes).length<2) minutes='0'+minutes
    if(String(hours).length<2) hours='0'+hours

    return {seconds,minutes,hours}
}
const Timer = () => {
    //count is time
    const count = useSelector(state => state.mainTimer.timerCount)
    const startCount = useSelector(state => state.mainTimer.maxCount)
    const isGoing = useSelector(state => state.mainTimer.isGoing)
    const dispatch = useDispatch()

    const [modalActive,setModalActive]=useState(false)

    const {seconds, minutes, hours} = Time(count)
    let timer;
    if(isGoing===true)  timer = setTimeout(() => dispatch(goTimer()), 1000)
    if(isGoing===false) clearTimeout(timer)

    if (!count) {
        dispatch(goingToggle(false))
        clearTimeout(timer)
    }

    let stopTimer = () => {
        clearTimeout(timer)
        dispatch(goingToggle(false))

    }
    let GoTimer = () => {
        dispatch(goingToggle(true))
    }
    let SetTimer=()=>{
        setModalActive(true)
        clearTimeout(timer)
        dispatch(goingToggle(false))
    }

    let reset = () => {
        clearTimeout(timer)
        if (startCount !== count) {
            dispatch(resetTimer());
            dispatch(goingToggle(false))
        }
    }
    let onModelButtonsClick = (value)=> {
        dispatch(setTimer(value))
    setModalActive(false)
    }
    const onSubmit =(values)=> {
        dispatch(setTimer((values.seconds===undefined ? 0 : +values.seconds)+(values.minutes===undefined ? 0 : +values.minutes*60)+(values.hours===undefined ? 0 : +values.hours*3600)))
        setModalActive(false)
    }
    return (
<section>
        <div className={`timer`}>
            <h1 className={`title`}>LEMMING TIMER</h1>
            <div className={`buttons`}>
                <div onClick={reset}>Reset</div>
                <div onClick={SetTimer}>Set</div>
                {
                    !isGoing ? <div onClick={GoTimer}>Start</div> : <div onClick={stopTimer}>Stop</div>
                }
            </div>
            <div className={`time`}>
                <div>
                    <span>{hours}</span>
                    </div>
                <div>
                    <span>{minutes}</span>
                </div>
                <div>
                    <span>{seconds}</span>
                </div>
            </div>
        </div>
    <Modal active={modalActive} setActive={setModalActive} className={'test'}>
        <h5 className={`formTitle`}>Type time or press buttons</h5>
        <ModalReduxForm onSubmit={onSubmit}/>
        <div className={`modalButtons`}>
            <div onClick={()=>{onModelButtonsClick(60)}}>1:00</div>
            <div onClick={()=>{onModelButtonsClick(300)}}>5:00</div>
            <div onClick={()=>{onModelButtonsClick(900)}}>15:00</div>
        </div>

    </Modal>

</section>
    )
}

export default Timer;