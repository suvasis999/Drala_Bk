import './AdminDashboard.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Sidebar from '../components/AdminSidebar'
import DashboardAdmin from '../DashboardAdmin/DashboardAdmin';

import AdminUserListOne from '../AdminUsersList/AdminUsersList';

import AdminProfileInstructor from '../AdminViewUserProfile/AdminProfileInstructor.js';
import CourseViewForApproval from '../../features/courses/view courses for approval/ViewCourse';
import CourseViewForMember from '../../features/courses/View course/ViewCourseForMember';
import Accomplishments from '../../features/accoumplishments/Accoumplishments';
import CourseViewForRequestChange from '../../features/courses/View course/ViewCourseForRequestChange';
import AddEditCourse from '../../features/courses/AddEditCourseDetails/AddEditCourse';
import ListDraftedCourses from '../../features/courses/List courses/ListDraftedCourses';
import ListPendingCourses from '../../features/courses/List courses/ListPendingCourses';
import ListCoursesThatNeedAccomplishments from '../../features/courses/List courses/ListCoursesThatNeedAccomplishments';
import ListCoursesThatHaveAccomplishments from '../../features/courses/List courses/ListCoursesThatHaveAccomplishments';
import ListCoursesThatHaveQuizzes from '../../features/courses/List courses/ListOwnedCoursesThatHaveQuizzes';
import ListCoursesLiveCoursesQuizzes from '../../features/courses/List courses/ListCoursesLiveWithQuizes';
import ListLiveCourses from '../../features/courses/List courses/ListLiveCoursesAdmin';
import Accoumplishments from '../../features/accoumplishments/Accoumplishments';
import ManageOwnedCourses from '../../features/courses/ManageOwnedCourses/ManageOwnedCourses';
import QuizMain from '../../features/Quiz/Quiz';
import ListCoursesChangeRequest from '../../features/AdminChangesRequest/ListingCoursesChangesRequests/ListChangesRequest';
import ListingUsersChangeRequst from '../../features/AdminChangesRequest/ListingUsersChangesRequests/ListUsersChangesRequests'
import ManageCategories from '../../features/categories/ListingCategories';
import 'react-toastify/dist/ReactToastify.css';
import TakingQuiz from '../../features/Quiz/TakingQuiz';
import OwnedCoursesPage from 'features/courses/Courses page/OwnedCoursesPage';
import Header from 'components/header';
import CoursePage from 'features/courses/Courses page/components/CoursesPage';


import { getFreeCourses, getRecommendedCourses, getUpcommingCourses } from 'services/coursesService';
import AllCoursesPages from 'features/courses/Courses page/CoursesAllTypesPage';




import ListingDonationHistory from 'features/Transactions/ListingDonationsHistory';
import ListingIntructorEarnings from 'features/Transactions/ListingIntructorEarnings';
import UserDetailsForChangeViewRequest from 'features/Users/user details change requests view/UserDetailsViewForChangeRequest';
import PrivateRoute from 'admin/AdminProtectedRoutes';
import UserViewDetails from 'admin/UserViewDetails/UserViewDetails';
import DonationPage from 'donation/UserDonate/DonationPage';
import Transactions from 'features/Transactions/TransactionManage/Transactions';
import ActiveUserDetails from 'features/Users/user details/UserDetails';
import IDcard from 'features/Users/IdCard/IdCard';
import Chat from 'member/Chat';
import GroupChat from 'member/GroupChat';
import Notification from '../../features/Notifications/Notification';


{/* un-inemplmanted features*/}
//import SitePagesWelcomeSection from '../SitePagesWelcomeSection/SitePagesWelcomeSection';


