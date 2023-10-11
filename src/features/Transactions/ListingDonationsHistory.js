import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import '../common/styles/ListingStyles.css';
import { toast } from 'react-toastify';
import { UseSearchQuery } from 'hooks/useSearchQuery';
import { EnhancedTable } from 'components/SmartTable/SmartTable';
import { dayMonthYear } from 'helpers/Date';
import { getDonationsHistoryForUser } from 'services/transactionService';
import { PaginationComponent } from 'features/courses/components/Paginitation';


const ProductTable = ({url}) => {

  const { search, bindFormValue, setOrderByField, sortingOrder, setCount, setPage } = UseSearchQuery();
  const [ orderObject, setOrderObject ] = useState( {'order': null, 'orderBy': null })
  const [ isLoading, setIsLoading ] = useState(true);

  const [ rows, setRows ] = useState([]);
  
  

  const [ totalEntries, setTotalEntries ] = useState(0);
  

  useEffect( () => {
    if(search){
      initData();
    }
   
  },[search])


  const initData = async () => {
    const response = await getDonationsHistoryForUser( search );
    debugger;
    setRows(response.data.data);
    setTotalEntries(response.data.totalCount);
    setIsLoading(false);
  } 

  const renderDate = (field, row) =>{
    return dayMonthYear(row[field]);
  }

  const renderAmount = (field,row) => {
    return row[field] ? row[field] : '0';
  }


  const headers = [
    { 'label': 'Transaction id', 'id': '_id', 'align': 'start'},
    { 'label': 'Creation Date', 'id':'createdAt','formattingCallbackV2':renderDate, 'align':'start'},
    { 'label': 'Amount', 'id':'amount', 'formattingCallbackV2':renderAmount, 'additional_text':'$', 'align':'start', 'dontUseForOrder': true },
    { 'label': 'Perchaused item', 'id':'perchaused_item', 'align':'start' },

  ]




  if(!isLoading) {
  return (
    <>
    <div className='container-fluid'>
    <div className='AdminDashboardContentPanel'>
      <EnhancedTable actionsAdditionalFields={['quiz']} url={url} tableName={'Donations history'} headers={headers}  rows={rows} setOrderOnParent={ (state) => { sortingOrder(state.order); setOrderByField(state.orderBy) } } />

      <PaginationComponent  initTotalEntries={totalEntries} initItemsPerPageCount={5} initPageNumber={1} setParamsOnParent={({page,itemsPerPageCount}) =>{setPage(page); setCount(itemsPerPageCount)} } ></PaginationComponent>
    </div>
  </div>
  </>
  );
  }
};


export default function AdminSitePages({ url }) {

  return (
    <div className='App w-100'>
      <ProductTable
        url={url}
      />
    </div>
  );
}

