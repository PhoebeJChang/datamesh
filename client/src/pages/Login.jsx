// import React from 'react'
import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
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
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	return (
		<Wrapper>
			<Form method='post' className="form">
				<Logo />
				<h4>login</h4>
				<FormRow type="number" name="id" labelText="醫師編號" />
				<FormRow type="password" name="password" />
				<button
					type='submit'
					className='btn btn-block'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'submitting...' : 'login'}
				</button>
				<button type='button' className='btn btn-block'>Explore the app</button>

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
