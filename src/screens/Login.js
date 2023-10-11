import VisibilityIcon from '@mui/icons-material/Visibility';

// import { VisibilityOff, Visibility } from '@material-ui/icons'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {toast,ToastContainer} from 'react-toastify';

import { Link, useHistory } from 'react-router-dom';
import welcomeImg from '../assets/welcomeImg.png';
import NavbarComp from '../components/navbar';
import TextInput from '../components/textInput';
import { logIn } from './../services/userService'

import '../css/Authentication.css';
import ReCAPTCHA from "react-google-recaptcha";
import {ContextApi} from '../contexts/ContextProvider'

export default function Login() {
  const contextApi = useContext(ContextApi);
  const history = useHistory();

  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ isformValid, setIsFormValid ] = useState(false);

  const [PasswordShow, setPasswordShow] = useState(true);

  const [error, setError] = useState();
  const [iserror, setIsError] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  //const history = useHistory();

  const validateForm = (password, email ) => {
    return password.length > 0 && email.length > 0;
  }

  async function userSignin() {
    setIsProcessing(true);
 
    if (re.test(email)) {

      try{ 

        const response = await logIn(email,password);
        setIsError(false);
        setshowAlert(true);
        setshowAlert(false);
        toast.success('Successfully logged in!');
        console.log(response);
        
        contextApi.setAuthInfo( response.data.data.user );
        if(response.data.data.user.new_email){
          history.push('/verification');
          return;
        }
        if(response.data.data.user.role == 'member') {
          history.push('/members');
        }else if(response.data.data.user.role == 'instructor'){
          history.push('/instructors');
        }
        if(response.data.data.user.role == 'admin' ){
          history.push('/admins');
        }


        setIsProcessing(false);
         
        setshowAlert(true);
        setTimeout(() => {
          setshowAlert(false);
          clearTimeout();
        }, 2000);

        
      } catch(error) {
        
        let errorMessage = '';
        let errorMessageToaster;
        console.log(error)
        switch(error.response.status){
          case 422:
            errorMessage = error.response.message;
            errorMessageToaster = "Login failed! Re-check your input."
            break;
          case 500:
            errorMessageToaster = "Internal server error."; 
            break;
          case 0:
            errorMessageToaster = "Check your network settings."; 
            break;
          default:
            errorMessageToaster = "Unkown error."; 
            break;
        }
        setIsProcessing(false);
        console.log(errorMessage)
        if(typeof (errorMessage) !== 'undefined' ){ setIsError(true); setError(errorMessage); }
        
        toast.error(errorMessageToaster);
        setshowAlert(true);
        setTimeout(() => {
          setshowAlert(false);
          clearTimeout();
        }, 2000);
      }


    } else {
      setIsError(true);
      setError('Please enter valid email');
      toast.error('Login failed!');
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
        clearTimeout();
      }, 2000);
    }
  }

  React.useEffect(() => {
    console.log(contextApi.authInfo);
  }, [contextApi.authInfo]);

  React.useEffect(()=>{
      setIsFormValid( validateForm(password,email) );
  },[password,email])


  return (
    <div id='Top'>
      <ToastContainer></ToastContainer>
      <NavbarComp />

      <div className='inner_screen_login'>
        <div id='SignIn_rightPart'>
          <div style={{ alignItems: 'flex-start' }}>
            <br />
            <h4 id='ScreenSignin'>Sign In</h4>
            <br />
            <p id='SignInWelcomeline'>
              Welcome Back! Please login to your account.
            </p>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label id='ControlLabel'>Email</Form.Label>
              <TextInput
                InputID='fromControlInput'
                type='email'
                placeholder='test@example.com'
                HandleChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label id='ControlLabel'>Password</Form.Label>
              <TextInput
                type={PasswordShow ? 'password' : 'text'}
                InputID='fromControlInput'
                placeholder='Enter your password.'
                PasswordIcon={
                  PasswordShow ? <VisibilityOffIcon /> : <VisibilityIcon />
                }
                HideShow_Password={() => setPasswordShow(!PasswordShow)}
                HandleChange={e => setPassword(e.target.value)}
              />
              {iserror && <Form.Text id='errorLine'>{error}</Form.Text>}
            </Form.Group>
            {/*
            <div className="my-3">
              <ReCAPTCHA
                sitekey="6LfV_7EfAAAAAK3cHWTEfyrRFDyXlwhRMiQHUI8b"
              // onChange={onChange}
              />
            </div>
            */}
            <Link to={{ pathname: '/ForgotPass' }} id='lostPassword'>
              Lost Password?
            </Link>

            <div className='inner_signIn_btn'>
              <Button
                id='signInBtn_Big'
                onClick={ () => { userSignin() } }
                disabled={!isformValid}
                style={{
                  background:
                  isformValid ? 'blue':'white',
                }}>
                  
                {isProcessing ? ( //isProcessing
                  <CircularProgress
                    style={{ height: '15px', width: '15px' }}
                    color='primary'
                  />
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p id='NoAccount'>Don’t have an account ?</p>
              <Link id='SignupNavigation' to={{ pathname: '/Signup' }}>
                Sign Up
              </Link>
            </div>

            <hr style={{ border: '1px solid #C2C2C2' }} />
            {/* <Button id='SocialLoginGoogleBtn'>
              <img src={googleIcon} alt="" />
              Sign In with Google
            </Button> */}
          </div>
        </div>
        <div id='Sign_in_leftPart'>
          <img
            src={welcomeImg}
            style={{ borderRadius: 20, width: '80%' }}
            alt=''
          />
        </div>
      </div>
    </div>
  );
}

/*

      {showAlert
        ? [
          iserror ? (
            <div
              id='ShowAlertBox'
              style={{ position: 'absolute', top: 100, right: 30 }}>
              <Alert
                text='Login failed'
                Icon={cross}
                clicked={() => setshowAlert(false)}
              />
            </div>
          ) : (
            <div
              id='ShowAlertBox'
              style={{ position: 'absolute', top: 100, right: 30 }}>
              <Alert
                text='Login Successful'
                Icon={Vector}
                clicked={() => setshowAlert(false)}
              />
            </div>
          ),
        ]
        : null}
*/
