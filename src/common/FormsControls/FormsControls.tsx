import React from "react";
import {Field} from "redux-form";
import './FormsControlsModule.css'

type Props={
    meta:{
        touched:boolean,
        error:string
    },

    input:any,

    max:number,
    min:number,
    placeholder:string,
    type:string,
    typefild:string
}

export const Element = ({meta:{touched,error},input,...props}:Props)=>{
    const hasError = error && touched
    const classes = `formControl ${hasError? 'error' : ''}`
    return (
        <div className={classes}>
            <props.typefild  {...input} {...props}/>
            {hasError && <span>{error}</span>}
        </div>)
}
export const createField=(Placeholder='',Name:string,Typefild:string,Validate:[],Type='text',max=null)=>{
    return (<Field placeholder={Placeholder} name={Name} component={Element} typefild={Typefild} validate={Validate} type={Type} min={0} max={max} />)
}
