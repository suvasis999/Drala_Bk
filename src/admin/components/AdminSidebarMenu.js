import { DashboardOutlined, ExpandLess, ExpandMore } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { BiBookAlt, BiCustomize, BiDollarCircle } from 'react-icons/bi';
import { CgNotes } from 'react-icons/cg';
import { FiSettings, FiUser } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineQuiz } from 'react-icons/md';
import { NavLink, useHistory } from 'react-router-dom';
import { VscCreditCard } from 'react-icons/vsc';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';  
import {toast} from 'react-toastify'
import './css/sidebarMenu.css';

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

const AdminSidebarMenu = ({ url }) => {
  const [quizSubmenu, setQuizSubmenu] = React.useState(false);
  const [coursesSubmenu, setCoursesSubmenu] = React.useState(false);
  const [settingSubMenu, setSettingsSubmenu] = React.useState(false);
  const [userSubMenu, setUserSubMenu] = React.useState(false);
  const [donationSubmenu, setDonationSubmenu] = React.useState(false);
  const [ accomplishmentSubMenu, setAccomplishmentSubMenu ] = React.useState(false);
  const [earningSubMenu, setEarningSubMenu] = React.useState(false);
  const [chatSubMenu, setChatSubMenu] = React.useState(false);
  const history = useHistory();
  const handleClick = () => {
    setQuizSubmenu(!quizSubmenu);
  };
  const handleClick1 = () => {
    setCoursesSubmenu(!coursesSubmenu);
  };
  const handleClick2 = () => {
    setSettingsSubmenu(!settingSubMenu);
  };
  const handleClick3 = () => {
    setUserSubMenu(!userSubMenu);
  };
  const handleClick4 = () => {
    setDonationSubmenu(!donationSubmenu);
  };
  const handleClick5 = () => {
    setAccomplishmentSubMenu(!accomplishmentSubMenu);
  }
  const handleClick7 = () => {
    setEarningSubMenu((prev)=>!prev)
  }
  const handleClickChat = () =>{
    setChatSubMenu((prev)=>!prev);
  }
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        paddingLeft: '15px',
        paddingRight: '15px',
      }}
      component='nav'>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              className='logout_title'>
              <span
                class='material-icons-outlined'
                style={{ marginRight: '5px', color: '#FAAD14' }}>
                error_outline
              </span>
              Log Out
            </Typography>
            <Typography
              id='modal-modal-description'
              sx={{ mt: 2 }}
              className='logout_text'>
              Are you sure you want to log out?
            </Typography>

            <div className='logout_confirm_btns'>
              <Button
                variant='outlined'
                style={{
                  background: '#E6F0FF',
                  borderRadius: '2px',
                  color: '#18498B',
                  margin: '5px',
                  width: '51px',
                  height: '32px',
                }}>
                Back
              </Button>

              <Button
                variant='contained'
                style={{
                  background: '#18498B',
                  borderRadius: '2px',
                  margin: '5px',
                  width: '51px',
                  height: '32px',
                }}>
                OK
              </Button>
            </div>
          </Box>
        </Modal>
      </div>

      {/* dashboard */}
      <NavLink activeClassName='activeMenu' to={`${url}`}>
        <ListItemButton className='nav_dist'>
          <ListItemIcon>
            <DashboardOutlined className='dashboardIcon' />
          </ListItemIcon>
          <ListItemText className='itemText' primary='Dashboard' />
        </ListItemButton>
      </NavLink>
      {/* dashboard */}

      <ListItemButton onClick={handleClick1} className='nav_dist'>
        <ListItemIcon>
          {/* <LocalLibrary className="libraryIcon" /> */}
          <BiBookAlt className='libraryIcon' style={{ fontSize: '24px' }} />
        </ListItemIcon>
        <ListItemText className='itemText' primary='Courses' />
        {coursesSubmenu ? (
          <ExpandLess style={{ color: '#18498B' }} />
        ) : (
          <ExpandMore style={{ color: '#18498B' }} />
        )}
      </ListItemButton>

      <Collapse in={coursesSubmenu} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>

        <NavLink activeClassName='activeMenu' to={`${url}/courses/manage`}>
          
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Manage Courses' />
            </ListItemButton>
          </NavLink>

          <NavLink activeClassName='activeMenu' to={`${url}/courses/changes/`}>
          
          <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
            <ListItemText className='itemText' primary='Courses change requests' />
          </ListItemButton>
        </NavLink>

          {/* Manage owned Course*/}
          <NavLink activeClassName='activeMenu' to={`${url}/courses/owned`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Owned courses' />
            </ListItemButton>
          </NavLink>

          {/* list drafted courses */}
          <NavLink activeClassName='activeMenu' to={`${url}/courses/drafted`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Drafted courses' />
            </ListItemButton>
          </NavLink>

          {/* list pending courses */}
          <NavLink activeClassName='activeMenu' to={`${url}/courses/pending`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Pending courses' />
            </ListItemButton>
          </NavLink>





          {/* Add Course*/}

          {/* Add Category*/}
          <NavLink activeClassName='activeMenu' to={`${url}/categories/manage`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Manage Categories' />
            </ListItemButton>
          </NavLink>
          {/* Add Category*/}

          
            {/* Take Course*/}
            <NavLink activeClassName='activeMenu' to={`${url}/courses/take/owned`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Continue Courses' />
            </ListItemButton>
          </NavLink>


          {/* Take Course*/}
          <NavLink activeClassName='activeMenu' to={`${url}/courses/all`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='New Courses' />
            </ListItemButton>
          </NavLink>
          {/* Take Course*/}
          

          {/* Take Course*/}

        </List>
      </Collapse>

      {/* Site Page*/}
      <ListItemButton className='nav_dist' onClick={()=> toast.warning('Currently not available')}>
          <ListItemIcon>
            {/* <PostAddIcon className="certificateIcon" /> */}
            <BiCustomize className='libraryIcon' style={{ fontSize: '24px' }} />
          </ListItemIcon>
          <ListItemText className='itemText' primary='Site Page' />
        </ListItemButton>
      {/* Site Page*/}

      <ListItemButton onClick={handleClick} className='nav_dist'>
        <ListItemIcon>
          {/* <QuizOutlinedIcon className="smsIcon" /> */}
          <MdOutlineQuiz className='libraryIcon' style={{ fontSize: '24px' }} />
        </ListItemIcon>
        <ListItemText className='itemText' primary='Quiz' />
        {quizSubmenu ? (
          <ExpandLess style={{ color: '#18498B' }} />
        ) : (
          <ExpandMore style={{ color: '#18498B' }} />
        )}
      </ListItemButton>
      <Collapse in={quizSubmenu} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          
          <NavLink activeClassName='activeMenu' to={`${url}/quizzes/manage`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Manage quizes' />
            </ListItemButton>
          </NavLink>
          
          <NavLink activeClassName='activeMenu' to={`${url}/quizzes/owned`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Modify quiz' />
            </ListItemButton>
          </NavLink>
         
          <NavLink activeClassName='activeMenu' to={`${url}/quizzes/add`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Add quiz' />
            </ListItemButton>
          </NavLink>
         


        </List>
      </Collapse>

      <ListItemButton onClick={handleClickChat} className='nav_dist'>
        <ListItemIcon>
          {/* <QuizOutlinedIcon className="smsIcon" /> */}
          <ChatOutlinedIcon className='libraryIcon' style={{ fontSize: '24px' }} />
        </ListItemIcon>
        <ListItemText className='itemText' primary='Chat' />
        {chatSubMenu ? (
          <ExpandLess style={{ color: '#18498B' }} />
        ) : (
          <ExpandMore style={{ color: '#18498B' }} />
        )}
      </ListItemButton>
      <Collapse in={chatSubMenu} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          
          <NavLink activeClassName='activeMenu' to={`${url}/chat`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Messenger' />
            </ListItemButton>
          </NavLink>
          <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist' onClick={()=> toast.warning('Currently not available')}>
              <ListItemText className='itemText' primary='Chat Group' />
            </ListItemButton>
         


        </List>
      </Collapse>


      {/* Certificates*/}
      <ListItemButton onClick={handleClick5} className='nav_dist'>
        <ListItemIcon>
          {/* <PersonIcon className="creditCardIcon" /> */}
          <CgNotes className='libraryIcon' style={{ fontSize: '20px' }} />
        </ListItemIcon>
        <ListItemText className='itemText' primary='Accoumplishments' />
        {accomplishmentSubMenu ? (
          <ExpandLess style={{ color: '#18498B' }} />
        ) : (
          <ExpandMore style={{ color: '#18498B' }} />
        )}
      </ListItemButton>

      <Collapse in={accomplishmentSubMenu} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {/* View Details*/}
          <NavLink activeClassName='activeMenu' to={`${url}/accoumplishments/add`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Add accomplishment' />
            </ListItemButton>
          </NavLink>
          {/* View Details*/}

          {/* Grant Permission*/}
          <NavLink activeClassName='activeMenu' to={`${url}/accoumplishments/edit`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Modify Accomplishment' />
            </ListItemButton>
          </NavLink>
          {/* Grant Permission*/}
          {/* Requested Changes*/}
        </List>
      </Collapse>


      <ListItemButton onClick={handleClick3} className='nav_dist'>
        <ListItemIcon>
          {/* <PersonIcon className="creditCardIcon" /> */}
          <FiUser className='libraryIcon' style={{ fontSize: '24px' }} />
        </ListItemIcon>
        <ListItemText className='itemText' primary='User' />
        {userSubMenu ? (
          <ExpandLess style={{ color: '#18498B' }} />
        ) : (
          <ExpandMore style={{ color: '#18498B' }} />
        )}
      </ListItemButton>

      <Collapse in={userSubMenu} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>

          <NavLink activeClassName='activeMenu' to={`${url}/users/details`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='User View Details' />
            </ListItemButton>
          </NavLink>


          <NavLink activeClassName='activeMenu' to={`${url}/users/changes`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Users Change Requests' />
            </ListItemButton>
          </NavLink>


        </List>
      </Collapse>
 

      {/* Earnings */}

      <ListItemButton onClick={handleClick7} className='nav_dist'>
        <ListItemIcon>
          {/* <CreditCard className="creditCardIcon" /> */}
          <VscCreditCard className='libraryIcon' style={{ fontSize: '24px' }} />
        </ListItemIcon>
        <ListItemText className='itemText' primary='Earnings' />
        {earningSubMenu ? (
          <ExpandLess style={{ color: '#18498B' }} />
        ) : (
          <ExpandMore style={{ color: '#18498B' }} />
        )}
      </ListItemButton>
      <Collapse in={earningSubMenu} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {/* Drala Earnings */}
          <NavLink activeClassName='activeMenu' to={`${url}/transactions/earnings`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Earnings' />
            </ListItemButton>
          </NavLink>
          {/* Drala Earnings */}

          {/* Drala Earnings History*/}
          <NavLink activeClassName='activeMenu' to={`${url}/transactions/manage`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Manage' />
            </ListItemButton>
          </NavLink>
          {/* Drala Earnings History*/}
        </List>
      </Collapse>




      {/* Admin area done */}

      <ListItemButton onClick={handleClick4} className='nav_dist'>
        <ListItemIcon>
          {/* <AttachMoney className="moneyIcon" /> */}
          <BiDollarCircle
            className='libraryIcon'
            style={{ fontSize: '24px' }}
          />
        </ListItemIcon>
        <ListItemText className='itemText' primary='Donation' />
        {donationSubmenu ? (
          <ExpandLess style={{ color: '#18498B' }} />
        ) : (
          <ExpandMore style={{ color: '#18498B' }} />
        )}
      </ListItemButton>
      <Collapse in={donationSubmenu} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {/* Send*/}
          <NavLink activeClassName='activeMenu' to={`${url}/transactions/send`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='Send' />
            </ListItemButton>
          </NavLink>
          {/* Send*/}

          {/* History */}
          <NavLink activeClassName='activeMenu' to={`${url}/transactions/history`}>
            <ListItemButton sx={{ pl: 4 }} className='drop_nav_dist'>
              <ListItemText className='itemText' primary='History' />
            </ListItemButton>
          </NavLink>
          {/* History */}

        </List>
      </Collapse>


    </List>
  );
};

export default AdminSidebarMenu;
