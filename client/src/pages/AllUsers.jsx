import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { UserMongosContainer, SearchContainerUserMongo } from '../components';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';


export const loader = async ({ request }) => {

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params)
  try {
    const { data } = await customFetch.get('/showUser', {
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

const AllUsersMongoContext = createContext();

const AllUsers = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <AllUsersMongoContext.Provider value={{ data, searchValues }}>
      <SearchContainerUserMongo />
      <UserMongosContainer />
    </AllUsersMongoContext.Provider>
  );
};

export const useAllUsersMongoContext = () => useContext(AllUsersMongoContext)
export default AllUsers