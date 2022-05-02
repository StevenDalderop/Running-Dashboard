import React, { useEffect } from 'react'

export default function Map(props) {
	useEffect(() => {
		generateMap(props.dataRecords)
	}, [])	
	
	function generateMap(dataRecords) {
		var latlngs = dataRecords.map((x) => [x["position_lat"], x["position_long"]])
		var latlngs_filtered = latlngs.filter(x => x[0] !== null)

		var mymap = L.map('mapid').setView([51.505, -0.09], 13)
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1Ijoic3RldmVuMTEyMzUiLCJhIjoiY2tjYnkwbWhrMjlwZDJzbzByaWszaDZ1MyJ9.Bcpu42XUMYTHTJxgvptT1w'
		}).addTo(mymap);
		mymap.setView([latlngs_filtered[0][0], latlngs_filtered[0][1]], 13)		
		
		var polyline = L.polyline(latlngs_filtered, {color: 'red'}).addTo(mymap);	
	}
	
	return (
		<div id="mapid"> </div>
	)
}