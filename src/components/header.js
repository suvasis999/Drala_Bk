import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge, Button } from '@mui/material';
import { ContextApi } from 'contexts/ContextProvider';
import React, { useContext, useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { getImagePath } from 'services/imageService';
import useContexts from '../hooks/useContexts';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import './header.css';
import { toast } from 'react-toastify';
import { logOut } from 'services/userService';


const ProfileMenuOptions = ({url}) => {
  const [open, setOpen] = React.useState(false);
  const contextApi = useContext(ContextApi);
  const anchorRef = React.useRef(null);
  const history = useHistory();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  
  const handleProfile = event => {
    history.push(`${url}/profile`);
    event.preventDefault();
  }
  const handleClickIdCard = event => {
    history.push(`${url}/ID-CARD`);
    event.preventDefault();
  }
  const handleLogOut = async (event) => {
    try{
      const response = await logOut();
      contextApi.destroyContext();
      history.push('/');
      toast.succes('you logged out successufly');
    }catch(error){
      toast.error("Something went wrong");
    }
    
  }
  return(
    <div className='mx-2'>


    <a  
    ref={anchorRef}
    aria-controls={open ? 'composition-menu' : undefined}
    aria-expanded={open ? 'true' : undefined}
    aria-haspopup="true" onClick={handleToggle}
    id="composition-button" aria-expanded="true" role="button" class="dropdown-toggle nav-link" tabindex="0" href="#">

    </a>


    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      
      transition
      
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper className={'z-[10000]'}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
                disablePortal
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClickIdCard}>ID CARD</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </div>
  )

}
const Header = ({ title, sub, role, url, course }) => {
  const context = useContext(ContextApi)
  const { isSideBarOpen, setSidebarOpen } = useContexts();
  const [ isGettingImage, setIsGettingImage ] = useState( false )
  const [isLoading, setIsLoading ] = useState(true);
  const [avatarImage, setAvatarImage ] = useState(null);

  useEffect(()=>{
    if(context.authInfo.isAuthenticated) {

      const initData = async () => {
        setIsGettingImage(true);
        const imagePath = await getImagePath(context.authInfo.image);
        setAvatarImage(imagePath);
        console.log(imagePath);
        setIsLoading(false);

      }
      if(!isGettingImage){
      initData();
      console.log('getting image', context.authInfo.image );
      }

    }
  },[ context.authInfo.isAuthenticated ])

  if(!isLoading){
    return (
      <div className='header container'>
      <div className='title head_title_none'>
        <h4
          className='header_notification'
          style={{ color: '#0A376E', fontSize: '24px', fontWeight: 400 }}>
          {title}
        </h4>
        <p style={{ color: '#8C8C8C', fontSize: '14px', fontWeight: 400 }}>
          {sub}
        </p>
      </div>


      <div className='hamburger_menu'>
        <Button onClick={() => setSidebarOpen(!isSideBarOpen)}>
          <span class='material-icons-outlined'>
            {isSideBarOpen ? 'close' : 'menu'}
          </span>
        </Button>
      </div>

      <div className='searchbox'>

        <div className=''>

          <NavLink to={`${url}/Notifications`}>
            <div className='' id='alarm_parent'>
              <Badge badgeContent={context.notification} color='primary'>
                <NotificationsNoneIcon className='alarm'></NotificationsNoneIcon>
              </Badge>
            </div>
          </NavLink>


        </div>
        <div className='avatar lg:min-w-[140px]'>
          <img src={avatarImage} alt='' />
          <span>{context.authInfo.role}</span>

      
          <ProfileMenuOptions url={url} />


   

        </div>
      </div>


      </div>
    );
    }
};

export default Header;
