import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useHistory } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import UserDonate from '../UserDonate/UserDonate';
import Spiritual from './../Spiritual/Spiritual';
import UserDonationSuccess from './../UserDonationSuccess/UserDonationSuccess';
import UserInfo from './../UserInfo/UserInfo';
import toast, { Toaster } from 'react-hot-toast';
import { ContextApi } from './../../contexts/ContextProvider';
import { completeRegistration, finishRegistration } from '../../services/userService';
import './StepperArea.css';

// const steps = ['user_info', 'terms_and_conditions', 'donation', 'final_step'];
const steps = [
  [
    {"name": "Personal Information"},
    {"label": "user_info"}
  ],
  [
    {"name": "Adoption"},
    {"label": "terms_and_conditions"}
  ],
  [
    {"name": "Donation"},
    {"label": "donation"}
  ],
  [
      {"name": "Final Step"},
      {"label": "final_step"}
  ]
];

const useQuery = () => {

  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);

}


export default function StepperArea() {
  const history = useHistory();

  const contextApi = React.useContext(ContextApi);
  const [isProcessing,setIsProcessing ] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [ isLoading, setisLoading ] = React.useState(true);
  const [skipped, setSkipped] = React.useState(new Set());
  const [paymentStatusObject, setPaymentObjectStatus] = React.useState(null);
  const [ imageId, setImageId ] = React.useState('');
  const setPaymentObjectStatusState = (childPaymentStatusObject)=>{
    setPaymentObjectStatus(childPaymentStatusObject);
  }

  const [userDetails, setUserDetails] = React.useState({ 
    formErrors: {
      email:'',
      password:'',
      firstName:'',
      date: '',
      lastName: '',
      phoneNumber: '', 
      sex: '',
      addressFirstLine: '',
      zipCode: '',
      city: '',
      state: '',
      country: ''
    },

    password: '',
    email: '',
    firstName:'',
    date: '',
    lastName: '',
    phoneNumber: '', 
    sex: '',
    addressFirstLine: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    spiritualName: '',
    addressSecondeLine: '',
    dralaWalletAdress: '',
    middleName: '',


    showPassword: false,
    stateValid: false,
    cityValid: false,
    addressFirstLineValid: false,
    sexValid: false,
    phoneNumberValid:false,
    lastNameValid: false,
    dateValid:false,
    passwordValid:false,
    emailValid:false,
    firstNameValid:false,
    zipCodeValid: false,
    countryValid: false,
    

  });

  const [isAgreedOnTerms, setIsAgreedOnTerm ] = React.useState( false );



  // set user details state for first step of the stepper area

  const step = parseInt(useQuery().get('step'));
  
  const secondStepHandler = async () => {

    const data = { 
      'name': userDetails.firstName,
      'middle_name': userDetails.middleName ,
      'last_name': userDetails.lastName,
      'spirtual_name': userDetails.spiritualName,
      'sex': userDetails.sex,
      'adresse_line_1':userDetails.addressFirstLine,
      'adresse_line_2':userDetails.addressSecondeLine,
      'state':userDetails.state,
      'city':userDetails.city,
      'zip_code':userDetails.zipCode,
      'country':userDetails.country,
      'phone_number':userDetails.phoneNumber,
      'password': userDetails.password,
      'email': userDetails.email,
      'birth_date': userDetails.date,
      'image': imageId,
      'dralla_wallet_adress': userDetails.dralaWalletAdress
    }

    try{
        setIsProcessing(true)
        debugger;
        const response = await completeRegistration(contextApi.authInfo._id,data);
        contextApi.setAuthInfo(response.data.data);
        setIsProcessing(false)
        toast.success('Registration is complete')
    }catch(error){
        console.log(error);
        debugger;
        if( error.response.status == 422 ){
          for( const errorMessage in error.response.data.errors ){
            toast.error(error.response.data.errors[errorMessage].message);
          }
          throw error;
        }
        throw ( error );
        toast.error('Server may be down re try again');
    }finally{
        setIsProcessing(false);
    }
  }

  const thirdStepHandler = async () => {
    try{
      debugger;
      setIsProcessing(true)
      const response = await finishRegistration(contextApi.authInfo._id);
      contextApi.setAuthInfo(response.data.data);
      setIsProcessing(false)
      history.push('/members');
      toast.success('Registration is finished')
    }catch(error){
        console.log(error)
        throw error;
    }finally{
        setIsProcessing(false);   
        debugger
    }
  }

  const setUserDetailsState = ( userDetails, imageId ) => {
        setImageId(imageId);
        setUserDetails(userDetails);

  }

  // set if the user agreed on term and state
  const setIsAgreedOnTermState = (isAgreedOnTerms) => {
        setIsAgreedOnTerm(isAgreedOnTerms);
  }

  React.useEffect(()=>{
    setActiveStep( step ? step : 0 );
    setisLoading(false);
  },[])

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;

    debugger
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    try{

  
      if ( activeStep == 1 ) {
        await secondStepHandler();
      }
      if (activeStep == 3 ) {
        debugger    
        await thirdStepHandler();
        return;
      }
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setSkipped(newSkipped);
    }catch( error ){
      console.log(error);
    }
  
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  React.useEffect(()=>{
    console.log(contextApi.authInfo);
  },[contextApi.authInfo])

  if(!isLoading){
  return (
    <div>
    <div id='Top'>
      <div>
        <Toaster position='top-right' reverseOrder={false} />
      </div>
    </div>
    <div className='stepper_container'>
      <Container sx={{ p: 0 }}>
        <Box className='stepper_content'>
          <div className='stepper_spacer'></div>
          <Stepper className='Stepper' activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant='caption'></Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label.label} {...stepProps}>
                  <StepLabel {...labelProps}>{label.name}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {false ? (
            <React.Fragment>
              {/* step 4 component */}
              {
                <div>
                  <h1>Step 4</h1>
                </div>
              }
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && <UserInfo setFormStateOnParent = { setUserDetailsState } initialUserData = { userDetails } initImageId= {imageId} />}

              {activeStep === 1 && <Spiritual setStateOnParent = { setIsAgreedOnTermState }/>}

              {activeStep === 2 && <UserDonate handleNext={ handleNext } setPaymentStatusObjectOnParent={ setPaymentObjectStatusState } />}

              {activeStep === 3 && <UserDonationSuccess handleNext= { handleNext } isDonationSucceded={ (paymentStatusObject != null && (paymentStatusObject.amount >= 50 && paymentStatusObject.status == 'SUCCESS')) || contextApi.authInfo.isDonated } />}

              {activeStep === 3 || (
                <Box
                  className='stepperButtons'
                  sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                  <Button
                    style={{
                      background: '#18498B',
                      width: '156px',
                      height: '40px',
                      marginRight: '16px',
                      fontWeight: 700,
                      borderRadius: '2px',
                    }}

                    variant='contained'
                    disabled={ ( activeStep === 0 && ( !userDetails.formValid || !imageId.length > 0 ) ) || (activeStep === 1 && !isAgreedOnTerms ) || (activeStep === 2 && (paymentStatusObject !== null && paymentStatusObject.status != 'SUCCESS') ) }
                    onClick={handleNext}
                    
                    >

                    { isProcessing ? ( //isProcessing
                    <CircularProgress
                    style={{ height: '15px', width: '15px' }}
                    color='primary'
                    />
                    ) : (
                
                    ( activeStep === 0
                      ? 'SAVE'
                      : activeStep === steps.length - 1
                      ? 'FINISHED'
                      : 'NEXT'
                    )
                
                    )
                  }
                  </Button >
                  { activeStep != 2 || <Button
                   style={{
                    background: '#E6F0FF',
                    width: '156px',
                    height: '40px',
                    color: '#18498B',
                    fontWeight: 700,
                    borderRadius: '2px',
                  }}  
                  onClick={ handleNext }
                  >
                  Skip
                  </Button>
                   
                  }

                  { activeStep == 2 || <Button
                    style={{
                      background: '#E6F0FF',
                      width: '156px',
                      height: '40px',
                      color: '#18498B',
                      fontWeight: 700,
                      borderRadius: '2px',
                    }}
                    disabled={ activeStep === 0 || isProcessing }
                    onClick={handleBack}
                    //   sx={{ mr: 1 }}
                    >
                    Back
                  </Button>
                  }
                </Box>
              )}
            </React.Fragment>
          )}
        </Box>
      </Container>
    </div>
    </div>
  );
  }
}
