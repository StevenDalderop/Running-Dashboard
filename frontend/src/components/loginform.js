import React from 'react';
import CSRFToken from '../components/csrftoken';

const LoginForm = (props) => {
  return (
	<div id="login">
		<h1 className="text-center" style={{color: "white"}}> Welcome </h1>

		<form id="login_form" action="/login" method="post">
			< CSRFToken />
			<input placeholder="Username" name="username" type="text"/>
			<input className="mt-3" placeholder="Password" name="password" type="password"/>
			<button className="btn btn-primary mt-3" type="submit" value="Login"> Login </button>
		</form>
	</div>
  )
}
export default LoginForm;