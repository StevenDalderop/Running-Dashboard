import React from 'react';
import styled from 'styled-components';

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
	var className = props.completed ? "training_div bg-primary" : "training_div bg-secondary"

	return (
		<Wrapper className="col-md">
			<div className={className}>
				<div className="training-title"> 
					<h5> Training { props.training_nr }</h5>
					<div>
						<form onSubmit={(e) => handleTrainingSubmitted(e, props)}> 
							<button onClick={() => props.handleChangeTraining(props.index)} 
							className="btn btn-light"> { props.completed ? "Remove" : "Add"}</button>
						</form>
					</div>
				</div>
				<p> {props.description} </p>
			</div>
		</Wrapper>
	)
}
export default Training;

const Wrapper = styled.div`
	.training_div {
		border-radius: 10px;
		padding-left: 10px;
		padding-right: 10px;
	}
`
