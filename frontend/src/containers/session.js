import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Table from '../components/table'
import SessionData from '../components/session_data'
import LapTableRow from '../components/table_row_lap'
import LinePlot from '../components/lineplot'
import Map from '../components/map'
import Layout from '../components/layout'
import useDataApi from '../hooks/use_data_api'
import styled from 'styled-components';

const baseUrl = window.location.protocol + "//" +window.location.host

export default function Session(props) {
	var sessionId = props.match.params.session_id
	
	const [dataSession, setDataSession, isLoadingDataSession] = useDataApi(`${baseUrl}/api/sessions/${sessionId}/`, true)
	const [dataLaps, setDataLaps, isLoadingDataLaps] = useDataApi(`${baseUrl}/api/sessions/${sessionId}/laps`, true)
	const [dataRecords, setDataRecords, isLoadingDataRecords] = useDataApi(`${baseUrl}/api/sessions/${sessionId}/records`, true)
		
	var lap_data = !isLoadingDataLaps ? dataLaps.map((data, index) => LapTableRow(index, data)) : null	
	
	return (
		<Wrapper>
			<div className="grid-container">
				<div className="map">
					{ !isLoadingDataRecords ? 
						<Map dataRecords={dataRecords} /> : 
						<div className="loader"> </div>}	
				</div>
				<div className="sessions"> 
					{ !isLoadingDataSession ? SessionData(dataSession) : null }
				</div>
				<div className="speed"> 
					<LinePlot data={dataRecords} isLoading={isLoadingDataRecords} column="speed" id="svg_speed"  
						width={400} height={300}/> 
				</div>
				<div className="laps">
					< Table colnames={["#", "Time", "Distance", "Average speed"]} rows={lap_data} height="300px" />
				</div>
				<div className="heart_rate"> 
					<LinePlot data={dataRecords} isLoading={isLoadingDataRecords} column="heart_rate" id="svg_heart_rate" 
						width={400} height={300}/> 
				</div>
			</div>
		</Wrapper>
	)    
}

const Wrapper = styled.div`
	.grid-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto auto;
		grid-column-gap: 15px;
		grid-row-gap: 15px;
		padding: 15px;
		padding-top: 0px;
		width: 100%;
		grid-template-areas: 
			"map session"
			"speed lap"
			"heart_rate ...";
	}
	
	@media (max-width: 800px) {
		.grid-container {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(5, auto);
			grid-template-areas: "map" "session" "lap" "speed" "heart_rate";
		}
	}
	
	@media (min-width: 1200px) {
		.grid-container {
			grid-template-columns: 1fr 1fr 1fr ;
			grid-template-rows: repeat(2, auto);
			grid-template-areas: "map session lap" "speed heart_rate ...";
		}
	}
	
	.laps {
		grid-area: lap;
	}

	.map {		
		grid-area: map;
	}
	
	#mapid {
		height: 300px;
		width: 100%;
	}
	

	.sessions {
		grid-area: session;
	}

	.speed {
		grid-area: speed;
	}
	
	#svg_speed {
		max-height: 400px;
	}

	.heart_rate {
		grid-area: heart_rate;
	}
	
	#svg_heart_rate {
		max-height: 400px;
	}
	
	.loader {
		height: 100%;
		width: 100%;
		height: 300px;
		max-height: 100%;
		margin: auto;
		margin-bottom: 15px;
	}
`