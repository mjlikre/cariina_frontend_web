import React, {useEffect} from 'react'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Notification = ({data}) => {
    useEffect(()=> {
        if (data[0] && data[1]){
            return NotificationManager.success(data[0], data[1], 3000); 
        }
        
    }, [data])
    return(
        <>
        <NotificationContainer/>
        </>
    )
}

export default Notification
