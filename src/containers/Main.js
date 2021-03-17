import React from 'react'
import requireAuth from "../hoc/requireAuth"

const Main = (props) => {
    return (
        <div>
            hello
        </div>
    )
}


export default requireAuth(Main)