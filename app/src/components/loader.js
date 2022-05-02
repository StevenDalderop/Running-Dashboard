import React from 'react'
import styled from 'styled-components'

export default function Loader(props) {
	return (
		<LoaderDiv height={props.height} theme={props.theme}> </LoaderDiv>
	)
}

const LoaderDiv = styled.div`
	background-color: ${props => props.theme === "dark" ? "#212529" : "#f8f9fa"};
	height: ${props => props.height};
	width: 100%;
`