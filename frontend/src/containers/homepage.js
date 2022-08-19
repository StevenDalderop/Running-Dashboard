import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Index from "./index";
import Competitions from "./competitions";
import Session from "./session";
import Trainingen from "./trainingen"
import Layout from '../components/layout'

export default function Homepage() {
	return (     
		<Router>
			<Layout>  
				<Switch>
					<Route exact path="/">
						< Index />
					</Route>
					<Route path="/trainingen">
						<Trainingen />
					</Route>
					<Route path="/wedstrijden">
						< Competitions />
					</Route>
					< Route path="/session/:session_id" component={Session} />
				</Switch>
			</Layout>
		</Router>
	)
}

			