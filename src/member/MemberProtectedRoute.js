 
import React, { useContext,useEffect,useState } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ContextApi } from '../contexts/ContextProvider'
import StepperArea from '../donation/StepperArea/StepperArea'
import  VerificationScreen from '../screens/Verification'
import NotFound from '../components/PageNotFound';
import MemberDashboard from './MemberDashboard';

const MemberProtectedRoute = () => {
    const contextApi = useContext( ContextApi );
    const [isLoading, setIsLoading ] = useState(true);
    const [status, setStatus ] = useState(null);
    const [ newEamil, setNewEmail ] = useState(null);

 
    useEffect(()=>{

        if(typeof (contextApi.authInfo.account_status) !== 'undefined' && typeof (contextApi.authInfo.email) !== 'undefined' ) {
            if(contextApi.authInfo.account_status == 'completed'){
                setStatus(contextApi.authInfo.isDonated ? 'donated' : 'not_donated')
            }else{
                setStatus(contextApi.authInfo.account_status);
            }
        }
        setIsLoading(false)
    },[contextApi.authInfo]
    )

    useEffect(()=>{
        debugger
        if(status) setIsLoading(false);
    },[status])

    const RedirectDependingOnUserState = ( userStatus ) => {
        let action;

        switch(userStatus){
            
            case 'not_active':
                action = <Redirect exact to='/members/OTP' component={VerificationScreen}/>
                break;
            case 'active':
                action = <Redirect to="/members/StepperArea?step=0" component={StepperArea} />
                break;
            case 'not_donated':
                action = <Redirect to="/members/StepperArea?step=2" component={StepperArea} />
                break;
            case 'donated':
                action = <Redirect to="/members/StepperArea?step=3" component={StepperArea} />
                break;     
            case 'finished':
                action = <Redirect to='/members/dashboard' />
                break;
            default:
                action = <Redirect to="/SignIn" />
                break;
        }
        return action;
    }
    
    const exposedRoutes = ( userStatus ) => {
        let action;
        switch(userStatus){
            case 'not_active':
                action = <Route exact path='/members/OTP' component={VerificationScreen}/>
                break;
            case 'active':
                action = <Route path="/members/StepperArea" component={StepperArea} />
                break;
            case 'completed':
                action = <Route path="/members/StepperArea" component={StepperArea} />
                break;
            case 'not_donated':
                action =  <Route path="/members/StepperArea" component={StepperArea} />
                break;
            case 'donated':
                action = <Route path="/members/StepperArea" component={StepperArea} />
                break;
            case 'finished':
                action = <Route path='/members' component={MemberDashboard} />
                break;
            default:
                action = <Redirect to="/SignIn" />
                break;
        }
        return action;
    }

    //conditional exposed routes
    const routingDependingOnUserState = (userStatus) => {
        return exposedRoutes(userStatus);

    }


    if(!isLoading){

        return(

            <Switch>
                <Route exact path="/members" component={() => RedirectDependingOnUserState(status) } />
                { routingDependingOnUserState(status) }
                <Route path="*" component={NotFound}/>
            </Switch>


        );

    }
}

export default MemberProtectedRoute;