import React from 'react';
import { useState } from 'react'
import CompetitionTable from '../components/table/competitionTable';
import CompetitionFilterForm from '../components/competitionFilterForm';
import useDataApi from '../hooks/useDataApi'

const baseUrl = window.location.origin;


export default function Competitions() {
	const [wedstrijden, setWedstrijden, isLoading] = useDataApi(`${baseUrl}/api/matches/`)
	const [filterCriteria, setFilterCriteria] = useState({ distance: "all", isOnlyRecords: false, searchString: "" })

	const handleChange = e => {
		if (e.target.name === "isOnlyRecords") {
			setFilterCriteria({...filterCriteria, isOnlyRecords: e.target.checked});
			return;
		}
		setFilterCriteria({ ...filterCriteria, [e.target.name]: e.target.value })
	}

	const filterDistance = (competition) => {
		if (filterCriteria.distance === "all") { return true }
		if (filterCriteria.distance === competition.distance.toString()) { return true }
		return false;
	};

	const filterSearchString = (competition) => {
		let regex = new RegExp(filterCriteria.searchString, "i");
		return regex.test(competition.date) || regex.test(competition.distance) || regex.test(competition.time) || regex.test(competition.name);
	}

	const filterFastestTime = (competition) => {
		if (filterCriteria.isOnlyRecords && !competition.isRecord) { return false }
		return true;
	}

	let filteredCompetitions;
	if (isLoading) {
		filteredCompetitions = null;
	} else {
		filteredCompetitions = wedstrijden.filter(filterDistance).filter(filterSearchString).filter(filterFastestTime);
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3 mb-3">
					<h4> Filters </h4>
					<CompetitionFilterForm 
						handleChange={handleChange} 
						distance={filterCriteria.distance} 
						searchString={filterCriteria.searchString}
						isOnlyRecords={filterCriteria.isOnlyRecords} />
				</div>
				<div className="col-md-9">
					{isLoading ? null : <CompetitionTable competitions={filteredCompetitions} />}
				</div>
			</div>
		</div>
	)
}
