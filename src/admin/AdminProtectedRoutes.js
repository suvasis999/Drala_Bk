 
import React, { useContext,useEffect,useState, Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ContextApi } from '../contexts/ContextProvider'

const PrivateRoute = (props) => {
    
    const [isLoading, setIsLoading ] = useState(true);
    const [status, setStatus ] = useState(null);
    const contextApi = useContext(ContextApi)
    useEffect(()=>{

        if( contextApi.authInfo.role && contextApi.authInfo.role == 'admin' ) {
            if(!contextApi.authInfo.new_email){
                setStatus('admin'); 
            }
        }

        setIsLoading(false);

    },[contextApi.authInfo]
    )

    if(!isLoading){
         if(status && status == 'admin') {
            return(<Route {...props} />)
         }else{
            console.log('Shit should be working')
            return(
              
              <Redirect to="/SignIn" />
            )
          }
    
    }
}

export default PrivateRoute;
