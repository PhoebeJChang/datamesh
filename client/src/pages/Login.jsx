// import React from 'react'
import { Link } from "react-router-dom";
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';

export const Login = () => {
  return (
		<Wrapper>
			<form className="form">
				<Logo />
				<h4>login</h4>
				<FormRow type="email" name="email" defaultValue="phoebe@gmail.com"/>
				<FormRow type="password" name="password" defaultValue="secret123"/>
				<button type='submit' className='btn btn-block'>Login now</button>
				<button type='button' className='btn btn-block'>Explore the app</button>

				<p>
					Don&apos;t have an account? 
					<Link to='/register' className="member-btn">
						Register Now
					</Link>
				</p>
			</form>
		</Wrapper>
	);
};

export default Login
