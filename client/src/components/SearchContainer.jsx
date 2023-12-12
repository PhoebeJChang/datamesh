import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { BASICINFO_SORT_BY } from '../../../utils/constance';
import { useAllBasicInfosContext } from '../pages/AllBasicInfos'

const SearchContainer = () => {
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow type='search' name='search' defaultValue='請搜尋身分證字號' />
          <FormRowSelect
            name='sort'
            defaultValue='ascending'
            list={[...Object.values(BASICINFO_SORT_BY)]}
          />

          <Link to='/dashboard/all-basicinfos' className='btn form-btn delete-btn'>
            重整搜尋項目
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer