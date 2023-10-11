import React, { useEffect, useState } from 'react';
import './AdminNotification.css'
import { Button } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import { seeNotification,getNotifications } from 'services/userService';
import { notification } from '../../../node_modules/antd/lib/index';
import Divider from '@mui/material/Divider';

const Notification = ({ sub, url }) => {

    
    const [ notifications, setNotifications ] = useState([]);
    const [ isThereIsMoreNotifications, setIsThereIsMoreNotifications ] = useState(true);
    

    useEffect(()=>{
        showMoreNotifications(0);
    },[])


    const showMoreNotifications = async () => {
        const response = await getNotifications(notifications.length);
        const newNotifications = [...notifications,...(response.data.data.items)];
        console.log(!(response.data.data.rest == 0));
        setIsThereIsMoreNotifications(!(response.data.data.rest == 0))
        setNotifications(newNotifications);
    }

    const handleNotificationSeen = async (e,notification) => {
        try{
            const response = await seeNotification(notification._id);
            const el = e.target;
            const parent = el.parentNode;
            parent.classList.remove("active"); 
            //history.push(`${url}${notification.link}`);
        }catch(error){
            console.log(error);
        }
    }

    const handleNotificationClick = async (e,notification) => {
        try{
            const response = await seeNotification(notification._id);
            history.push(`${url}${notification.link}`);
        }catch(error){
            console.log(error);
        }
    }


    const history = useHistory();
    return (
            <>

                    <div className='px-3'>
                        <div className='dashboardContentPanel h-auto'>
               
                            <div className='notificationContent'>
                                <div className='subheader'>
                                    <h4>Notification Update</h4>
                                </div>

                                {notifications.map(notification => (
                                    <React.Fragment key={notification._id}>
                                    <div data-key={notification._id} className={`notification ${notification.isSeen ? 'active' : ''}` }>
                                    <h5>{notification.title}</h5>
                                    <p>
                                        {notification.body}{' '}
                                        <span className='underline' onClick={(e)=>{handleNotificationClick(e,notification)}}>here</span> .
                                    </p>

                                        <h6 className='underline cursor-pointer mb-0 pb-0 text-active-button' onClick={(e)=>{handleNotificationSeen(e,notification)}}>Mark as seen</h6>

                                    </div>
                                    <Divider light={true}></Divider>
                                    </React.Fragment>
                                ))}

                                <p onClick={showMoreNotifications} hidden={!isThereIsMoreNotifications} className='text-center hover:text-active-button cursor-pointer mb-2'> Show older </p>
                            </div>
                        </div>
                    </div>
                    <div className='mb-5 pb-5'>
                        <NavLink to={`${url}`}>
                            <Button
                                sx={{ mt: 5 }}
                                style={{
                                    background: '#18498B',
                                    borderRadius: '2px',
                                    marginTop: '20px',
                                    marginLeft: '24px',
                                    marginBottom: '15px',
                                }}
                                variant='contained'>
                                Continue to Dashboard
                            </Button>
                        </NavLink>
                    </div>
            </>
    );
};

export default Notification;