// import React from 'react'
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/basicInfo/${params.id}`);
    toast.success('基本資料刪除成功');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/all-basicinfos');
};
