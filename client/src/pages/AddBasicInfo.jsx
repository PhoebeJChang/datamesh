/* eslint-disable react-refresh/only-export-components */
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { BASICINFO_GENDER } from '../../../utils/constance.js';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log('HIII', data)
  try {
    await customFetch.post('/basicInfo', data);
    toast.success('基本資料新增成功');
    return redirect('all-patients');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddBasicInfo = () => {
  const { user } = useOutletContext(); //get the user from outlet
  const navigation = useNavigation();
  console.log("NAVI", navigation)
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>新增基本資料</h4>
        {/* add basic information */}
        <div className='form-center'>
          <FormRow type='number' labelText='病歷號碼' name='medical_history_no' id='medical_history_no' />
          <FormRow type='text' labelText='身分證字號' name='id_number' id='id_number' />
          <FormRow type='text' labelText='姓名' name='name' id='name' />
          <FormRowSelect
            name='gender'
            labelText='性別'
            id='gender'
            defaultValue={BASICINFO_GENDER.MALE}
            list={Object.values(BASICINFO_GENDER)}
          />
          <FormRow type='date' labelText='出生年月日' name='birth_date' id='birth_date' />
          <FormRow type='number' labelText='身高' name='height' id='height' />
          <FormRow type='number' labelText='體重' name='weight' id='weight' />
          <FormRow type='text' labelText='現居地址' name='address' id='address' />
          <FormRow type='number' labelText='手機號碼' name='phone' id='phone'/>
          <FormRow type='email' labelText='電子郵件' name='email' id='email'/>
          <FormRow type='profession' labelText='職業' name='profession' id='profession'/>
          {/* <FormRow readOnly={true} defaultValue={user.id} labelText='資料新增者ID' name='history_recorder' id='history_recorder'/> */}

          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}>
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddBasicInfo