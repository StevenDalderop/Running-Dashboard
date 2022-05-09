import React from 'react'
import styled from 'styled-components'

export default function Loader(props) {
	return (
		<LoaderDiv height={props.height}> </LoaderDiv>
	)
}

const LoaderDiv = styled.div`
	background-color: "#f8f9fa";
	height: ${props => props.height};
	width: 100%;
`
