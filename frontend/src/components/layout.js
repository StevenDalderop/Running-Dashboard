import React from 'react'
import Navbar from '../components/navbar'
import styled from 'styled-components';

export default function Layout({children}) {
	return (
		<Wrapper>
			<Navbar />
			<div id="content">
				{ children }
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	#content {
		margin-top: 75px;
	}
`
