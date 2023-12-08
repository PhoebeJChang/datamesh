/* eslint-disable react-hooks/rules-of-hooks */
import { toast } from 'react-toastify';
import { BasicInfosContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext, useEffect, useState} from 'react';


//const [basicInfos, setBasicInfos] = useState([]);
//const [page, setPage] = useState(1);
var page = 1;
const limit = 4;

//get server data
export const loader = async () => {
  //get data   
  try {
    var data = await customFetch.get(`/basicInfo?page=${page}&limit=${limit}`); //get data with page and limit
    if(page > 1){
      const newData = await customFetch.get(`/basicInfo?page=${page}&limit=${limit}`);
      data = data.push(newData) //merge data
    }
    return data
    //const newData = response.data; //store new data
    //setBasicInfos((prevData) => [...prevData, ...newData]); //merge latest data
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

//pending windows scroll
// const handleScroll = () => {
//   if (
//     window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 //window's height
//   ) {
//     setPage((prevPage) => prevPage + 1); //add page(change page status: pevPage
//     loader(); //call loader to load data
//   }
// };


//problem here
//  useEffect(() => { //callback function
//   console.log('it is doing useEffect()')
//  }, [page]); //if page change, then do the callback function





const AllBasicInfosContext = createContext();

//UI
const AllBasicInfos = () => {
  const { data } = useLoaderData(); //get data info
  return ( //use data
    <AllBasicInfosContext.Provider value={{ data }}>
      <SearchContainer />
      <BasicInfosContainer />
    </AllBasicInfosContext.Provider>
  );
};

export const useAllBasicInfosContext = () => useContext(AllBasicInfosContext)


export default AllBasicInfos