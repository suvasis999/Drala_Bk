import { DownloadOutlined, Print } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ContextApi } from 'contexts/ContextProvider';
import { dayMonthYear } from 'helpers/Date';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getImagePath } from 'services/imageService';

import './AdminSettingsID.css';
import { useReactToPrint } from 'react-to-print';

import backSealBuffer from 'assets/ID_CARD/Asset 5.png'
import frontSealBuffer from 'assets/ID_CARD/Asset 4.png'
import { base_front_url } from 'config/magic_constants';


export const IDcard = ({ url }) => {
  const context = useContext(ContextApi)

  const [isLoading, setIsLoading ] = useState(true);
  const [avatarImage, setAvatarImage ] = useState(null);
  const [ userDetails, setUserDetails ] = useState(null);
  const componentRef = useRef();
  const backSeal = `${base_front_url}${backSealBuffer}`
  const frontSeal = `${base_front_url}${frontSealBuffer}`
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(()=>{
    if(context.authInfo.isAuthenticated) {
      const initData = async () => {
        const imagePath = await getImagePath(context.authInfo.image);
        setAvatarImage(imagePath);
        setUserDetails(context.authInfo);
        setIsLoading(false);
      }

      initData();

    }
  },[ context.authInfo ])

  if(!isLoading){


  return (

          <div className='container-fluid'>
            <div className='bg-white px-3'>
              <div className='dashboardContentPanel h-auto'>
                <div className='id-card '>
                  <p className='a_d_title_clr'>ID Card</p>
                </div>

                <div>
                  <hr />
                </div>

                <div>
                  <Button
                    style={{
                      background: '#18498B',
                      borderRadius: '2px',
                      margin: '5px',
                      color: '#FFFFFF',
                    }}>
                    Download<DownloadOutlined></DownloadOutlined>
                  </Button>

                  <Button
                    onClick={handlePrint}
                    style={{
                      backgroundColor: '#34A853',
                      color: 'white',
                      borderRadius: '2px',
                      margin: '5px',
                    }}>
                    Print<Print></Print>
                  </Button>
                </div>

                <div className='mx-auto my-10 !w-[350px] !h-[370px] black-border ' ref={componentRef}>

                <div className="w-full h-[50%] flex flex-row black-border " >
                      <div class="w-[30%]   " >
                      <img src={avatarImage} className={"h-[45%] w-[90%] mx-auto mt-6"}></img>
                      <img src={`${backSeal}`} className={"h-[35%] w-[70%] mt-2 mx-2"}></img>

                      
                      </div>
                      <div class="w-[70%] flex flex-col" >
                        <h3 className='mt-1 text-center signature p-0 m-0' style={{'fontSize': '1.3rem'}}>Spirtual Thruth</h3>
                        <h6 className='mt-1 text-center text-style font-light p-0 m-0 underline underline-offset-4' style={{'fontSize': '0.9rem'}}>Native American Church Minister</h6>
                        
                        <div className='ml-[15.5px] mt-1'>
                        { !userDetails.spirtual_name || <h4 className=' text-start !font-extralight text-style p-0 m-0' style={{'fontSize': '1.1rem'}} >{ userDetails.spirtual_name } </h4> }
                        <h4 className=' text-start font-light text-style p-0 m-0'  style={{'fontSize': '1.1rem'}}>{`${userDetails.last_name} ${userDetails.last_name}`  }</h4>
                        <h4 className=' text-start font-light text-style p-0 m-0'   style={{'fontSize': '1.1rem'}}>{userDetails.adresse_line_1}</h4>

                        { !userDetails.adrese_line_2 == <h4 className=' text-start font-light text-style p-0 m-0'   style={{'fontSize': '1.1rem'}}>{userDetails.adresse_line_2}</h4> }
                        </div>
                        <h4 className=' text-center font-mono font-medium p-0 mb-0 mt-auto justify-self-end ml-24' style={{'fontSize': '0.9rem'}} >DOB:{dayMonthYear(userDetails.birth_date)}</h4>
                      </div>
                      
                    </div>
                    

                    <div className='"w-full p-1 min-h-[50%] black-border text-style font-normal text-black id-card-transform'>

                        <p style={{'fontSize':'0.79rem'}} className={'rotate m-0 p-0 text-black'}>
                        Certified Minister and Medicine Holder legally recognized as “Indian" under
                        the law and authorized to perform all religious ordinances and ceremonies pertaining to their assigned
                        calling, in conjunction with the usage of Plants, Animals, Stones, Feathers, and so forth which tenets
                        unite us on the Sacred Healing Way. Our religion is opposed
                        </p>

                      <img className={'!float-right h-[57px] w-16 !relative '} src={frontSeal}/>

                      <p  className='m-0 p-0 text-black' style={{'fontSize':'0.68rem'}}>
                      
                          to practices that have the potential to do
                          harm. As such the current practices of PCR swabs and mandated immunizations goes against our religious
                           beliefs
                           </p>
                    </div>
                  
                    
                    
                    { // 'use that for vertical transfrmin: '
                     }
                  
                </div>


              </div>
            </div>
            </div>
          

  );
  }

};

export default IDcard;


