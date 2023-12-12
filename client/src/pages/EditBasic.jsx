// import React from 'react'
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
// import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { BASICINFO_GENDER } from '../../../utils/constance.js';

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
export const action = async ({request, params}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/basicInfo/${params.id}`, data);
    toast.success('基本資料更新成功');
    return redirect('/dashboard/all-basicinfos');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditBasic = () => {
  const { basicInfo } = useLoaderData();

  return <Wrapper>
    <Form method='post' className='form'>
      <h4 className='form-title'>edit basic</h4>
      <div className="form-center">
        <FormRow type='text' labelText='姓名' name='name' id='name' defaultValue={basicInfo.name} />
        <FormRowSelect
          name='gender'
          labelText='性別'
          id='gender'
          defaultValue={basicInfo.gender}
          list={Object.values(BASICINFO_GENDER)}
        />
        <FormRow type='date' labelText='出生年月日' name='birth_date' id='birth_date' defaultValue={basicInfo.birth_date}/>
          <FormRow type='number' labelText='身高' name='height' id='height' defaultValue={basicInfo.height}/>
          <FormRow type='number' labelText='體重' name='weight' id='weight' defaultValue={basicInfo.weight}/>
          <FormRow type='text' labelText='現居地址' name='address' id='address' defaultValue={basicInfo.address}/>
          <FormRow type='number' labelText='手機號碼' name='phone' id='phone' defaultValue={basicInfo.phone}/>
          <FormRow type='email' labelText='電子郵件' name='email' id='email' defaultValue={basicInfo.email}/>
          <FormRow type='profession' labelText='職業' name='profession' id='profession' defaultValue={basicInfo.profession}/>
          <SubmitBtn formBtn/>
      </div>
    </Form>
  </Wrapper>;
};

export default EditBasic