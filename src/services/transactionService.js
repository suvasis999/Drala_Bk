import axios from "../config/axios";

export const getCoursesTransactionForAdmin = async ( query ) => {
    
    const url = `/transactions/admin/courses?${query}`;

    try {
      const response = await axios.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      return response;
      }catch(error){
        throw error
      }
  
  
  }

  export const getDonationsTransactionForAdmin = async ( query ) => {
    
    const url = `/transactions/admin/donations?${query}`;

    try {
      const response = await axios.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      return response;
      }catch(error){
        throw error
      }
  
  
  }


  export const getEarningsForInstructor = async ( query ) => {
    
    const url = `/transactions/earnings?${query}`;

    try {
      const response = await axios.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      return response;
      }catch(error){
        throw error
      }
  
  
  }


  export const getDonationsHistoryForUser = async ( query ) => {
    
    const url = `/transactions/donations?${query}`;

    try {
      const response = await axios.get(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      return response;
      }catch(error){
        throw error
      }


  }

  export const updateTransaction = async ( transactionId, data ) => {

    const url = `/transactions/${transactionId}`;

    try {
      const response = await axios.put(
        url,data,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      return response;
      }catch(error){
        throw error
      }
  
  }

  
  export const getPerchauseCourses = async (userId,query) => {
    const url = `/transactions/admin/users/${userId}?${query}`;


    let config = {
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
    }
      try{
        const resposne = await axios.get(
          url,
          config,
        );
  
      return resposne;
      }catch(error){
        debugger
        throw error;
      }

      
  } 