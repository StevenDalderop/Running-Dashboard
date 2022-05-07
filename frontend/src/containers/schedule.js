import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/navbar';
import Training from '../components/training';
import SelectionMenu from '../components/selection_menu';
import useDataApi from '../hooks/use_data_api'
import Layout from '../components/layout'

const baseUrl = window.location.protocol + "//" +window.location.host

const SelectionMenuItems = [
{"value": "2021 Q1", "name": "2021 Kwartaal 1"}, 
{"value": "2021 Q2", "name": "2021 Kwartaal 2"}]

function sortByKey(array, key) {
return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
});
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
	
	function renderTraining(t, training_nr) {
		return(
			< Training key={t.index} week={t.week} training_nr={training_nr} completed={t.completed} index={t.index}
			description={t.description} handleChangeTraining={() => handleChangeTraining(t.index)} />
		)
	}
	
	function renderWeekTraining(week, trainings_week) {
		var trainings = sortByKey(trainings_week, "training_nr").map((t, training_nr) => renderTraining(t, training_nr + 1))	
		return (
			<div className="container" key={week}>
				<h3> Week {week} </h3>
				<div style={{padding: "10px"}}className="row justify-content-center">
					{ trainings }
				</div>
			</div>
		)
	}		
	
	function renderTrainings(trainings_data) {
		var result = []
		var week_nr_max = 10
		for (var week_nr=1; week_nr<=week_nr_max; week_nr += 1) {
			var week_data = trainings_data.filter(x => x.week === week_nr)
			result.push(renderWeekTraining(week_nr, week_data))
		}
		return result 
	}
	
	if (!isLoading) {
		var trainings_this_period = trainings.filter((x) => x.quarter.toString() === selector.substring(6))
		var bar_width = trainings_this_period.filter((x) => x.completed).length / trainings_this_period.length * 100
		var renderedTrainings = renderTrainings(trainings_this_period)
	} else {
		var bar_width = 0
		var renderedTrainings = null
	}
		
	return (
		<div>
			<div className="container d-flex flex-wrap"> 
				<div style={{"width": "250px"}}>
					<SelectionMenu name="schedule-period" value={selector} handleChange={(e) => handleChange(e)} 
						items={SelectionMenuItems} className="selection_menu" />
				</div>
				<div style={{"width": "100%"}} className="progress mt-3">
					<div className="progress-bar" style={{width: bar_width + "%"}} 
					role="progressbar" aria-valuenow={bar_width} aria-valuemin="0" 
					aria-valuemax="100">{Math.round(bar_width) + "%"}</div>
				</div>
			</div>
			<div className="mt-3">
				{ renderedTrainings } 
			</div>
		</div>
	)
}
