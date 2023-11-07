import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { BASICINFO_GENDER } from '../../../utils/constance.js';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
// import customFetch from '../utils/customFetch'; //this is about user login

const AddBasicInfo = () => {
  const { user } = useOutletContext(); //get the user from outlet
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'

  return <Wrapper>
    <Form method='post' className='form'>
      <h4 className='form-title'>新增基本資料</h4> 
      {/* add basic information */}
      <div className='form-center'>
        <FormRow type='number' name='病歷號碼' />
        <FormRow type='text' name='身分證字號' />
        <FormRow type='text' name='性別' />
        <FormRow type='date' name='出生年月日' />
        <FormRow type='number' name='身高' />
        <FormRow type='number' name='體重' />
        <FormRow type='text' name='現居地址' />
        <FormRow type='phone' name='手機號碼' />
        <FormRow type='email' name='電子郵件' />
        <FormRow readOnly={true} defaultValue={user.name} name='資料新增者' />
        <div className="form-row">
          <label htmlFor=""></label>
        </div>
        <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
          {isSubmitting ? 'submitting' : 'submit'}
        </button>
      </div>
    </Form>
  </Wrapper>
}

export default AddBasicInfo