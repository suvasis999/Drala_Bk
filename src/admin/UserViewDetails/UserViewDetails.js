

import './UserViewDetails.css';
import React,{useState, useEffect} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { UseSearchQuery } from 'hooks/useSearchQuery';
import { PaginationComponent } from 'features/courses/components/Paginitation';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { getUsersListForAdmin } from 'services/userService';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';



const actions = ( {url, id, status} ) => {
  if(status != 'finished'){
  return(
  <div className='lc_flex justify-center items-center'>
  <NavLink to={`${url}/users/${id}`}>
  <Button variant='contained' className='bt_info'>
    Details
  </Button>
  </NavLink>
</div>
  )
  }
}



const UserViewDetails = ({ url }) => {
  const [ values, setValues ] = useState();
  const { search, bindFormValue, setOrderByField, sortingOrder, setCount, setPage } = UseSearchQuery();
  const [ isLoading, setIsLoading ] = useState(true);

  const [ rows, setRows ] = useState([]);
  

  const [ totalEntries, setTotalEntries ] = useState(0);
  

  useEffect( () => {
    if(search){
      initData();
    }
   
  },[search])


  const initData = async () => {
    const response = await getUsersListForAdmin(search);
    debugger;
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 


  const headers = [
    {'label': 'User id', 'id':'_id', 'align':'start'},
    {'label': 'Name', 'id':'name', 'align':'start'},
    {'label': 'Email', 'id':'email', 'align':'start'},
    {'label': 'Donation', 'id':'total_amount_donated', 'align':'start'},
    {'label': 'Account status', 'id':'account_status', 'align':'start'},
    {'label': 'User Type', 'id':'role', 'align':'start'},


  ]





  const handleShow = event => {
    event.preventDefault();
    const keys = Object.keys(values );
    debugger;
    for( const key of keys ){
      bindFormValue( key, values[key] );
    }
  }

 

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    const name = prop;
    const value = event.target.value
    const newObject = {};
    newObject[name] = value;

    setValues(current => {

        return { ...current, ...newObject }
       }
       
       );

    }



 
  if( !isLoading )
  return (
    <div className='w-100'>
            {
            // form here 
            }
             <div className='container-fluid'>
            
            
            <div className='inner_AdminDashboard dashboardContentPanel h-auto'>
              {/* form start */}

              <Form onSubmit={handleShow}>
                <Row xs={1} md={6}>
                  <Form.Group as={Col} controlId='formGridName'>
                    <Form.Label className='adminDashboard_selectTitle'>
                      First Name
                    </Form.Label>
                    <Form.Control onChange={handleChange('name')} className='placeholder_resize' placeholder="First Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridName'>
                    <Form.Label className='adminDashboard_selectTitle'>
                      Last Name
                    </Form.Label>
                    <Form.Control onChange={handleChange('last_name')} className='placeholder_resize' placeholder="Last Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridSpiritual'>
                    <Form.Label className='adminDashboard_selectTitle'>
                      Spiritual Name
                    </Form.Label>
                    <Form.Control onChange={handleChange('spiritual_name')} className='placeholder_resize' placeholder="Spiritual Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridEmail'>
                    <Form.Label className='adminDashboard_selectTitle'>
                      Email
                    </Form.Label>
                    <Form.Control onChange={handleChange('email')} className='placeholder_resize' placeholder="Email" />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridNumber'>
                    <Form.Label className='adminDashboard_selectTitle'>
                      Telephone Number
                    </Form.Label>
                    <Form.Control  onChange={handleChange('phone_number')} className='placeholder_resize' placeholder="Telephone Number" />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridCity'>
                    <Form.Label className='adminDashboard_selectTitle'>
                      City
                    </Form.Label>
                    <Form.Control onChange={handleChange('city')} className='placeholder_resize' placeholder="City" />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridState' className="pt-2">
                    <Form.Label className='adminDashboard_selectTitle'>
                      State
                    </Form.Label>
                    <Form.Control onChange={handleChange('state')} className='placeholder_resize' placeholder="State" />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridState' className="pt-2">
                    <Form.Label className='adminDashboard_selectTitle'>
                      Country
                    </Form.Label>
                    <Form.Control onChange={handleChange('country')} className='placeholder_resize' placeholder="Country" />
                  </Form.Group>
                </Row>

                <button type={'submit'} id='adminFormBtn' >
                  SHOW
                </button>
              </Form>
              
              {/* form end */}
            </div>

          </div>

          
          
          
          <div className='container-fluid'>
            <div className='AdminDashboardContentPanel'>
              <EnhancedTable actions={actions} actionsAdditionalFields={['account_status']} url={url} tableName={'User list'} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

              <PaginationComponent  initTotalEntries={totalEntries} initItemsPerPageCount={5} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setCount(itemsPerPageCount)} } ></PaginationComponent>
            </div>
          </div>
          
    </div>
  );
};

export default UserViewDetails;
