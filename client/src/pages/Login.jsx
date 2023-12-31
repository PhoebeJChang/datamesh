// import React from 'react'
import { Link, Form, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post('/auth/login', data);
		toast.success('登入成功');
		return redirect('/dashboard');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};


export const Login = () => {
	return (
		<Wrapper>
			<Form method='post' className="form">
				<Logo />
				<h4>login</h4>
				<FormRow type="number" name="id" labelText="醫師編號" />
				<FormRow type="password" name="password" />
				<SubmitBtn formBtn/>
				{/* <button type='button' className='btn btn-block'>Explore the app</button> */}

				<p>
					Don&apos;t have an account?
					<Link to='/register' className="member-btn">
						Register Now
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};

export default Login
