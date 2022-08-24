import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CSRFToken from '../components/csrfToken';
import styled from 'styled-components';

const LoginForm = (props) => {
  return (
	<form action="/login" method="post" className="form">
		< CSRFToken />
		<div className="input-group mb-3">
			<input style={{width: "100%"}} placeholder="Username" name="username" type="text"/>
		</div>
		<div className="input-group mb-3">
			<input style={{width: "100%"}} placeholder="Password" name="password" type="password"/>
		</div>		
		<button style={{width: "100%"}} className="btn btn-primary" type="submit" value="Login"> Login </button>
	</form>
  )
}

const AlertMessage = (props) => {
	return (
		<div className="alert alert-dismissible fade show alert-info alert-message" role="alert">
    		{props.message}
    		<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  		</div>
	)
}

const Wrapper = styled.div`
	.form {
		max-width: 100%;
		width: 400px;
		padding: 15px;
		background-color: rgb(40,40,40);
		border-radius: 15px;
	}

	.title-container {
		height: 100%;
		align-items: center;
		color: white;
		text-align: center;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	  }

	.alert-message {
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
	}
`

function LoginPage() {
    useEffect(() => {
	    document.body.style.backgroundColor = "rgb(50,50,50)";
	}, [])
	
  return (
		<Wrapper>
			<div className="container">
				{ context.message ? <AlertMessage message={context.message} /> : null }	
				<div className="row justify-content-center center">
					<div className="col-md-11">
						<div class="row">
							<div className="col-md-6 mb-3">
								<div className="row title-container">
									<h1> Running Dashboard </h1>
								</div>
							</div>
							<div className="col-md-6">
								<div class="row justify-content-center">
									<LoginForm />
								</div>
							</div>
						</div>
					</div>
				</div>	
			</div>
		</Wrapper>
  	)
}

ReactDOM.render(<LoginPage />, document.getElementById('react_container'));
