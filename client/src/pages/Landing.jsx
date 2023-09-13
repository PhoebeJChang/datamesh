// import React from 'react'
// import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components'
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
// import main from '../assets/images/main.svg';


const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo/>
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						Distributed <span>Data</span> Streaming
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Sapiente veritatis incidunt recusandae obcaecati similique voluptatum
						labore nostrum quaerat deserunt ad, excepturi velit qui nisi eius soluta.
						Rem pariatur cumque libero.
					</p>
					<Link to="/register" className='btn register-link'>
						Register
					</Link>
					<Link to="/login" className='btn'>
						Login / Demo User
					</Link>
				</div>
				<img src={main} alt='ppl' className='img main-img' />
			</div>
		</Wrapper>
		
	);
};

//something like CSS, see more in assets wrapper
// const Wrapper = styled.div`
// 	background: red;
// 	h1{
// 		color: white;
// 	}

// 	.content{
// 		background: blue;
// 		color: yellow;
// 	}
// `

export default Landing