import React from 'react';
import CSRFToken from '../components/csrftoken';

const LoginForm = (props) => {
  return (
	<div className="container">
		<div className="d-flex justify-content-center mt-5">
			<form style={{"maxWidth": "100%"}} action="/login" method="post">
				< CSRFToken />
				<h1 className="mb-3" style={{color: "white"}}> Welcome </h1>
				<div className="input-group mb-3">
					<input style={{width: "350px", "maxWidth": "100%"}} placeholder="Username" name="username" type="text"/>
				</div>
				<div className="input-group mb-3">
					<input style={{width: "350px", "maxWidth": "100%"}} placeholder="Password" name="password" type="password"/>
				</div>		
				<button style={{width: "350px", "maxWidth": "100%"}} className="btn btn-primary mb-3" type="submit" value="Login"> Login </button>
			</form>
		</div>
	</div>
  )
}
export default LoginForm;