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

// import React, {useEffect} from 'react'
// import { connect } from 'react-redux'
// import { test } from "../actions"
// export const Main = (props) => {
//     useEffect(()=> {
//         props.test()
//     }, [])
//     return (
//         <div>
//             hello
//         </div>
//     )
// }





// export default connect(null, {test})(Main)
