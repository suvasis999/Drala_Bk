 
import React, { useContext,useEffect,useState, Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ContextApi } from '../contexts/ContextProvider'

const InstructorPrivateRoute = (props) => {
    
    const [isLoading, setIsLoading ] = useState(true);
    const [status, setStatus ] = useState(null);
    const contextApi = useContext(ContextApi)
    useEffect(()=>{

        if( contextApi.authInfo.role && contextApi.authInfo.role == 'instructor' ) {
          if(!contextApi.authInfo.new_email){
            setStatus('instructor');
          }  
        }

        setIsLoading(false);

    },[contextApi.authInfo]
    )

    if(!isLoading){
         if(status && status == 'instructor') {
            return(<Route {...props} />)
         }else{
            console.log(contextApi.authInfo)
            return(
              
              <Redirect to="/SignIn" />
            )
          }
    
    }
}

export default InstructorPrivateRoute;
