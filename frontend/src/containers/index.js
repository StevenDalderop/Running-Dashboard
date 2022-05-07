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
			"show_bar_plot": false,
			"theme": "light",
        }
    }
	
	handleChange(e) {
		if (e.target.checked) {
			this.setState({"theme": "dark"})
			localStorage.setItem('theme', "dark");
		} else {
			this.setState({"theme": "light"})
			localStorage.setItem('theme', "light");
		}
	}

    componentDidMount() {
		if (!localStorage.getItem('theme')) {
			localStorage.setItem('theme', "light");
		}
		
		let theme = localStorage.getItem('theme');
		this.setState({"theme": theme}) 
						
 		fetch(`${baseUrl}/api/sessions/?get_all=true`)
            .then(res=> res.json())
            .then(data => {       
				data.forEach(x => x.start_time = new Date(Date.parse(x.start_time))) 
                this.setState({"data_sessions": data, "show_bar_plot": true});
            }) 
	}
	
	render() {		
		var btn_year_className = "btn"
		var btn_month_className = "btn"
		if (this.state.show_graph === "year") btn_year_className += " active"
		else if (this.state.show_graph === "month") btn_month_className += " active"
		if (this.state.theme === "dark") {btn_year_className += " btn-dark"; btn_month_className += " btn-dark"}
		else {btn_year_className += " btn-primary"; btn_month_className += " btn-primary"}
		
		if (this.state.theme === "dark") { 
			document.body.style.backgroundColor = 'rgb(' + 50 + ',' + 50 + ','+ 50 + ')';
			document.body.style.color = 'white';
		} else {
			document.body.style.backgroundColor = 'white';
			document.body.style.color = 'black';
		}
				
        return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-4 col-md-6 col-sm-10 col-xs-12">
						{ this.state.show_bar_plot ? 
						< Bar_plot data_input={this.state.data_sessions} id_name="svg_year" timeframe="year" width={400} height={400} /> : 
						<div className={"loader bg-" + this.state.theme}> </div>}	
					</div>
					<div className="col-lg-4 col-md-6 col-sm-10 col-xs-12">
						{ this.state.show_bar_plot ? 
						< Bar_plot data_input={this.state.data_sessions} id_name="svg_month" timeframe="month" width={400} height={400} /> : 
						<div className={"loader bg-" + this.state.theme}> </div>}
					</div>
				</div>
			</div>
        )
    }
}