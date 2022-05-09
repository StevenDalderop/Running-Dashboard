import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react'
import Table from '../components/table';
import SearchBar from '../components/search_bar'
import SelectionMenu from '../components/selection_menu'
import TableRowWedstrijd from '../components/table_row_wedstrijd'
import useDataApi from '../hooks/use_data_api'

const baseUrl = window.location.protocol + "//" + window.location.host

const SelectionMenuItems = [
	{"value": "all", "name": "All competitions"}, 
	{"value": "prs", "name": "Personal records"}, 
	{"value": "best", "name": "Current personal records"}, 
	{"value": "5 km", "name": "5 KM"}, 
	{"value": "10 km", "name": "10 KM"}, 
	{"value": "21.1 km", "name": "21.1 KM"}
]


export default function Competitions() {
	const [wedstrijden, setWedstrijden, isLoading] = useDataApi(`${baseUrl}/api/matches/`)
	const [inputs, setInputs] = useState({filter: "all", search: ""})

	const handleChange = e => {
		setInputs({...inputs, [e.target.name]: e.target.value})
	}
	
	var tableRowsWedstrijden = isLoading ? null : getTableRowsWedstrijden(wedstrijden, inputs.filter, inputs.search);
		
	return (
		<div className="container">
			<div className="row">
				<SelectionMenu items={SelectionMenuItems} handleChange={(e) => handleChange(e)} name="filter" value={inputs.filter} className="col-sm mb-3" />
				<SearchBar value={inputs.search} handleChange={(e) => handleChange(e)} className="col-sm mb-3" />
			</div>
			<div className="table_container">
				<Table colnames={["Date", "Distance", "Time", "Speed", "Name"]} rows={tableRowsWedstrijden} height="400px" />
			</div>
		</div>
	)
}


function getTableRowsWedstrijden(wedstrijden_, filter, search) {
	var wedstrijden = filterWedstrijden(wedstrijden_, filter)
	wedstrijden = searchWedstrijden(wedstrijden, search)
	wedstrijden = wedstrijden.map((data, index) => 
		<TableRowWedstrijd date={data.date} name={data.name} distance={data.distance} time={data.time} key={index} />)
	return wedstrijden
}	

function searchWedstrijden(wedstrijden, search) {
	var searchedWedstrijden = wedstrijden.filter((x) => {
		let regex = new RegExp(search, "i");
		return regex.test(x.date) || regex.test(x.distance) || regex.test(x.time) || regex.test(x.name);
	})
	return searchedWedstrijden
}

function filterWedstrijden(wedstrijden_, filter) {
	if (filter === "best") {
		var wedstrijden = getPrs(wedstrijden_, filter)
	}
	else {
		var wedstrijden = getFilteredWedstrijden(wedstrijden_, filter)
	}
	return wedstrijden;
}

function getFilteredWedstrijden(wedstrijden, filter) {
	var filteredWedstrijden = wedstrijden.filter((x) => {
		if (filter === "all") { return x; }
		else if (filter === "prs") { return x.isRecord; }
		else if (filter === "5 km" || filter === "10 km" || filter === "21.1 km") {
			return x.distance.toString() + " km" === filter;
		}
	});
	return filteredWedstrijden
}

function getPrs(wedstrijden, filter) {
	let prs = [];
	for (let distance of [5, 10, 21.1, 42.2]) {
		let pr = wedstrijden.filter((x) => { return x.isRecord && x.distance === distance; })[0];
		prs.push(pr);
	}
	return prs
}
