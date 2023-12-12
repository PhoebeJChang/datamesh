import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { BASICINFO_SORT_BY } from '../../../utils/constance';
import { useAllBasicInfosContext } from '../pages/AllBasicInfos'

const SearchContainer = () => {
  const { searchValues } = useAllBasicInfosContext();
  const{ search, sort} = searchValues
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1500);
    };
  };

  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow type='search' labelText='搜尋身份證字號' name='search' defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name='sort'
            labelText='依照病例號碼排序/依照身分證字號排列'
            defaultValue={sort}
            list={[...Object.values(BASICINFO_SORT_BY)]}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <Link to='/dashboard/all-basicinfos' className='btn form-btn delete-btn'>
            重整搜尋項目
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer