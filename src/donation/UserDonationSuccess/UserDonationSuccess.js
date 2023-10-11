import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import headerImg from './../../assets/donationBanner.png';
import tikImg from './../../assets/doneIcon.png';
import loveImg from './../../assets/loveIcon.png';
import './UserDonationSuccess.css';

const UserDonationSuccess = ({handleNext,isDonationSucceded}) => {

  return (
    <Container className='usrDS'>
      <div className='usrDS_image'>
        <img src={headerImg} alt='' />
      </div>
      <h6 class='bodyTitle'>adoptation donation</h6>
      <div className='bodyContent'>
      { !isDonationSucceded || <div>
        <div className='loveIcon'>
          <img src={loveImg} alt='' />
        </div>
        
            <h5>Thank you for your donation</h5>
            </div>
          }
            <div className='tikIcon'>
              <img src={tikImg} alt='' />
            </div>
            
       
        <p className='bodyPara'>
          Once your adoption has been approved by the Principal Medicine Chief,
          <br />
          your Adoption Certificate will be available in your Certificates Menu.
        </p>
        <button onClick={ handleNext } className='finishBtn'>
          Finished
        </button>
      </div>
    </Container>
  );
};

export default UserDonationSuccess;