export default function AdminDashboard() {

  const  url = '/admins';
  const  path  = '/admins';


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
                <Header title='Dashbord' sub='Home' role='Admin' url={url} />
              </div>
          <div className=' w-full'>

          <Switch>


          <PrivateRoute exact path={`${path}`}>
            <DashboardAdmin url={url} />
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/ID-CARD`}>
            <IDcard></IDcard>
          </PrivateRoute>


          { /* Only for admin */ }

          { /* user managment */ }
          <PrivateRoute exact path={`${path}/users/details`}> 
              <UserViewDetails url={url}></UserViewDetails>
          </PrivateRoute>
          <PrivateRoute exact path={`${path}/users/`}>
              <AdminUserListOne url={url} />
          </PrivateRoute>

          <PrivateRoute exact path ={`${path}/users/changes`} >
            <ListingUsersChangeRequst url={url}> </ListingUsersChangeRequst>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/users/changes/:changeRequestId`}>
            <UserDetailsForChangeViewRequest url={url}></UserDetailsForChangeViewRequest>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/users/:userId`}>
            <AdminProfileInstructor url={url} />
          </PrivateRoute>


          { /* Courses managment */ }
          <PrivateRoute exact path={`${path}/courses/pending`}> 
                <ListPendingCourses url={url} > </ListPendingCourses>     
          </PrivateRoute>

          <PrivateRoute exact path ={`${path}/courses/manage`}>
            <ListLiveCourses url={url} ></ListLiveCourses>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/changes/:changeRequestId`}>
            <CourseViewForRequestChange url={url} ></CourseViewForRequestChange>
          </PrivateRoute>

          <PrivateRoute exact path ={`${path}/courses/changes`} >
            <ListCoursesChangeRequest url={url}> </ListCoursesChangeRequest>
          </PrivateRoute>
  


          <PrivateRoute path ={`${path}/courses/manage/:courseId`}>
            <AddEditCourse url={url} operation={'Edit'} role={'admin'}  />
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/pending/:courseId`}>
            <CourseViewForApproval url={url} operation={'view'} role={'admin'} ></CourseViewForApproval>
          </PrivateRoute>
          
          { /* Accoumplishments managment */ }
          <PrivateRoute exact path={`${path}/courses/accoumplishments/add`}>
            <ListCoursesThatNeedAccomplishments url={url} operation={'Add'}> </ListCoursesThatNeedAccomplishments>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/accoumplishments/modify`}>
            <ListCoursesThatHaveAccomplishments url={url} operation={'Add'}> </ListCoursesThatHaveAccomplishments>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/accoumplishments/:courseId/add`}>
            <Accomplishments url={url} operation={'Add'}> </Accomplishments>
          </PrivateRoute>

          <PrivateRoute exact path={`${path}/courses/accoumplishments/:courseId/modify`}>
            <Accomplishments url={url} operation={'Modify'}> </Accomplishments>
          </PrivateRoute>

          <PrivateRoute exact path ={`${path}/accoumplishments/add`}  >
          <ListCoursesThatNeedAccomplishments url={url}> </ListCoursesThatNeedAccomplishments>
          </PrivateRoute>

          <PrivateRoute exact path ={`${path}/accoumplishments/edit`}  >
          <ListCoursesThatHaveAccomplishments url={url}> </ListCoursesThatHaveAccomplishments>
          </PrivateRoute>

          <PrivateRoute exact path ={`${path}/accoumplishments/add/:courseId`}  >
            <Accoumplishments operation={'Add'} url={url}> </Accoumplishments>
          </PrivateRoute>
          
          <PrivateRoute exact path ={`${path}/accoumplishments/edit/:courseId`}  >
            <Accoumplishments operation={'Edit'} url={url}> </Accoumplishments>
          </PrivateRoute>

          { /* Categories managment */}

          <PrivateRoute exact path={`${path}/categories/manage`}>
            <ManageCategories url={url} ></ManageCategories>
          </PrivateRoute>

          { /* quizzes managment */ }



          <PrivateRoute exact path ={`${path}/quizzes/manage`}>
            <ListCoursesLiveCoursesQuizzes url={url} ></ListCoursesLiveCoursesQuizzes>
          </PrivateRoute>

          <PrivateRoute exact path ={`${path}/quizzes/view/:quizId`}>
                <QuizMain operation={'View'} url={url}> </QuizMain>
            </PrivateRoute>

          <PrivateRoute exact path={`${path}/transactions/manage`}>
                <Transactions url={url}> </Transactions>
          </PrivateRoute>

          { /* Only for admin and instructor */ }

              { /* Courses managment */ }

              <PrivateRoute exact path={`${path}/courses/add`}>
                <AddEditCourse url={url} operation={'Add'} />
              </PrivateRoute>

              <PrivateRoute exact path={`${path}/courses/owned`}>
                <ManageOwnedCourses url={url} role={'admin'} />
              </PrivateRoute>

              <PrivateRoute path={`${path}/courses/drafted/:courseId`}>
                <AddEditCourse url={url} nestedOperation={'Add'} operation={'Edit'} role={'admin'}  />
              </PrivateRoute>
              
              <PrivateRoute exact path={`${path}/courses/drafted`}>
                <ListDraftedCourses url={url} > </ListDraftedCourses>
              </PrivateRoute>



              <PrivateRoute path={`${path}/courses/owned/:courseId`}>
                <AddEditCourse url={url} role={'admin'} operation={'Edit'}  />
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

              <PrivateRoute exact path ={`${path}/quizzes/manage/:quizId`}>
                <QuizMain operation={'Edit'} url={url}> </QuizMain>
              </PrivateRoute>


              <PrivateRoute exact path={`${path}/transactions/earnings`}>
                <ListingIntructorEarnings url={url}> </ListingIntructorEarnings>
              </PrivateRoute>

          { /* for admin/instructor/member */ }

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
      
          <PrivateRoute exact path={`${path}/notifications`}>
            <Notification url={url} />
          </PrivateRoute>
      
          
          <PrivateRoute exact path={`${path}/Chat`}>
            <Chat url={url} />
          </PrivateRoute>


          <PrivateRoute exact path={`${path}/GroupChat`}>
            <GroupChat url={url} />
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