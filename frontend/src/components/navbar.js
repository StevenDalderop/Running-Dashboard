import React, { useState, useEffect } from 'react';
import { getFormattedDate } from '../util';
import useDataApi from '../hooks/use_data_api'
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'

const baseUrl = window.location.protocol + "//" + window.location.host


const Navbar = (props) => {
    const location = useLocation()
	const [sessionData, setSessionData, isLoading] = useDataApi(`${baseUrl}/api/sessions/`, false)
	var isDarkTheme = props.theme === "dark"	
	const pathname = location.pathname

	function DropDownItem(props) {
		return (
    		<li>
        		<a className="dropdown-item" href={props.href}> { props.name } </a>
        	</li>
        )
	}
	
	function NavLink(props) {
		var className = props.href === pathname ? "nav-link active" : "nav-link"
		return (
			<li className="nav-item" >
				<a className={className} href={props.href}>{props.name}</a>
			</li>
		)
	}

  return (
    <nav id="navbar" className={"navbar navbar-expand-lg navbar-" + props.theme + " bg-" + props.theme}>
	  <div className="container-fluid">
		<a className="navbar-brand" href="#">Running</a>
		<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
    			<NavLink name="Home" href="/" /> 
    			<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						Trainingen
					</a>
					<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    					{ isLoading ? <li> Loading.. </li> : 
        					<div>
            					<DropDownItem href="/trainingen" name="Alle trainingen" />
        						<DropDownItem href={"/session/" + sessionData[0].index} name={getFormattedDate(sessionData[0].start_time)} />
        						<DropDownItem href={"/session/" + sessionData[1].index} name={getFormattedDate(sessionData[1].start_time)} />
        						<DropDownItem href={"/session/" + sessionData[2].index} name={getFormattedDate(sessionData[2].start_time)} />
        					</div>
    					}
					</ul>
				</li> 
    			<NavLink name="Wedstrijden" href="/wedstrijden" /> 
    			<NavLink name="Schema" href="/schema" />
				<NavLink name="Logout" href="/logout" /> 
			</ul>
			<div className="ms-auto form-check form-switch">
				<input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => props.onChange(e)} checked={isDarkTheme}></input>
				<label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark mode</label>
			</div>
		</div>
		</div>
	</nav>
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