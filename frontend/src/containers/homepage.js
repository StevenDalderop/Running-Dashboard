import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Index from "./index";
import Schedule from "./schedule";
import Competitions from "./competitions";
import Session from "./session";
import Trainingen from "./trainingen"
import Blog from "./blog"
import useDarkMode from '../hooks/use_dark_mode';
import Layout from '../components/layout'

export default function Homepage() {
	const [theme, toggleTheme] = useDarkMode()

	return (     
		<Router>
			<Layout theme={theme} toggleTheme={toggleTheme}>  
				<Switch>
					<Route exact path="/">
						< Index />
					</Route>
					<Route path="/schema">
						< Schedule />
					</Route>
					<Route path="/trainingen">
						<Trainingen />
					</Route>
					<Route path="/wedstrijden">
						< Competitions />
					</Route>
					<Route path="/blog">
						<Blog />
					</Route>
					< Route path="/session/:session_id" component={Session} />
				</Switch>
			</Layout>
		</Router>
	)
}

			