import React, { useEffect } from 'react'
import Loader from './loader'

const LinePlot = function LinePlot(props) {
	useEffect(() => {
			if (props.data) {
				DrawPlot()
			}
        }, [props.isLoading]);
	
	function DrawPlot() {
		if (props.column === "speed") {
			var data2 = props.data.map(z => {return {"x": new Date(Date.parse(z.timestamp)), "y": z.speed}})
		} else {
			var data2 = props.data.map(z => {return {"x": new Date(Date.parse(z.timestamp)), "y": z.heart_rate}})
		}
		
		var margin = ({top: 20, right: 25, bottom: 40, left: 50})
		
		var width = parseInt(props.width)
		
		var height = parseInt(props.height)
		
		var x = d3.scaleTime()
			.domain([data2[0].x, data2[data2.length - 1].x]).nice()
			.range([margin.left, width - margin.right])

		var y = d3.scaleLinear()
			.domain([0, d3.max(data2, d => d.y)]).nice()
			.range([height - margin.bottom, margin.top])
			
		var xAxis = g => g
			.attr("transform", `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(x).ticks(width / 100).tickSizeOuter(0))
			.selectAll("line,path").style("stroke", "currentcolor")
		
		var yAxis = g => g
			.attr("transform", `translate(${margin.left},0)`)
			.call(d3.axisLeft(y).ticks(10))
			.call(g => g.select(".domain").remove())
			.call(g => g.select(".tick:last-of-type text").clone()
				.attr("x", 3)
				.attr("text-anchor", "start")
				.attr("font-weight", "bold")
				.text(data2.y))	
			.selectAll("line,path").style("stroke", "currentcolor")
		
		var lineFunction = d3.line()
			.defined(d => !isNaN(d.y))
			.x(d => x(d.x))
			.y(d => y(d.y))
			
		let svg = d3.select("#" + props.id)
			.attr("viewBox", [0, 0, width, height]);

		var figureName = props.column === "speed" ? "Speed" : "Heart rate" 
		var yAxisName = figureName === "Speed" ? "km/h" : "bpm"

		svg.append("text")
			.attr("class", "x label")
			.attr("text-anchor", "end")
			.attr("x", width)
			.attr("y", height - 6)
			.text("Time")
			.style("fill", "currentcolor")

		svg.append("text")
			.attr("class", "y label")
			.attr("text-anchor", "end")
			.attr("x", 0)
			.attr("y", 0)
			.attr("dy", ".75em")
			.attr("transform", "rotate(-90)")
			.text(yAxisName)
			.style("fill", "currentcolor")
		
		svg.append("path")
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 1.5)
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round")
			.attr("d", lineFunction(data2));	
		
		svg.append("g")
			.call(xAxis)
			.selectAll("text").style("fill", "currentcolor")
		
		svg.append("g")
			.call(yAxis)
			.selectAll("text").style("fill", "currentcolor")
	}
	
	
	var outcome = props.isLoading ? <Loader height={props.height + "px"} theme={props.theme}/>  : <svg id={props.id}></svg>
	return (
		outcome
	)
}

export default LinePlot