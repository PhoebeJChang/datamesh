import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { UserAzuresContainer } from '../components';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';


export const loader = async ({ request }) => {

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params)
  try {
    const { data } = await customFetch.get('/showUserAzure', {
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

const AllUsersAzureContext = createContext();

const AllUsersAzure = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <AllUsersAzureContext.Provider value={{ data, searchValues }}>
      {/* <SearchContainerUserMongo /> */}
      <UserAzuresContainer />
    </AllUsersAzureContext.Provider>
  )
}

export const useAllUsersAzureContext = () => useContext(AllUsersAzureContext)
export default AllUsersAzure