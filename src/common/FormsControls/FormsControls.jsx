import React from "react";
import {Field} from "redux-form";
import './FormsControlsModule.css'

export const Element = ({meta:{touched,error},input,...props})=>{
    const hasError = error && touched
    const classes = `formControl ${hasError? 'error' : ''}`
    return (
        <div className={classes}>
            <props.typefild  {...input} {...props}/>
            {hasError && <span>{error}</span>}
        </div>)
}
export const createField=(Placeholder='',Name,Typefild,Validate,Type='text',max=null)=>{
    return (<Field placeholder={Placeholder} name={Name} component={Element} typefild={Typefild} validate={Validate} type={Type} min={0} max={max} />)
}
