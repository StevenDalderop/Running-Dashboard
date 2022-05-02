import React from 'react';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function handleTrainingSubmitted(e, props) {
	e.preventDefault()
	var csrftoken = getCookie('csrftoken')
    const requestOptions = {
      method: "PUT",
      headers: { 
		"Content-Type": "application/json",
		'X-CSRFToken': csrftoken	  
	  },
      body: JSON.stringify({
        index: props.index,
		description: props.description,
		week: props.week,
		training_nr: props.training_nr,
		completed: props.completed
      }),
	  credentials: 'same-origin',
    };
	fetch(`/api/training/${props.index}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
}
  
  
const Training = (props) => {
	var className = props.completed ? "training_div col-md bg-primary" : "training_div col-md bg-secondary"
	var btnClassName = props.theme === "dark" ? "btn btn-dark" : "btn btn-light"

	return (
		<div className={className}>
			<div className="training-title"> 
				<h5> Training { props.training_nr }</h5>
				<div>
					<form onSubmit={(e) => handleTrainingSubmitted(e, props)}> 
						<button onClick={() => props.handleChangeTraining(props.index)} 
						className={btnClassName}> { props.completed ? "Remove" : "Add"}</button>
					</form>
				</div>
			</div>
			<p> {props.description} </p>
		</div>
	)
}
export default Training;


