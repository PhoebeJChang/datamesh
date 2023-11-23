import { toast } from 'react-toastify';
import { BasicInfosContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get('/basicInfo');
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


const AllBasicInfos = () => {
  return (
    <h1>AllBasicInfos Page</h1>
  )
}

export default AllBasicInfos