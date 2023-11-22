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
						112 學年度畢業專題 A01組 -- DATAMESH 技術
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