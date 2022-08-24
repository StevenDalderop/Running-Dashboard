import React from 'react';
import { BarPlotMonthlyRunningDistance, BarPlotYearlyRunningDistance } from '../components/barPlots';

const baseUrl = window.location.origin;

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"trainingSessions": null,
		}
	}

	componentDidMount() {
		fetch(`${baseUrl}/api/sessions/?get_all=true`)
			.then(res => res.json())
			.then(trainingSessions => {
				trainingSessions.forEach(trainingSession => trainingSession.start_time = new Date(Date.parse(trainingSession.start_time)))
				this.setState({ "trainingSessions": trainingSessions });
			})
	}

	render() {
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-4 col-md-6 col-sm-10 col-xs-12">
						<BarPlotYearlyRunningDistance trainingSessions={this.state.trainingSessions} />
					</div>
					<div className="col-lg-4 col-md-6 col-sm-10 col-xs-12">
						<BarPlotMonthlyRunningDistance trainingSessions={this.state.trainingSessions} />
					</div>
				</div>
			</div>
		)
	}
}
