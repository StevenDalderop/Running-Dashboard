import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/navbar';
import Bar_plot from '../components/barplot';

const baseUrl = window.location.protocol + "//" + window.location.host

export default class Index extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			"data_sessions": null,
        }
    }

    componentDidMount() {					
 		fetch(`${baseUrl}/api/sessions/?get_all=true`)
            .then(res=> res.json())
            .then(data => {       
				data.forEach(x => x.start_time = new Date(Date.parse(x.start_time))) 
                this.setState({"data_sessions": data});
            }) 
	}
	
	render() {			
        return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-4 col-md-6 col-sm-10 col-xs-12">
						{ this.state.data_sessions ? 
						< Bar_plot data_input={this.state.data_sessions} id_name="svg_year" timeframe="year" width={400} height={400} /> : 
						<div className="loader"> </div>}	
					</div>
					<div className="col-lg-4 col-md-6 col-sm-10 col-xs-12">
						{ this.state.data_sessions ? 
						< Bar_plot data_input={this.state.data_sessions} id_name="svg_month" timeframe="month" width={400} height={400} /> : 
						<div className="loader"> </div>}
					</div>
				</div>
			</div>
        )
    }
}
