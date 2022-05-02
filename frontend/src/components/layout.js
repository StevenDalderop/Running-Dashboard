import React from 'react'
import Navbar from '../components/navbar'
import styled from 'styled-components';

export default function Layout({children, theme, toggleTheme, active}) {
	return (
		<div className={theme} >
			<Navbar theme={theme} onChange={toggleTheme} active={active} />
			<div id="content">
				{ children }
			</div>
		</div>
	)
}

const Wrapper = styled.div`
	#content {
		padding-top: 75px;
		min-height: 100vh;
	}
`