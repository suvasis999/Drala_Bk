import { ButtonGroup } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import modalImg from '../../assets/modal.png';
import PaypalButtonWrapper from '../../components/paypal/PaypalButtonWrapper';
import donationBanner from './../../assets/donationBanner.png';
import paypal from './../../assets/payment.PNG';
import './UserDonate.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserDonate = ({ handleNext, setPaymentStatusObjectOnParent }) => {
  const [open, setOpen] = React.useState(false);
  const [paymentStatusObject, setPaymentObjectStatus ] = React.useState(null);
  const [donationAmount, setDonationAmount ] = React.useState( 50 );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const setPaymentStatusState = (childPaymentStatusObjectState) =>  {
    setPaymentObjectStatus(childPaymentStatusObjectState);
  }

  React.useEffect(()=>{
    if(setPaymentStatusObjectOnParent){
      setPaymentStatusObjectOnParent(paymentStatusObject);
    }
  },[paymentStatusObject]
  )
  return (  
    <div className='donation_container'>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <div class='modal_img'>
              <img src={modalImg} alt='' />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className='container donation_content'>
        <div className='inner_content'>
          <div className='donation_banner'>
            <img className='img-fluid' src={donationBanner} alt='' />
          </div>

          <div className='donation_detail'>
            <div className='donation_title'>
              <h3>Adoption Donation</h3>
            </div>

            <div className='donation_text'>
              <p>
                To support the Spiritual Adoption process, we request all new
                members donate $50.00 or more at this time. If you would rather
                fill out the Spiritual Adoption Form in person or donate any
                other item or amount, please print and fill out the Adoption
                Form below. We do not have a paid clergy so all offerings go
                directly to paying the Church’s expenses and moving forward the
                Missions of the Church.{' '}
              </p>
            </div>

            <div className='amount_buttons'>
              <button onClick={ () => setDonationAmount(50) } type='button' className='btn me-2 mb-3 amount_btn1'>
                $50.00
              </button>
              <button onClick={ () => setDonationAmount(75) } type='button' className='btn me-2 mb-3 amount_btn2'>
                $75.00
              </button>
              <button onClick={ () => setDonationAmount(100) } type='button' className='btn me-2 mb-3 amount_btn3'>
                $100.00
              </button>
              <button onClick={ () => setDonationAmount(125) }  type='button' className='btn me-2 mb-3 amount_btn4'>
                $125.00
              </button>
              <button onClick={ () => setDonationAmount(150) } type='button' className='btn me-2 mb-3 amount_btn5'>
                $150.00
              </button>
              <button onClick={ () => setDonationAmount(200) } type='button' className='btn me-2 mb-3 amount_btn6'>
                $200.00
              </button>
            </div>


          </div>

          <div>
            <hr />
          </div>

          <div className='payment_details'>
            <div className='payment_title'>
              <h2 className=''>Payment Details</h2>
            </div>
            <div className="">

            <div className='payment_img'>
              <img src={paypal} alt='' />
            </div>

            {/*<div className='paypal_title'>
              PayPal
            </div>
            */}
            <br></br>
            </div>
            <div className='payment_submit_buttons'>

            <div className="w-2/6 h-100 justify-center text-center align-center " ><PaypalButtonWrapper type={'donation'} id={0} initialAmount={ donationAmount } setPaymentStatusOnParent={ setPaymentStatusState }  /></div>

            </div>
          </div>

          <div>
            <hr />
          </div>

          <div className='adoption_content'>
          <h4 className='ml-6'>
            Spirit of Truth NAC <br /> P.O. Box 2045 <br /> Ava, MO 65608 <br />{' '}
            U.S.A.
          </h4>

          <div className='adoption_button ml-6'>
            <button
              onClick={handleOpen}
              type='button'
              className='btn me-5 adoption_btn justify-self-center align-self-center text-center'>
              Adoption Form
            </button>
          </div>
        </div>


        </div>

        
      </div>
    </div>
  );
};

export default UserDonate;
