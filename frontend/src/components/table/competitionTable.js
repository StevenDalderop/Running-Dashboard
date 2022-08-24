import React from 'react';
import { getFormattedSpeed, formatDate } from '../../utils/util';
import Table from './table';

const CompetitionTableRow = (props) => {
	return (
		<tr> 
			<td> {formatDate(props.date)} </td>
			<td> {Math.round(props.distance * 100) / 100} <span className="unit">km</span> </td>
			<td> {props.time} </td>
			<td> {getFormattedSpeed(props.distance, props.time)} <span className="unit">min/km</span> </td>
			<td> {props.name} </td>
		</tr>
	)
}

function CompetitionTable(props) {
	let competionTableRows = props.competitions.map((competition, index) => 
		<CompetitionTableRow date={competition.date} name={competition.name} distance={competition.distance} time={competition.time} key={index} />);

	return (
		<Table colnames={["Date", "Distance", "Time", "Speed", "Name"]} rows={competionTableRows} height="800px" />
	)
}

export default CompetitionTable;

