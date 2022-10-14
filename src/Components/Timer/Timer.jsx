import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {goingToggle, goTimer, resetTimer, setTimer} from "../../Redux/Timer-reducer";
import './TimerModule.css'
import Modal from "../../common/Modal/Modal";
import {createField} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
const ModalForm =(props)=>{
        return(
            <form className onSubmit={props.handleSubmit}>
            {createField('30','seconds','input',[],'number',59)}
                {createField('10','minutes','input',[],'number',59)}
                {createField('1','hours','input',[],'number',23)}
                <button className={`formButton`}>Save</button>
        </form>
        )
}
const ModalReduxForm=reduxForm({
    form:'time'
})(ModalForm)

const Time = ({count}) => {
    if (count < 60)
        return '00:00:' + (count < 10 ? ('0' + count) : count)
    else if (count >= 60 && count < 3600)
        return '00:' + (Math.floor(count / 60) < 10 ? '0' + Math.floor(count / 60) : Math.floor(count / 60)) + ":" + ((count % 60) < 10 ? ('0' + count % 60) : count % 60)
    else if (count >= 3600)
        return (Math.floor(count / 3600) < 10 ? '0' + Math.floor(count / 3600) : Math.floor(count / 3600))
            + ':' + (Math.floor(count % 3600 / 60) < 10 ? '0' + Math.floor(count % 3600 / 60) : Math.floor(count % 3600 / 60))
            + ':' + (Math.floor(count % 3600 % 60) < 10 ? '0' + Math.floor(count % 3600 % 60) : Math.floor(count % 3600 % 60))
}
const Timer = (props) => {
    const [modalActive,setModalActive]=useState(false)
    const count = useSelector(state => state.mainTimer.timerCount)
    let [seconds, minutes, hours] = Time({count}).split(':')
    const startCount = useSelector(state => state.mainTimer.maxCount)
    let isGoing = useSelector(state => state.mainTimer.isGoing)
    const dispatch = useDispatch()
    let timer;
    if(isGoing===true) timer = setTimeout(() => dispatch(goTimer()), 1000)
    if(isGoing===false) clearTimeout(timer)
    if (!count) dispatch(goingToggle(false))

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
        <div className={'timer'}>
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
                    <span>{seconds}</span>
                    </div>
                <div>
                    <span>{minutes}</span>
                </div>
                <div>
                    <span>{hours}</span>
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