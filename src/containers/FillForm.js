import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { getFormToFill } from "../actions/forms"
import FormToFill from "../Components/Form/Form"
export const FillForm = ({ match, form, getFormToFill }) => {
    useEffect(()=> {
        if (match.params){
            getFormToFill(match.params.form_id)
        }

        
    }, [])
    
    return (
        <div className= "kjga-display-block ">
            <div className="form-builder-wrapper">
                <FormToFill form = {form}/>
            </div>
            
        </div>
    )
}



const mapStateToProps = ({forms}) => ({
    form: forms.form
})


export default connect(mapStateToProps,{getFormToFill})(FillForm)
