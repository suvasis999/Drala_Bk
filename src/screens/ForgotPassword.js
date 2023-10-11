import React, { useState } from 'react';
import '../css/ForgotPass.css';
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import forgotpass from '../assets/forgotpass.png';
import TextInput from '../components/textInput';
import NavbarComp from '../components/navbar';
import { toast,ToastContainer } from 'react-toastify';

import { forgetPassword } from 'services/userService';
// import ReactCodeInput from 'react-verification-code-input';

export default function ForgotPass() {

    const [VerificationCode, SetVerificationCode] = useState(null)
    const [email, setEmail] = useState();
    const history = useHistory();
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleSubmit = async () =>{
        try{
            const response = await forgetPassword({'email':email});
            toast.success('An email is sent to confirm your password change.')
        }catch(error){
            if(error.response.status == 422 ){
                toast.error('Invalid Email');

            }
        }
    }

    return (
        <div>
            <NavbarComp />
            <ToastContainer></ToastContainer>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
                <img src={forgotpass} style={{ maxWidth: "140px", height: 140, borderRadius: 10 }} />
                <p id="forgotPassTxt">Forgot Password</p>
                <span id="ForgotTxt">Enter in your email to receive a verification code.</span>
                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: 20 }} id="AdditionalID">
                    <Form.Label id="ControlLabel">Email</Form.Label>
                    <TextInput InputID="fromControlInput" type="email" placeholder="test@example.com" HandleChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Button id="SubmitBtn" style={{ background: re.test(email) ? "#18498B" : "#BDBDBD" }} disabled={re.test(email) ? false : true} onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}