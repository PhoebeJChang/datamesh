// import React from 'react'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";
import { BASICINFO_GENDER, DEPARTMENT } from '../../../utils/constance.js';
import { FormRow, Logo, FormRowSelect } from "../components";

const Register = () => {
	return (
		<Wrapper>
			<form className='form'>
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
					type="phone"
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
					type="password"
					name='password'
				/>
				<button type="submit" className="btn btn-block">
					submit
				</button>
				<p>
					Already have an account?
					<Link to='/login' className="member-btn" labelText='生日'>
						Login
					</Link>
				</p>
			</form>
		</Wrapper>
	);
};


export default Register;