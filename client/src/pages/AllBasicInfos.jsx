import { toast } from 'react-toastify';
import { BasicInfosContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext, useEffect, useState} from 'react';
import axios from 'axios';
//import { useInfiniteQuery } from '@tanstack/react-query';

const BasicInfoList = () => {
  const [basicInfos, setBasicInfos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/basicInfo?page=${page}&limit=${limit}`);
        const newData = response.data.data;

        setBasicInfos((prevData) => [...prevData, ...newData]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    // 檢查滾動到底部的邏輯
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="basicInfoList">
      {basicInfos.map((basicInfo) => (
        <BasicInfo key={basicInfo._id} {...basicInfo} />
      ))}
    </div>
  );
};



//mock the database fetch
/*const fetchData = async (page: number) =>{
  await new Promise((resolve) => setTimeout(resolve,1000))
  return basicdata //right here shoud limit the page to load
  //return data.slice((page -1)*2, page*2)
}

//infinite query
const Page = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery( //query is a unique identifier for hook
    ['query'] = asyn ({ pageParam = 1}) => {
      const response = await fetchData(pageParam)
      return response
    },
    {
      getNextPageParam : (_, pages) => {
        return pages.length + 1
      }
    },
    {
      initialDate: {
        pages: [data.slice(0,10)] //right here should dafault 10 data to view
        pagePrarms: [1] //set pageparams to first page 1
      }
    }
  )
}*/

export const loader = async () => {
  try {
    //await new Promise((resolve) => setTimeout(resolve,1000))
    const { data } = await customFetch.get('/basicInfo');
    return {
      data
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
/*
return (
  <div>
        posts:
          {basicdata?.page.map((page, i) => (
            <div key={i}>
              {page.map((basicdata) => (
                <div key={basicdata.medical_history_no}></div>
              ))}
              </div>
          ))}
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage? 'Loading more...': (basicdata?.page.length ?? 0) < 1000? 'Load More':'Noting more to load'}
          </button>
      </div>
)*/

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
