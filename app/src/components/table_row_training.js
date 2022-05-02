import React from 'react';
import { getFormattedDateTime, getFormattedTime, getFormattedDistance, getMinutePerKm } from '../util';

const TableRowTraining = (props) => {
	return (
		<tr>
			<td><a href={"session/" + props.data.index}>{getFormattedDateTime(props.data.start_time)}</a></td>
			<td>{getFormattedTime(props.data.total_elapsed_time)}</td>
			<td>{getFormattedDistance(props.data.total_distance)} <span className="unit">km</span></td>
			<td>{getMinutePerKm(props.data.avg_speed)} <span className="unit">min/km</span></td>
		</tr>            
	)  
}

export default TableRowTraining;

