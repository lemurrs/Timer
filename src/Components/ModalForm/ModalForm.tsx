import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField} from "../../common/FormsControls/FormsControls";

type Props={
    handleSubmit:()=>void
    minutes:number,
    seconds:number,
    hours:number
}

const ModalForm:React.FC<InjectedFormProps<Props>> =({handleSubmit})=>{
    return(
        <form onSubmit={handleSubmit}>
            {createField('0','seconds','input',[],'number',59)}
            {createField('0','minutes','input',[],'number',59)}
            {createField('0','hours','input',[],'number',99)}
            <button className={`formButton`}>Save</button>
        </form>
    )
}
const ModalReduxForm=reduxForm<Props>({
    form:'time'
})(ModalForm)

export default React.memo(ModalReduxForm)
