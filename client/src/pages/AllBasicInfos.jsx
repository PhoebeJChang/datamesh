import { toast } from 'react-toastify';
import { BasicInfosContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async ({ request }) => {

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params)
  try {
    const { data } = await customFetch.get('/basicInfo', {
      params,
    });
    return {
      data,
      searchValues: { ...params }
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllBasicInfosContext = createContext();

const AllBasicInfos = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <AllBasicInfosContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <BasicInfosContainer />
    </AllBasicInfosContext.Provider>
  );
};

export const useAllBasicInfosContext = () => useContext(AllBasicInfosContext)


export default AllBasicInfos