import React, { useState, useEffect } from 'react';
import { getFormattedDate } from '../util';
import useDataApi from '../hooks/use_data_api'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const baseUrl = window.location.protocol + "//" + window.location.host

function DropDownItem(props) {
	return (
		<li>
			<Link className="nav-link" to={props.href}> { props.name } </Link>
		</li>
	)
}

function DropDownMenu(props) {
	return (
		<li className="nav-item dropdown">
			<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				{props.title}
			</a>
			<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
				{props.links}
			</ul>
		</li> 
	)
}

const Navbar = (props) => {
	const [sessionData, setSessionData, isLoading] = useDataApi(`${baseUrl}/api/sessions/`, false)	
 
	var dropdown_items = isLoading ? 
		<DropDownItem href="/trainingen" name="Alle trainingen" /> : 
		<>
			<DropDownItem href="/trainingen" name="Alle trainingen" />
			<DropDownItem href={"/session/" + sessionData[0].index} name={getFormattedDate(sessionData[0].start_time)} />
			<DropDownItem href={"/session/" + sessionData[1].index} name={getFormattedDate(sessionData[1].start_time)} />
			<DropDownItem href={"/session/" + sessionData[2].index} name={getFormattedDate(sessionData[2].start_time)} />	
		</>

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
						<DropDownMenu title="Trainingen" links={dropdown_items} />
						<Link className="nav-link" to="/wedstrijden">Wedstrijden</Link> 
						<Link className="nav-link" to="/blog">Blog</Link> 
						<Link className="nav-link" to="/schema">Schema</Link>
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
