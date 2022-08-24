import React, { useState, useEffect, useRef } from 'react'

export default function TrainingMap(props) {
	const [map, setMap] = useState() 
	const [polyline, setPolyline] = useState()
	const mapRef = useRef(null);

	useEffect(() => {
		mapRef.current = L.map('mapid').setView([51.505, -0.09], 13)
		setMap(mapRef.current)
	}, [])


	useEffect(() => {
		if (map) {
			generateMap(props.dataRecords)
		}
	}, [map, props.dataRecords])	
	
	function generateMap(dataRecords) {
		var latlngs = dataRecords.map((x) => [x["position_lat"], x["position_long"]])
		var latlngs_filtered = latlngs.filter(x => x[0] !== null)

		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1Ijoic3RldmVuMTEyMzUiLCJhIjoiY2tjYnkwbWhrMjlwZDJzbzByaWszaDZ1MyJ9.Bcpu42XUMYTHTJxgvptT1w'
		}).addTo(map);
		map.setView([latlngs_filtered[0][0], latlngs_filtered[0][1]], 13)		
		
		if (polyline) {
			polyline.remove()
		}

		setPolyline(L.polyline(latlngs_filtered, {color: 'red'}).addTo(map))	
	}
	
	return (
		<div id="mapid"> </div>
	)
}