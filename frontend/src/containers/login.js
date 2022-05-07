import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NavbarSmall from '../components/navbar_small';
import LoginForm from '../components/loginform';

function App() {
    useEffect(() => {
	    document.body.style.backgroundColor = "rgb(50,50,50)";
	}, [])

  if (context.message) {
    var message = <div className="alert alert-dismissible fade show alert-dark" role="alert">
    {context.message}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  } else {
    var message = null
  }
	
  return (
    <div>
      <NavbarSmall />
      { message }	
      <LoginForm />  
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('react_container'));