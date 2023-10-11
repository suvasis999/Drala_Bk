import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Chat from './Chat';
import Dashboard from './Dashboard';
import './member.css';
import Sidebar from './MemberSidebar';
import SpiritualAdoption from './SpiritualAdoption';
import GroupChatEdit from './GroupChatEdit';
import { ToastContainer } from 'react-toastify';
import CoursePage from 'features/courses/Courses page/components/CoursesPage';
import OwnedCoursesPage from 'features/courses/Courses page/OwnedCoursesPage';
import AllCoursesPages from 'features/courses/Courses page/CoursesAllTypesPage';
import CourseViewForMember from 'features/courses/View course/ViewCourseForMember';
import TakingQuiz from 'features/Quiz/TakingQuiz';
import Accoumplishments from 'features/accoumplishments/Accoumplishments';
import ListingDonationHistory from 'features/Transactions/ListingDonationsHistory';
import DonationPage from 'donation/UserDonate/DonationPage';
import ActiveUserDetails from 'features/Users/user details/UserDetails';
import Notification from 'features/Notifications/Notification';
import { getFreeCourse } from 'services/userService';
import { getRecommendedCourses, getUpcommingCourses } from 'services/coursesService';
import Header from 'components/header';
import IDcard from 'features/Users/IdCard/IdCard';

export default function MemberDashboard() {
  const path = '/members';
  const url = '/members';

  return (
    <div className='sharedDashboard' style={{'contain':'paint'}}>
   
        <div className='dashboardRow'>
          <div className='sidebar dashboardSidebar'>
            <Sidebar url={url}></Sidebar>
          </div>
          <ToastContainer />
          <div className='sharedDashboard'>
              <div className='dashboardRow'>

          <div className='dashboardContent'>
              <div className='dashboardHeader'>
                <Header title='Dashbord' sub='Home' role='Instructor' url={url} />
              </div>
          <div className=' w-full'>
          <Switch>

          <Route exact path={`${path}/ID-CARD`}>
            <IDcard></IDcard>
          </Route>



          <Route exact path={path}>
            <Dashboard url={url}></Dashboard>
          </Route>
          <Route exact path={`${path}/dashboard`}>
            <OwnedCoursesPage url={url}></OwnedCoursesPage>
          </Route>

          <Route exact path={`${path}/courses/take/owned`} > 
            <OwnedCoursesPage url={url} ></OwnedCoursesPage>
          </Route>

          <Route exact path={`${path}/courses/take/free`} > 
            <CoursePage url={url}  coursesType={'Free'} handlerFunction={getFreeCourse}> </CoursePage>
          </Route>

          <Route exact path={`${path}/courses/take/upcomming`} > 
            <CoursePage url={url} coursesType={'Upcomming'} handlerFunction={getUpcommingCourses}> </CoursePage>
          </Route>

          <Route exact path={`${path}/courses/take/recommended`} > 
            <CoursePage url={url} coursesType={'Recommended'} handlerFunction={getRecommendedCourses}> </CoursePage>
          </Route>



          <Route exact path={`${path}/courses/all`} > 
            <AllCoursesPages url={path}></AllCoursesPages>
          </Route>

          <Route exact path={`${path}/courses/:courseId`}>
            <CourseViewForMember url={url} operation={'consume'} ></CourseViewForMember>
          </Route>
          
          <Route exact path={`${path}/courses/:courseId/quizzes/:quizId`}>
            <TakingQuiz></TakingQuiz>
          </Route>

          <Route exact path={`${path}/courses/accoumplishments/:courseId`}>
            <Accoumplishments url={url} operation={'View'}> </Accoumplishments>
          </Route>

          <Route exact path={`${path}/transactions/history`}>
            <ListingDonationHistory url={url}> </ListingDonationHistory>
          </Route>

          <Route exact path={`${path}/transactions/send`} >
            <DonationPage></DonationPage>
          </Route>
          
          <Route exact path={`${path}/profile`}>
            <ActiveUserDetails url={url} />
          </Route>
      
          <Route exact path={`${path}/notifications`}>
            <Notification url={url} />
          </Route>
      
          
          <Route exact path={`${path}/Chat`}>
            <Chat url={url} />
          </Route>

          <Route exact path={`${path}/SpiritualAdoption`}>
            <SpiritualAdoption url={url} />
          </Route>

          <Route exact path={`${path}/GroupChatEdit`}>
            <GroupChatEdit url={url} />
          </Route>
          </Switch>
        </div>
    
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}
