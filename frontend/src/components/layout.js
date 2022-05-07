import React from 'react'
import Navbar from '../components/navbar'

export default function Layout({children}) {
	return (
		<div>
			<Navbar />
			<div id="content">
				{ children }
			</div>
		</div>
	)
}
