import { Lock, Warning } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink, useHistory, useParams,  } from 'react-router-dom';
import { getCourseDetails, getContent, deleteCourse, approveCourse } from './../../../services/coursesService';
import YouTube from '../components/YoutubeVideoPlayer';
import FadeInOut from '../components/FadeIn';
import TakingQuiz from '../../Quiz/TakingQuiz';
import { virtualProgressCreator } from '../View course/virtaulProgressCreator';
import { UPLOADS_PATH } from 'config/magic_constants';
import { Card, Col, Form, NavDropdown, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';


export default function Course({ url, operation, role }) {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentContent, setCurrentContent ] = useState( null );
  const [ isContentDone, setIsContentDone ] = useState(false);
  const [ progress, setProgress ] = useState(null);
  const [ progressCalculator, setProgressCalculator ] = useState('');
  const [ image, setImage ] = useState(null);
  const [ height, setHeight] = useState(0)
  const [ itHaveCertificate, setItHaveCertificate ] = useState(false);

  useEffect(() => {
      setHeight('100vh');
  })

  const history = useHistory();
  const { courseId } = useParams();

  useEffect( () => {

            initDataForConsuming(courseId);

  }
  ,[]);

  useEffect( () => {
    if( progress ) {
    const calculatedProgress = calculateProgress();
    debugger
    setProgressCalculator(calculatedProgress);
    }
  },[progress]);

  
  //refresh progress data.
  useEffect(() => {
    console.log('current content', currentContent);
  },[isContentDone])
  

  const calculateProgress = () => {
    let sectionsTotalCount = progress[ 'content_progress_track' ].length;
    let doneSectionsCount = 0;

    for(let section of progress[ 'content_progress_track' ]){
      let isSectionDone = false;
      debugger
      for(let content of section.contents ) {
        debugger;
        if(content.isDone == false ) {
          break;
        }
        
        isSectionDone = true;
      }

      if(isSectionDone){
        doneSectionsCount += 1;
      }

      }

      return {doneSectionsCount ,sectionsTotalCount}
  }
  const handleApproveCourse = async () => {
    try{
      const response = await approveCourse( courseId );
      toast.success('Course have been approved');
      history.push(`${url}/courses/pending`);
    }catch(error){
      console.log(error);
      debugger;
      if(error.response.status == 409){
        toast.error(error.response.data.message)
     
      error.response.data.errors.forEach(errorMessage => {
        toast.error(errorMessage);
      });
      }
    }
  }

  const handleDeleteButton = async () => {
    try{

      const response = await deleteCourse(courseId);
      toast.success('course have been successfully deleted');
      history.push(`${url}/courses/pending`);

    }catch(error){
      toast.error(error);
    }
  }


  const initDataForConsuming = async () => {
      try{
        const response = await getCourseDetails(courseId);
        const progress = virtualProgressCreator(response.data.data);
        setItHaveCertificate(response.data.data.accoumplishments ? true : false );
        setImage(`${UPLOADS_PATH}/${response.data.data.pictures[0].filename}`);
        setProgress(progress);
        await setContent(response.data.data._id,response.data.data.sections[0]._id,response.data.data.sections[0].contents[0]._id);
        setIsLoading( false );
      }catch( error ){
          toast.warning('This request is already treated');
          history.push(`${url}/notifications`);
      }

  }

  const setContent = async (courseId, sectionId, contentId) => {
    try{
    
    const response = await getContent(courseId, sectionId,contentId);
    debugger;
    setCurrentContent( {...response.data.data,...{'sectionId':sectionId }});
    setIsContentDone(false);
    }catch(error){
      throw (error)
    }
  }
  

  const handleContentClick = async (courseId,sectionId,contentId) => {
    try{
      debugger;
      await setContent(courseId,sectionId,contentId);

    }catch(error){
      console.log(error)
    }
  }


  const handleContentDone = async ( courseId, sectionId, contentId ) => {
    console.log(courseId, sectionId, contentId);
  }

  
  if(!isLoading && progress['content_progress_track']){
    return (

      <div className='container-fluid'>
      <div className='dashboardContentPanel h-auto relative'>
        <div className='courseContent c_bg_all row relative'>
          
          <div className='col-lg-9' >
            <div className='content relative min-h-[560px]'>
              
              <h5 class={' lg:!text-start ' }>{currentContent.title}</h5>


              { !(currentContent.type == 'video') ||
              <div id='player' className='courseVideo'>

                {isContentDone || <YouTube YTid={currentContent.content.split('/')[ 4 ]} height='480' width='100%' onStateChange={ () => handleContentDone( courseId, currentContent.sectionId, currentContent._id)}></YouTube>}
                <FadeInOut show={isContentDone} duration={250}>
                  <img height='480px' width='100%' style={{width:'100%',height:'480px','object-fit':'scale-down'}} src={require('./../../../assets/welldone.png')} alt="well done">

                  </img>
                </FadeInOut>

              </div>
              }

              { !(currentContent.type == 'content') ||
              <>
              <div dangerouslySetInnerHTML={ {__html: currentContent.content } } className='pArea'>
               
              </div>
              <div className='flex flex-col w-full absolute bottom-0 mb-8'>
              <Button type="button" class={'justify-self-center align-self-center btn btn-primary w-[90px]'} disabled={isContentDone} onClick={ () => handleContentDone(courseId, currentContent.sectionId, currentContent._id) }> { isContentDone ? 'finished' : 'finish' } </Button>
              </div>
              </>
              }

              { !( currentContent.type == 'quiz' ) ||

             <TakingQuiz quizId={ progress.quiz } courseId={progress.course} setAccomplishmentsAccessibleOnParent={ setProgress } > </TakingQuiz>

              }
              
              
            </div>
            <Row className='g-0 pb-2 min-h-[340px]'>
                                      <Col className='col-lg-4 col-sm-12 h-full'>
                                        <Card className='progress_all_card h-full'>
                                          <Card.Img className={'h-[320px] w-[520px]'} variant='top' src={image} />
                                          <Card.Body className='p-4'>
                                            <Card.Title className='card_title'>
                                              {progress['name']}
                                            </Card.Title>
                                          </Card.Body>
                                        </Card>
                                      </Col>
                                      <Col className='col-lg-8 col-sm-12 min-h-[340px]'>
                                        <Card className='h-full' >
                                          <Card.Body style={{'height':'100% !important'}} className='relative' >
                                            <Card.Title className=' hcard_title inOption_title'>
                                            Description
                                            </Card.Title>
                                            <Card.Text className="h-f">
                                            {progress['description']}

                                            </Card.Text>
                                            <div className='absolute bottom-0 right-6 flex-row items-center justify-center my-4'>
                                           <Button className="!mr-2" onClick={handleApproveCourse} variant="contained" color="info">
                                            Approve
                                          </Button>
                                          <Button onClick={handleDeleteButton} variant="contained" color="warning">
                                            Disapprove
                                          </Button>
                                            </div>
                                          </Card.Body>
                                          
                                        </Card>
                             
                                      </Col>
                   </Row>
            <div className='content w-full '>
              <h3 class='pt-0 mt-0 !text-left '>  Course Progress</h3>
              <div className=' flex flex-col md:flex-row justify-evenly'>
              
   

                <div className='w-full md:w-1/3 mt-4'>
                  <div className='cdFlex1 ler_dbtn mb-24'>
                    <h3 className='m-0 p-0'>{ ` ${progressCalculator.doneSectionsCount} of ${progressCalculator.sectionsTotalCount} are done` }</h3>

                    <Card className={`certificateCard lerner_w377 w377 !ml-8`} variant='outlined'>
                  


                  <p>
                    Watch all videos, read all educational materials, and finish the quiz to complete the course.
                  </p>
                    </Card>
                    </div>
                </div>
                <div className='w-full md:w-1/3 '>
                <div className={' ml-200 hidden md:flex '}>
                <CircularProgressbar
                  className='cir_progress_lerner_w_200 '
                  value={ (progressCalculator.doneSectionsCount / progressCalculator.sectionsTotalCount ) * 100 }
                  text={ ` ${progressCalculator.doneSectionsCount} of ${progressCalculator.sectionsTotalCount} are done` }
                />
                </div>
                </div>
 
              { !(role == 'admin') ||
              <div className='w-full md:w-1/3 mt-4'>
               
                <div className='cdFlex1 ler_dbtn mb-24'>
                <h3 className='m-0 p-0'>Certificate & Letter</h3>
                {itHaveCertificate ?
                <>
                  <Card className={`certificateCard lerner_w377 w377 !ml-8`} variant='outlined'>
                  { progress[ 'is_eligible_for_certificate' ] ? 'Congrats you finished the course, Download your accomplishments' : 'Continue the course to receive your accomplishments.' }

                  </Card>
                  <NavLink to={`${url}/accoumplishments/edit/${progress['course']}`}>

                  <Button style={{ fontSize: '9px' }}>
                    Modify Accoumplishments
                  </Button> 
                  </NavLink>
               
                </>
                : 
                <>
                
                <Card className='certificateCard' variant='outlined'>
                <text class='text-danger' >Course does not have accoumplishments</text>
                </Card>
                { role === 'admin' ?
                       <NavLink to={`${url}/courses/accoumplishments/${progress['course']}/add`}>
                       <Button style={{ fontSize: '9px' }}>
                       Add Accoumplishments
                       </Button> 
                   </NavLink> :
                   <NavLink to={`${url}/courses/accoumplishments/${progress['course']}/add`}>
                   <Button style={{ fontSize: '9px' }}>
                    Add Accoumplishments
                   </Button> 
               </NavLink>

                 }
         
                
                </>
                }
              </div>
              </div>
              }

              </div>
              </div>

                
 
            
          </div>

          <div className='col-lg-3 mt-2 '>
          <div className='courseContent lg:sticky top-0 w-full p-0 m-0' style={{'min-height': height  }}>
          <div className='sidebar w-full p-0 m-0' >
            <div className='sidebarBox' style={{'width':'100% !important'}}>
              <h3>Course Content</h3>
              <h5 > {progress.name}</h5>

              <ul className={ ' p-0 ' } stlye={{'padding': '0px !important'}}>
                {progress['content_progress_track'].map( (section) => { return(
                    <li >● {section.title}

                    { section.contents.map(content => {
                        return(
                        <>
                        <br></br>
                        <button className={' ml-8'} disabled={!section.isAvailable} onClick={() => handleContentClick(progress.course,section.section_id,content.content_id,content.isDone)}>
                          <input disabled={!section.isAvailable} type='checkbox' checked={content.isDone }></input>
                          <span disabled={!section.isAvailable} > { content.title } </span>
                          <br></br>
                        </button>
                        </>
                        )
                    }
                    
                    )
                        
                    }
     
                  </li>
                ) 
              })}
       
              </ul>
              
              
              
            </div>
                <div className='quizBox mt-auto mb-4 ml-2'>
                    {/* Quiz */ }
                    <div className='quizBox'>
                    { progress['quiz'] ?
                    <>
                    <Button className={'cursor-none'} disabled={ true } >
                      { progress.is_eligible_for_quiz || <Lock></Lock> } Quiz
                    </Button>

                    <NavLink to={`${url}/quizzes/view/${progress['quiz']}`}>
                    <button className='!bg-active-button !text-white cursor-pointer'>
                      <label className='!bg-active-button text-white cursor-pointer' disabled={progress.is_eligible_for_quiz}>
                        View quiz
                      </label>
                    </button>
                    </NavLink>
                    </>
                    :
                    <>
                    <text class='text-danger' >Quiz is not added yet</text>

                    <NavLink to={`${url}/quizzes/add/`}>
                    <button className='!bg-active-button !text-white cursor-pointer'>
                      <label className='!bg-active-button text-white cursor-pointer' disabled={progress.is_eligible_for_quiz}>
                        Add Quiz
                      </label>
                    </button>
                    </NavLink>
                    </>
                    }
                  </div>
            </div>
          </div>
          </div>
          </div>


        </div>
    
  
      </div>
      </div>
        
    );
  }
}



