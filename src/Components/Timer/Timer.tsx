import React, {useLayoutEffect, useState} from "react";
import './TimerModule.css'
import Modal from "../../common/Modal/Modal.tsx";
import {Time} from "./TimeLogic";
import ModalReduxForm from "../ModalForm/ModalForm";

const Timer = () => {

    //TimerState
    const [count, setCount] = useState(setDefaultValue())
    const [isGoing, setIsGoing] = useState(false)
    //ModalState
    const [modalActive, setModalActive] = useState(false)
    //Output data
    const {seconds, minutes, hours} = Time(count)

    //Get value from localStorage
    function setDefaultValue() {
        const userCount = localStorage.getItem('count')
        return userCount ? +userCount : 0
    }
    //If isGoing interval works if !isGoing || !count interval clears
    useLayoutEffect(() => {
        localStorage.setItem('count',String(count))
        let timerId: ReturnType<typeof setInterval>;
        if (isGoing) {
            timerId = setInterval(() => {
                setCount(prev => prev - 1)
            }, 1000)
            if (!count) {
                setIsGoing(false)
            }
        }
        return () => {
            clearInterval(timerId)
        }
    }, [isGoing, count])

    //Modal Open
    const SetTimer = () => {
        setModalActive(true)
    }
    //Set timer in Modal (certain values)
    const onModelButtonsClick = (value: number) => {
        setCount(value)
        setModalActive(false)
    }
    //Set timer in Modal (custom values)
    const handleSubmit = ({seconds, minutes, hours}: { seconds: number, minutes: number, hours: number }) => {
        setCount((!seconds ? 0 : +seconds) + (!minutes ? 0 : +minutes * 60) + (!hours ? 0 : +hours * 3600))
        setModalActive(false)

    }

    return (
        <section>
            <div className={`timer`}>
                <h1 className={`title`}>LEMMING TIMER</h1>
                <div className={`buttons`}>
                    <div onClick={() => {
                        setCount(0);
                        setIsGoing(false)
                    }}>Reset
                    </div>
                    <div onClick={SetTimer}>Set</div>
                    {
                        !isGoing ?
                            <div
                            onClick={() => {
                            setIsGoing(true)
                        }}>Start</div> :
                            <div
                            onClick={() => {
                            setIsGoing(false)
                        }}>Stop</div>
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
                <ModalReduxForm onSubmit={handleSubmit}/>
                <div className={`modalButtons`}>
                    <div onClick={() => {
                        onModelButtonsClick(60)
                    }}>1:00
                    </div>
                    <div onClick={() => {
                        onModelButtonsClick(300)
                    }}>5:00
                    </div>
                    <div onClick={() => {
                        onModelButtonsClick(900)
                    }}>15:00
                    </div>
                </div>

            </Modal>

        </section>
    )
}
export default React.memo(Timer);