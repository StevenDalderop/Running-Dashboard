import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/navbar';
import Training from '../components/training';
import SelectionMenu from '../components/selection_menu';
import useDataApi from '../hooks/use_data_api'
import { sortByKey } from '../util'

const baseUrl = window.location.protocol + "//" + window.location.host

const SelectionMenuItems = [
	{"value": "2021 Q1", "name": "2021 Kwartaal 1"}, 
	{"value": "2021 Q2", "name": "2021 Kwartaal 2"}
]

function ProgressBar(props) {
	return (
		<div style={{"width": "100%"}} className="progress mt-3">
			<div className="progress-bar" style={{width: props.percentage + "%"}} 
				role="progressbar" aria-valuenow={props.percentage} aria-valuemin="0" 
				aria-valuemax="100">
				{Math.round(props.percentage) + "%"}
			</div>
		</div>
	)
}

function TrainingWeek(props) {
	var trainings_this_week = props.trainings.filter(x => x.week === props.week)
	var sorted_trainings_this_week = sortByKey(trainings_this_week, "training_nr")

	return (
		<div key={props.week}>
			<h3> Week {props.week} </h3>
			<div className="row justify-content-center">
				{ 
					sorted_trainings_this_week.map(t => 
						<Training key={t.index} week={t.week} training_nr={t.training_nr} completed={t.completed} index={t.index}
							description={t.description} handleChangeTraining={() => props.handleChangeTraining(t.index)} />) 
				}
			</div>
		</div>
	)
}

export default function Schedule() {
	const [trainings, setTrainings, isLoading] = useDataApi(`${baseUrl}/api/training`, true)
	const [selector, setSelector] = useState("2021 Q2")

	function handleChange(e) {
		setSelector(e.target.value)		
	}
	
	function handleChangeTraining(index) {
		setTrainings(prevState => {
			var newState = [...prevState]
			var item = newState.find(x => x.index === index)
			if (item) {
				if (item.completed) {
					item.completed = false 
				} else {
					item.completed = true
				}
			}
			return ( newState )
		})
	}	
	
	if (!isLoading) {
		var filtered_trainings = trainings.filter((x) => x.quarter.toString() === selector.substring(6))
		var weeks = Array.from({length: 10}, (_, i) => i + 1)
		training_schedule = weeks.map(week => <TrainingWeek trainings={filtered_trainings} week={week} handleChangeTraining={(index) => handleChangeTraining(index)} />)
		var bar_width = filtered_trainings.filter((x) => x.completed).length / filtered_trainings.length * 100
	} else {
		var training_schedule = null
		var bar_width = 0
	}

	return (
		<div className="container" >
			<div className="d-flex flex-wrap"> 
				<SelectionMenu name="schedule-period" value={selector} handleChange={(e) => handleChange(e)} 
					items={SelectionMenuItems} className="selection_menu" />
				<ProgressBar percentage={bar_width} />
			</div>
			<div className="mt-3">
				{ training_schedule } 
			</div>
		</div>
	)
}
