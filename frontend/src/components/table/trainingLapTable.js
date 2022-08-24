import React from 'react'
import { roundDecimals, getFormattedTime, getMinutePerKm } from '../../utils/util'
import Table from './table'

const LapTableRow = function LapTableRow(index, data) {
	return (
		<tr key={index}>
			<td scope="row">{index + 1}</td>
			<td>{getFormattedTime(data.total_elapsed_time)} </td>
			<td>{roundDecimals(data.total_distance, 2)} <span className="unit">km</span> </td>
			<td>{getMinutePerKm(data.avg_speed)} <span className="unit">min/km</span> </td>
		</tr>            
	)
}

export default function TrainingLapTable(props) {
	let trainingLapRows = props.trainingLaps.map((data, index) => LapTableRow(index, data))

	return (
		<Table colnames={["#", "Time", "Distance", "Average speed"]} rows={trainingLapRows} height="300px" />
	)
}