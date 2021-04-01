import React from 'react'
import requireAuth from "../hoc/requireAuth"
import MainContainer from "../Components/MainContainer"
import PageHeader from "../Components/PageHeader"
const Main = (props) => {
    return (
        <PageHeader history = {props.history}>
            <MainContainer history = {props.history}/>
        </PageHeader>
       
    )
}


export default requireAuth(Main)

