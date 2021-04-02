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
    if (form) {
        return (
            <div style = {{backgroundColor: form.styles.theme, height: "100vh", width: "100%", padding: "0 50px"}}>
            <div className= "kjga-display-block" style = {{margin: "0px auto", padding: "100px 0px 0px 0px"}}>
                <div className="form-builder-wrapper" style = {{margin: "0px auto"}}>
                    <FormToFill form = {form}/>
                </div>
                
            </div>
            </div>
        )
    }else{
        return <dib></dib>
    }
    
    
}



const mapStateToProps = ({forms}) => ({
    form: forms.form
})


export default connect(mapStateToProps,{getFormToFill})(FillForm)
