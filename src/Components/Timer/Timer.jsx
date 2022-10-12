import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {goingToggle, goTimer, resetTimer, setTimer} from "../../Redux/Timer-reducer";
import './TimerModule.css'

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
    const count = useSelector(state => state.mainTimer.timerCount)
    let [seconds, minutes, hours] = Time({count}).split(':')
    const startCount = useSelector(state => state.mainTimer.maxCount)
    let isGoing = useSelector(state => state.mainTimer.isGoing)
    const dispatch = useDispatch()
    let timer;
    !isGoing ? clearTimeout(timer) : timer = setTimeout(() => dispatch(goTimer()), 1000)
    if (!count) clearTimeout(timer)
    if (count < 0) {
        clearTimeout(timer)
        dispatch(setTimer(0))
    }
    let stopTimer = () => {
        dispatch(goingToggle(false))
        clearTimeout(timer)
    }
    let GoTimer = () => {
        dispatch(goingToggle(true))
    }

    let setTime = () => {
        dispatch(setTimer(prompt('Enter time', count) || count))
        clearTimeout(timer)
    }
    let reset = () => {
        if (startCount !== count) {
            dispatch(resetTimer());
            clearTimeout(timer)
        }
    }
    return (

        <div className={'timer'}>
            <h1 className={`title`}>LEMMING TIMER</h1>
            <div className={`buttons`}>
                <div onClick={reset}>Reset</div>
                <div onClick={setTime}>Set</div>
                {
                    !isGoing ? <div onClick={GoTimer}>Start</div> : <div onClick={stopTimer}>Stop</div>
                }
            </div>
            <div className={`time`}>
                <div className={`seconds`}>{seconds}</div>
                <div className={`minutes`}>{minutes}</div>
                <div className={`hours`}>{hours}</div>
            </div>
        </div>
    )
}

export default Timer