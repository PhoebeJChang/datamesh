// import React from 'react'
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
// import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  console.log("params", params)
  try {
    const { data } = await customFetch.get(`/basicinfo/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-basicinfos');
  }
};
export const action = async () => {
  return null;
};

const EditBasic = () => {
  const { basicInfo } = useLoaderData();
  console.log(basicInfo);
  return <div>EditJob</div>;
};

export default EditBasic