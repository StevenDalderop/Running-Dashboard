import React from 'react'
import Navbar from '../components/navbar'
import { useState, useEffect } from 'react'
import Table from '../components/table';
import { roundDecimals, getFormattedDateTime, getMinutePerKm, getFormattedTime, getFormattedDistance } from '../util'
import TableRowTraining from '../components/table_row_training'

const baseUrl = window.location.protocol + "//" + window.location.host

export default function Trainingen() {
    const [sessionData, setSessionData] = useState(null)
    const [nextPage, setNextPage] = useState(null)

    useEffect(() => {
        fetch(`${baseUrl}/api/sessions/`)
            .then(res=> res.json())
            .then(data => {
                setSessionData(data.results)
                setNextPage(data.next)
        })
    }, []);

    useEffect(() => {
		if (!isLoading) {
			let table = document.querySelector("#table_container")

			table.onscroll = () => {
				if((table.clientHeight === (Math.round(table.scrollHeight - table.scrollTop))) && nextPage) {
					fetch(nextPage)
						.then(res => res.json())
						.then(data => {
							setSessionData(sessionData.concat(data.results))
							setNextPage(data.next)
						})
				}
			}
		}
    }, [])
	
	var isLoading = sessionData === null
	var rows = !isLoading ? sessionData.map((x) => <TableRowTraining data={x} key={x.index} />) : null
	
    return (
		<div className="container">
			{ <Table colnames={["Date", "Time", "Distance", "Average speed"]} height={"400px"} id={"table_container"}
					rows={rows} />}
		</div>
    )
}
