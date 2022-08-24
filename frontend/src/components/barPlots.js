import React from 'react';

const months = { "1": "jan", "2": "feb", "3": "mar", "4": "apr", "7": "juli", "10": "okt" }

function sumDistance(total, num) {
	return total + num.total_distance;
}

var groupBy = function (xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

function createDateRange(start, end) {
	var date = new Date(start.getFullYear(), start.getMonth())
	let data = []
	while (true) {
		let month = date.getMonth() + 1
		let year = date.getFullYear()
		if (month === 12) {
			month = 0
			year = year + 1
		}
		date = new Date(year, month)
		if (date > end) {
			break
		}
		data.push(date)
	}
	return data
}

export function BarPlotMonthlyRunningDistance(props) {
	return (
		<>
			{
				props.trainingSessions ?
					< BarPlot data_input={props.trainingSessions} id_name="svg_month" timeframe="month" width={400} height={400} /> :
					null
			}
		</>
	)
}

export function BarPlotYearlyRunningDistance(props) {
	return (
		<>
			{
				props.trainingSessions ?
					< BarPlot data_input={props.trainingSessions} id_name="svg_year" timeframe="year" width={400} height={400} /> :
					null
			}
		</>
	)
}



class BarPlot extends React.Component {
	componentDidMount() {
		this.DrawChart()
	}

	DrawChart() {
		var margin = ({ top: 30, right: 5, bottom: 30, left: 40 })
		var data_input = this.props.data_input.map(x => { return { "start_time": x.start_time, "total_distance": x.total_distance } })
		function SortByTimestamp(x, y) {
			return ((x.start_time == y.start_time) ? 0 : ((x.start_time > y.start_time) ? 1 : -1));
		}
		data_input.sort(SortByTimestamp);

		let start = data_input[0].start_time
		let end = data_input[data_input.length - 1].start_time

		let dateRange = createDateRange(start, end)
		let zeroData = dateRange.map(x => { return { "start_time": x, "total_distance": 0 } })

		data_input = data_input.concat(zeroData)

		data_input.sort(SortByTimestamp);

		if (this.props.timeframe === "year") {
			let data2 = data_input.map(x => { return { "year": x.start_time.getFullYear(), "total_distance": x.total_distance } })
			var data3 = groupBy(data2, "year")
		} else {
			let data2 = data_input.map(x => { return { "month": String(x.start_time.getFullYear()) + " " + String(x.start_time.getMonth() + 1), "total_distance": x.total_distance } })
			var data3 = groupBy(data2, "month")
		}

		var data = []

		for (var key in data3) { data.push({ date: key, value: data3[key].reduce(sumDistance, 0) }) }

		const svg = d3.select("#" + this.props.id_name)
			.attr("viewBox", [0, 0, this.props.width, this.props.height]);

		var x = d3.scaleBand()
			.domain(d3.range(data.length))
			.range([margin.left, this.props.width - margin.right])
			.padding(0.1)

		var y = d3.scaleLinear()
			.domain([0, d3.max(data, d => d.value)]).nice()
			.range([this.props.height - margin.bottom, margin.top])

		svg.append("g")
			.attr("fill", "steelblue")
			.selectAll("rect")
			.data(data)
			.join("rect")
			.attr("x", (d, i) => x(i))
			.attr("y", d => y(d.value))
			.attr("height", d => y(0) - y(d.value))
			.attr("width", x.bandwidth());

		if (this.props.timeframe === "year") {
			var xAxis = g => g
				.attr("transform", `translate(0,${this.props.height - margin.bottom})`)
				.call(d3.axisBottom(x).tickFormat(i => data[i].date).tickSizeOuter(0))
		} else {
			var xAxis = g => g
				.attr("transform", `translate(0,${this.props.height - margin.bottom})`)
				.call(d3.axisBottom(x).tickFormat(i => {
					if (data[i].date.split(" ")[1] === "1") {
						return data[i].date.split(" ")[0]
					} else if (["4", "7", "10"].indexOf(data[i].date.split(" ")[1]) !== -1) {
						return months[data[i].date.split(" ")[1]]
					} else {
						return null
					}
				})
					.tickSizeOuter(0))
		}

		var yAxis = g => g
			.attr("transform", `translate(${margin.left},0)`)
			.call(d3.axisLeft(y).ticks(null, data.format))
			.call(g => g.select(".domain").remove())
			.call(g => g.append("text")
				.attr("x", -margin.left + 5)
				.attr("y", 10)
				.attr("fill", "currentColor")
				.attr("text-anchor", "start")
				.text("Total distance"))

		svg.append("g")
			.call(xAxis);

		svg.append("g")
			.call(yAxis);
	}

	render() {
		return (<svg id={this.props.id_name}></svg>)
	}
}
