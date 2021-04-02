import React from 'react'
import { connect } from 'react-redux'

export const FieldDisplay = ({item}) => {
    const renderOptions = () => {
        if (item) {
          return item.options.map((option, index) => {
            return (
                <div className = "form-options" key={index} >
                    <input className="form-checkbox" type="checkbox" disabled /> {option}
                </div>
                );
          });
        } else {
          return null;
        }
      };
    if (item.type === 0) {
        return (
            <div className = "form form-short">
                Short Answer
            </div>
        )
    }else if(item.type === 1) {
        return (
            <div className = "form form-long">
                Long Answer
            </div>
        )
    }else if(item.type === 2) {
        return (
            <div className = "form form-select">
                {renderOptions()}
            </div>    
        )
    }else if(item.type === 3) {
        return (
            <div className = "form form-select">
                {renderOptions()}
            </div>    
        )
    }else if(item.type === 4) {
        return (
            <div className = "form form-date">Date</div>    
        )
    }else if(item.type === 5) {
        return (
            <div className = "form form-time">Time</div>    
        )
    }else if(item.type === 6) {
        return (
            <div className = "form form-num">Number</div>    
        )
    }else{
        return(
            <div></div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps, {})(FieldDisplay)