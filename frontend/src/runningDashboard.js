import React from "react";
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import Competitions from "./pages/competitions";
import Training from "./pages/training";
import Navbar from './components/navbar'
import styled from 'styled-components';


function RunningDashboard() {
	return (
		<Router>
			<Wrapper>
				<Navbar />
				<div id="content">
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/trainings">
							<Training />
						</Route>
						<Route path="/competitions">
							<Competitions />
						</Route>
					</Switch>
				</div>
			</Wrapper>
		</Router>
	)
}

const Wrapper = styled.div`
	#content {
		margin-top: 75px;
	}
`

const appDiv = document.getElementById("react_container");
ReactDOM.render(<RunningDashboard />, appDiv);


