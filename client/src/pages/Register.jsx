// import React from 'react'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, Link } from 'react-router-dom';
import { BASICINFO_GENDER, DEPARTMENT } from '../../../utils/constance.js';
import { FormRow, Logo, FormRowSelect, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	// JS api (FormData)
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	// make request back to server
	try {
		await customFetch.post('/auth/register', data);
		toast.success('註冊成功');
		return redirect('/login');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const Register = () => {
	return (
		<Wrapper>
			<Form method="post" className='form'>
				<Logo />
				<h4>Register</h4>
				{/* labelText is sth we gonna sent to server */}
				<FormRow
					type="number"
					name='id'
					labelText='醫師編號'
				/>
				<FormRow
					type="text"
					name='name'
				/>
				<FormRow
					type="number"
					name='phone'
					labelText='手機號碼'
				/>
				<FormRow
					type="date"
					name='birthday'
					labelText='生日'
				/>
				<FormRow
					type="email"
					name='email'
				/>
				<FormRowSelect
					name='gender'
					labelText='性別'
					id='gender'
					defaultValue={BASICINFO_GENDER.MALE}
					list={Object.values(BASICINFO_GENDER)}
				/>
				<FormRowSelect
					type="string"
					name='department'
					labelText='科別'
					list={Object.values(DEPARTMENT)}
				/>
				<FormRow
					labelText='密碼(須包含數字和大小寫，至少8碼)'
					type="password"
					name='password'
				/>
				<SubmitBtn formBtn/>
				<p>
					Already have an account?
					<Link to='/login' className="member-btn" labelText='生日'>
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};


export default Register;