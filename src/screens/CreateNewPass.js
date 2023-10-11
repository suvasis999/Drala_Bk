import VisibilityIcon from '@mui/icons-material/Visibility';
// import { VisibilityOff, Visibility } from '@material-ui/icons'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import TextInput from '../components/textInput';
import '../css/CreateNewPass.css';
import { Button } from '@mui/material';
import { PasswordRounded } from '../../node_modules/@mui/icons-material/index';
import { toast } from 'react-toastify';
import { changePassword } from 'services/userService';

export default function ForgotPass() {
  const [password, setPassword] = useState();
  const [Confpassword, setConfpassword] = useState();

  const [PasswordShow, setPasswordShow] = useState(true);
  const [ConfPasswordShow, setConfPasswordShow] = useState(true);
  const changePasswordHandle = async () =>{
    try{
    const response = await changePassword({oldPassword:password,newPassword:Confpassword});
    toast.success('Password changed successfully');
    }catch(error){
      console.log(error);
      if(error.response.status == 422 ){
        toast.error(error.response.data.message);
      }

    }
  }
  return (
    <div>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          
          marginLeft:0,
          marginTop: 20,
          marginBottom:20
        }}>
        <span id='ForgotTxt'>Password section</span>

        <Form.Group
          className='mb-3'
          controlId='formBasicPassword'
          style={{ marginTop: 20 }}
          id='AdditionalID'>
          <Form.Label id='ControlLabel'>Old password</Form.Label>
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
        </Form.Group>

        <Form.Group
          className='mb-3'
          controlId='formBasicPassword'
          id='AdditionalID'>
          <Form.Label id='ControlLabel'>New Password</Form.Label>
          <TextInput
            type={ConfPasswordShow ? 'password' : 'text'}
            InputID='fromControlInput'
            placeholder='Confirm Password'
            PasswordIcon={
              ConfPasswordShow ? <VisibilityOffIcon /> : <VisibilityIcon />
            }
            HideShow_Password={() => setConfPasswordShow(!ConfPasswordShow)}
            HandleChange={e => setConfpassword(e.target.value)}
          />
        </Form.Group>
        <Button 
           variant='contained'
           onClick={changePasswordHandle}
           style={{
             background: `#18498B`,
             borderRadius: '2px',
             margin: '5px',
           }}
           >Change password</Button>
      </Container>
    </div>
  );
}
