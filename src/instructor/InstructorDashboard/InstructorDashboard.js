
import './InstructorDashboard.css';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Sidebar from '../InstructorSidebar/InstructorSidebar';
import DashboardInstructor from '../DashboardInstructor/DashboardInstructor';

import Accomplishments from '../../features/accoumplishments/Accoumplishments';
import DonationPage from 'donation/UserDonate/DonationPage';
import CourseViewForMember from '../../features/courses/View course/ViewCourseForMember';

import AddEditCourse from '../../features/courses/AddEditCourseDetails/AddEditCourse';
import ListDraftedCourses from '../../features/courses/List courses/ListDraftedCourses';
import ListCoursesThatHaveQuizzes from '../../features/courses/List courses/ListOwnedCoursesThatHaveQuizzes';
import ManageOwnedCourses from '../../features/courses/ManageOwnedCourses/ManageOwnedCourses'
import QuizMain from '../../features/Quiz/Quiz';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import TakingQuiz from '../../features/Quiz/TakingQuiz';

import OwnedCoursesPage from 'features/courses/Courses page/OwnedCoursesPage';
import Header from 'components/header';
import CoursePage from 'features/courses/Courses page/components/CoursesPage';


import { getFreeCourses, getRecommendedCourses, getUpcommingCourses } from 'services/coursesService';
import AllCoursesPages from 'features/courses/Courses page/CoursesAllTypesPage';



import ListingDonationHistory from 'features/Transactions/ListingDonationsHistory';
import ListingIntructorEarnings from 'features/Transactions/ListingIntructorEarnings';
import PrivateRoute from 'instructor/InstructorProtectedRoute';
import ActiveUserDetails from 'features/Users/user details/UserDetails';
import IDcard from 'features/Users/IdCard/IdCard';
import AdminProfileInstructor from 'admin/AdminViewUserProfile/AdminProfileInstructor';
import Chat from 'member/Chat';
import Notification from 'features/Notifications/Notification';



export default function InstructorDashboard() {
  const path = '/instructors';
  const url = '/instructors';
  return (
    <div className='sharedDashboard'>
      

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


          <PrivateRoute exact path={`${path}`}>
            <DashboardInstructor url={url} />
          </PrivateRoute>
          <PrivateRoute exact path={`${path}/users/:userId`}>
            <AdminProfileInstructor url={url} role={'instructor'}/>
          </PrivateRoute> 
          <PrivateRoute exact path={`${path}/Chat`}>
            <Chat></Chat>
          </PrivateRoute>

        
          { /* Only for admin and instructor */ }

{ /* Courses managment */ }

     

        <PrivateRoute exact path={`${path}/courses/add`}>
          <AddEditCourse url={url} operation={'Add'} />
        </PrivateRoute>

        <PrivateRoute exact path={`${path}/courses/owned`}>
          <ManageOwnedCourses url={url} role={'instructor'} />
        </PrivateRoute>
      
        <PrivateRoute exact path={`${path}/courses/drafted`}>
          <ListDraftedCourses url={url} > </ListDraftedCourses>
        </PrivateRoute>

        <PrivateRoute path={`${path}/courses/drafted/:courseId`}>
          <AddEditCourse url={url} operation={'Edit'} nestedOperation={'Add'} role={'instructor'}  />
        </PrivateRoute>

        <PrivateRoute path={`${path}/courses/owned/:courseId/:originalCourseId`}>
          <AddEditCourse nestedOperation={'Edit'} url={url} role={'instructor'} operation={'Edit'}  />
        </PrivateRoute>

        <PrivateRoute path={`${path}/courses/owned/:courseId`}>
          <AddEditCourse url={url} role={'instructor'} operation={'Edit'}  />
        </PrivateRoute>

        <PrivateRoute exact path={`${path}/ID-CARD`}>
            <IDcard></IDcard>
          </PrivateRoute>

        { /* Quizzes managment */ }
        <PrivateRoute exact path ={`${path}/quizzes/owned`}>
          <ListCoursesThatHaveQuizzes url={url} ></ListCoursesThatHaveQuizzes>
        </PrivateRoute>

        <PrivateRoute exact path ={`${path}/quizzes/add`}  >
                <QuizMain operation={'Add'} url={url}> </QuizMain>
        </PrivateRoute>

        <PrivateRoute exact path ={`${path}/quizzes/owned/:quizId`}>
          <QuizMain operation={'Edit'} url={url}> </QuizMain>
        </PrivateRoute>

        <PrivateRoute exact path={`${path}/transactions/earnings`}>
          <ListingIntructorEarnings url={url}> </ListingIntructorEarnings>
        </PrivateRoute>


        <PrivateRoute exact path={`${path}/courses/take/free`} > 
            <CoursePage url={url}  coursesType={'Free'} handlerFunction={getFreeCourses}> </CoursePage>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/take/upcomming`} > 
            <CoursePage url={url} coursesType={'Upcomming'} handlerFunction={getUpcommingCourses}> </CoursePage>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/take/recommended`} > 
            <CoursePage url={url} coursesType={'Recommended'} handlerFunction={getRecommendedCourses}> </CoursePage>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/take/owned`} > 
            <OwnedCoursesPage url={url} ></OwnedCoursesPage>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/all`} > 
            <AllCoursesPages url={path}></AllCoursesPages>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/:courseId`}>
            <CourseViewForMember url={url} operation={'consume'} ></CourseViewForMember>
          </PrivateRoute>
          
          <PrivateRoute exact path={`${path}/courses/:courseId/quizzes/:quizId`}>
            <TakingQuiz></TakingQuiz>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/accoumplishments/:courseId`}>
            <Accomplishments url={url} operation={'View'}> </Accomplishments>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/transactions/history`}>
            <ListingDonationHistory url={url}> </ListingDonationHistory>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/transactions/send`} >
            <DonationPage></DonationPage>
          </PrivateRoute>
          
          <PrivateRoute exact path={`${path}/profile`}>
            <ActiveUserDetails url={url} />
          </PrivateRoute>    

          <PrivateRoute exact path={`${path}/profile`}>
            <ActiveUserDetails url={url} />
          </PrivateRoute>
      
          <PrivateRoute exact path={`${path}/notifications`}>
            <Notification url={url} />
          </PrivateRoute>
      
          
          <PrivateRoute exact path={`${path}/Chat`}>
            <Chat url={url} />
          </PrivateRoute>
          
      </Switch>
      </div>
        </div>
        </div>
        </div>
        </div>
        </div>

  )
}

