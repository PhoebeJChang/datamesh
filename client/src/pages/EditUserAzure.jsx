// import React from 'react'
import { FormRow, FormRowSelect, SubmitBtn } from '../components/index.js';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { useLoaderData, useParams } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch.js';
import { BASICINFO_GENDER, DEPARTMENT } from '../../../utils/constance.js';

export const loader = async ({ params }) => {
  console.log("params", params)
  try {
    const { data } = await customFetch.get(`/showUser/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect('/dashboard/all-users-mongo');
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/showUserAzure/${params.id}`, data);
    toast.success('User更新成功');
    return redirect('/dashboard/all-users-mongo');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditUserAzure = () => {
  const { singleUser } = useLoaderData();
  console.log(useLoaderData())
  return <Wrapper>
    <Form method='post' className='form'>
      <h4 className='form-title'>edit user from azure</h4>
      <div className="form-center">
        <FormRow type='text' labelText='姓名' name='name' id='name' defaultValue={singleUser.name} />
        <FormRow type='date' labelText='出生年月日' name='birthday' id='birthday' defaultValue={singleUser.birthday} />
        <FormRowSelect
          name='gender'
          labelText='性別'
          id='gender'
          defaultValue={singleUser.gender}
          list={Object.values(BASICINFO_GENDER)}
        />
        <FormRowSelect
          type="string"
          name='department'
          labelText='科別'
          id='department'
          defaultValue={singleUser.department}
          list={Object.values(DEPARTMENT)}
        />
        <SubmitBtn formBtn />
      </div>
    </Form>
  </Wrapper>;
};

export default EditUserAzure