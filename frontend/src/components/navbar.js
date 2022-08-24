import React from 'react';
import TrainingList from './training/trainingList';
import styled from 'styled-components';
import { Link } from 'react-router-dom'


const Navbar = (props) => {
	return (
		<Wrapper>
			<nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light mb-3">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">Running</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<Link className="nav-link" to="/"> Home </Link>
							<Link className="nav-link" to="/trainings"> Trainings </Link>
							<div className="d-md-none">
								<TrainingList isInNavbar={true} />
							</div>
							<Link className="nav-link" to="/competitions">Competitions</Link>
							<li className="nav-item" >
								<a className="nav-link" href="/logout">Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</Wrapper>
	)
}
export default Navbar;

const Wrapper = styled.div`
	#navbar {
		position: fixed;
		width: 100%;
		top: 0px;
		z-index: 10000;
	}
`
