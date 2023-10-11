
import Box from '@mui/material/Box';

import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from '@mui/utils';

import { useEffect, useState } from 'react'

function EnhancedTableHead({ headCells, orderBy, order, onRequestSort, actions }) {

  

 
  const createSortHandler = property => event => {
    debugger;
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
      <TableCell className={'p-0 m-0 w-0 '}></TableCell>

        {headCells.map( ( headCell, index ) => {

          return(
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            
            >
            <div className={`w-full flex justify-${headCell.align} text-white`}>
            { headCell.dontUseForOrder ? 
                headCell.label :
                <>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              align={headCell.align}
              onClick={ createSortHandler(headCell.id)}>
              
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null }
              
            </TableSortLabel>
            </>
            }
            </div>
          </TableCell>
          )
        })}

          { !actions || <TableCell>
            <div className={`w-full flex justify-center `}>
            <TableSortLabel>
            
              Actions
         
            
             
            </TableSortLabel> 
            </div>
            </TableCell> }
    
      </TableRow>
    </TableHead>
  );
}




export function EnhancedTable( { url, actionsAdditionalFields = [], headers, tableName, rows, defaultOrder, setOrderOnParent, actions } ) {

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(defaultOrder || 'createdAt');


  useEffect(()=> {

    setOrderOnParent({'order':order === 'asc' ? 1 : -1 , 'orderBy': orderBy })
  },[order,orderBy])


  const [dense, setDense] = useState(false);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

   return(       
    <>
              { !tableName || <div className='userListBtn_parent'>
                <button id='user_list_btn'>{tableName}</button>
              </div>
                }
              <hr className='mt-0' />

              {/* table start */}
              <Box sx={{ width: '100%' }} className='px-4 pb-3'>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                  <TableContainer >
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby='tableTitle'
                      size={dense ? 'small' : 'medium'}>

                      <EnhancedTableHead
                        actionsAdditionalFields={actionsAdditionalFields}
                        order={order}
                        orderBy={orderBy}
                        headCells={headers}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        actions={actions}
                      />

                      <TableBody>
                          {
                          
                          rows.map((row) => {
                            
                            return (
                              <TableRow
                                hover
                                role='checkbox'
                                tabIndex={-1}
                                >
 
                                 <TableCell className={'p-0 m-0 w-0 '}></TableCell>  


                                
                                {headers.map( (header) => {
                                  debugger;
                                  if(header.formattingCallback){
                                    const formattingCallBack = header.formattingCallback;
                                    return (<TableCell align='left'>{row[header.id] ? formattingCallBack(row[header.id]) : formattingCallBack(header.defaultValue) } { (header.additional_text && row[header.id]) ? header.additional_text: ''} </TableCell>)
                                  }

                                  if(header.formattingCallbackV2){
                                    const formattingCallBack = header.formattingCallbackV2;
                                    return (<TableCell align='left'>{ formattingCallBack(header.id, row) } </TableCell>)
                                  }

                                  return (<TableCell align='left'>{row[header.id] ? row[header.id] : header.defaultValue } { (header.additional_text && row[header.id]) ? header.additional_text: ''} </TableCell>)
                                  
                                } )}
                                
                                { !actions || <TableCell className={'flex items-center justify-center'} align='center'>{actions( {url, 'id':row._id, ...Object.assign({}, ...actionsAdditionalFields.map(( field ) => {const object = {}; object[field]= row[field]; return object }))})}</TableCell>}
                              </TableRow>
                            );
                          })}


                 
                      </TableBody> 

                   
                    </Table>
                  </TableContainer>
                </Paper>

        

              </Box>

          </>
  );
}