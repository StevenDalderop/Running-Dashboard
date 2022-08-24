import React from 'react';
import { useParams } from 'react-router-dom';

import TrainingSessionMap from './trainingMap'
import TrainingSessionStats from './trainingSessionStats'
import TrainingLapTable from '../table/trainingLapTable';
import { LinePlotTrainingHeartRate, LinePlotTrainingSpeed } from '../linePlot';

import useDataApi from '../../hooks/useDataApi'
import styled from 'styled-components';

const baseUrl = window.location.origin;

export default function TrainingDetail(props) {
	const { trainingId } = useParams();

	const [trainingSessions, setTrainingSessions, isLoadingTrainingSessions] = useDataApi(`${baseUrl}/api/sessions/${trainingId}/`, true)
	const [trainingLaps, setTrainingLaps, isLoadingTrainingLaps] = useDataApi(`${baseUrl}/api/sessions/${trainingId}/laps`, true)
	const [trainingRecords, setTrainingRecords, isLoadingTrainingRecords] = useDataApi(`${baseUrl}/api/sessions/${trainingId}/records`, true)

	return (
		<Wrapper>
			<div className="row">
				<div className="col-lg-12">
					{!isLoadingTrainingRecords ?
						<TrainingSessionMap dataRecords={trainingRecords} /> :
						null}
				</div>
				<div className="col-lg-6">
					{!isLoadingTrainingSessions ? <TrainingSessionStats {...trainingSessions} /> : null}
				</div>
				<div className="col-lg-6">
					{isLoadingTrainingLaps ? null : <TrainingLapTable trainingLaps={trainingLaps} />}
				</div>
				<div className="col-lg-6">
					<LinePlotTrainingSpeed trainingRecords={trainingRecords} isLoadingTrainingRecords={isLoadingTrainingRecords} />
				</div>
				<div className="col-lg-6">
					<LinePlotTrainingHeartRate trainingRecords={trainingRecords} isLoadingTrainingRecords={isLoadingTrainingRecords} />
				</div>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`	
	#mapid {
		height: 400px;
		width: 100%;
	}
	
	#svg_speed {
		max-height: 300px;
	}
	
	#svg_heart_rate {
		max-height: 300px;
	}
`
