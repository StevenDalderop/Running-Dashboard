import React from 'react';
import { roundDecimals, getWeekday, getFormattedTime, getMinutePerKm, getFormattedDateTime} from '../util'

function SessionDataRow(props) {
	var unit = props.unit ? <span className="unit">{props.unit}</span> : null
	return (
		<div className="row">
			<div className="col-lg-4 title">
				<b>{props.title}:</b>
			</div> 
			<div className="col-lg-8">
				{props.content} {unit}
			</div>
		</div>
	)
}
	
const SessionData = function SessionData(props) {
	return (
		<div className="container-fluid">
			<SessionDataRow title="Date" content={getWeekday(props.start_time) + " " + getFormattedDateTime(props.start_time)} />
			<SessionDataRow title="Time" content={getFormattedTime(props.total_elapsed_time)} />
			<SessionDataRow title="Distance" content={roundDecimals(props.total_distance, 2)} unit="km" />
			<SessionDataRow title="Speed" content={getMinutePerKm(props.avg_speed)} unit="min/km" />
			<SessionDataRow title="Max heart rate" content={props.max_heart_rate} unit="bpm" />
			<SessionDataRow title="Avg cadence" content={props.avg_running_cadence} />
		</div>
	)
}

export default SessionData