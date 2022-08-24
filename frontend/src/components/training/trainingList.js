import React from 'react'
import { useState, useEffect } from 'react'
import { getFormattedDateTime, getFormattedDistance } from '../../utils/util'
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const baseUrl = window.location.origin;

const Training = function Training(props) {
	let className = props.isInNavbar ? "nav-link" : ""

	return (
		<li className="mb-3">
			<Link to={`/trainings/${props.index}`} className={className}>
				<span>{getFormattedDateTime(props.start_time)}</span> <br></br>
				<span>{getFormattedDistance(props.total_distance) + " km"}</span>
			</Link>
		</li>
	)
}


export default function TrainingList(props) {
	const [trainingSessions, setTrainingSessions] = useState(null)
	const [nextPage, setNextPage] = useState(null)

	useEffect(() => {
		fetch(`${baseUrl}/api/sessions/`)
			.then(res => res.json())
			.then(data => {
				setTrainingSessions(data.results)
				setNextPage(data.next)
			})
	}, []);

	var isLoading = trainingSessions === null

	const handleScroll = (e) => {
		let isScrollAtBottom = e.currentTarget.clientHeight === (Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop));
		if (!(isScrollAtBottom && nextPage)) { return; }

		fetch(nextPage)
			.then(res => res.json())
			.then(data => {
				setTrainingSessions(prevTrainingSessions => {
					return prevTrainingSessions.concat(data.results);
				})
				setNextPage(data.next)
			})
	}


	let className = props.isInNavbar ? "isInNavbar" : "isInSidebar"

	return (
		<Wrapper>
			<ul id="trainingSessionsList" className={className} onScroll={handleScroll}>
				{
					!isLoading ? trainingSessions.map((training) => <Training key={training.index} isInNavbar={props.isInNavbar} {...training} />) : null
				}
			</ul>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	li {
		list-style: none;
	}

	.isInSidebar {
		padding: 0px;
		height: 100vh;
		overflow: scroll;
	}

	.isInNavbar {
		overflow: scroll;
		height: 300px;
	}
	`
