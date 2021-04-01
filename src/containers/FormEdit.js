import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOneForm, clearForm } from "../actions/forms";
import PageHeader from "../Components/PageHeader";
import FormBuilder from "../Components/FormBuilder";
export const FormEdit = ({ form, getOneForm, match, history, clearForm }) => {
  const [tempForm, setTempForm] = useState(null);
  useEffect(() => {
    if (match.params && !form) {
      getOneForm(match.params.form_id);
    }
    const confirmExit = () => {
        if (tempForm !== form) {
          return "show warning";
        }
      };
    window.onbeforeunload = confirmExit;
    setTempForm(form)
    
    
  }, [form]);
  return (
    <PageHeader history={history}>
        
      <FormBuilder item={tempForm} formChange = {(form)=> {setTempForm(form)}}/>
    </PageHeader>
  );
};

const mapStateToProps = ({ forms }) => ({
  form: forms.form,
});
export default connect(mapStateToProps, { getOneForm, clearForm })(FormEdit);
