// import React from 'react'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";
import { FormRow, Logo } from "../components";

const Register = () => {
	return (
		<Wrapper>
			<form className='form'>
				<Logo />
				<h4>Register</h4>
				{/* labelText is sth we gonna sent to server */}
				<FormRow type="text" name='name' defaultValue='who r u' />
				<FormRow
					type="text"
					name='lastName'
					labelText='last name'
				/>
				<FormRow
					type="email"
					name='email'
				/>
				<FormRow type="password" name='password' />
				<button type="submit" className="btn btn-block">
					submit
				</button>
				<p>
					Already have an account?
					<Link to='/login' className="member-btn">
						Login
					</Link>
				</p>
			</form>
		</Wrapper>
	);
};


export default Register;