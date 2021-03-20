import React from 'react'

export const LabelWrapper = (props) => {
    return (
        <div className = "label-wrapper">
            <div className = "field-label">{props.label}</div>
            <div className = "actual-field">
                {props.children}
            </div>
        </div>
    )
}

export default LabelWrapper
