import React from 'react';
import { roundDecimals, getWeekday, getFormattedTime, getMinutePerKm, getFormattedDateTime} from '../../utils/util'

function SessionStatsRow(props) {
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
	
export default function TrainingSessionStats(props) {
	return (
		<div>
			<SessionStatsRow title="Date" content={getWeekday(props.start_time) + " " + getFormattedDateTime(props.start_time)} />
			<SessionStatsRow title="Time" content={getFormattedTime(props.total_elapsed_time)} />
			<SessionStatsRow title="Distance" content={roundDecimals(props.total_distance, 2)} unit="km" />
			<SessionStatsRow title="Speed" content={getMinutePerKm(props.avg_speed)} unit="min/km" />
			<SessionStatsRow title="Max heart rate" content={props.max_heart_rate} unit="bpm" />
			<SessionStatsRow title="Avg cadence" content={props.avg_running_cadence} />
		</div>
	)
}
