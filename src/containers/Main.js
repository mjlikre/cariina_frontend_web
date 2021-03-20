import React from 'react'
import requireAuth from "../hoc/requireAuth"
import MainContainer from "../Components/MainContainer"
import PageHeader from "../Components/PageHeader"
const Main = (props) => {
    return (
        <PageHeader>
            <MainContainer/>

        </PageHeader>
       
    )
}


export default requireAuth(Main)

