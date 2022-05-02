import React from 'react';
import { getFormattedSpeed, reverseDate } from '../util';

const TableRowWedstrijd = (props) => {
	return (
		<tr> 
			<td> {reverseDate(props.date)} </td>
			<td> {Math.round(props.distance * 100) / 100} <span className="unit">km</span> </td>
			<td> {props.time} </td>
			<td> {getFormattedSpeed(props.distance, props.time)} <span className="unit">min/km</span> </td>
			<td> {props.name} </td>
		</tr>
	)
}

export default TableRowWedstrijd;