import React from 'react'
import classes from './Wrapper.module.css'

const wrapper = (props)=>{
    return (
        <div className={classes.main}>
            {props.children}
        </div>
    )
}

export default wrapper