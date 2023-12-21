import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { UserMySQLsContainer, SearchContainerUserMySQL } from '../components';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async ({ request }) => {

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params)
  try {
    const { data } = await customFetch.get('/showUserMySQL', {
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

const AllUsersMySQLContext = createContext();

const AllUsersMySQL = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <AllUsersMySQLContext.Provider value={{ data, searchValues }}>
      <SearchContainerUserMySQL />
      <UserMySQLsContainer />
    </AllUsersMySQLContext.Provider>
  )
}

export const useAllUsersMySQLContext = () => useContext(AllUsersMySQLContext)
export default AllUsersMySQL