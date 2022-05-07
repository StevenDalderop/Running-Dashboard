import React, { useEffect, useState } from "react"

export default function useDataApi(url, getAll) {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	
	if (getAll) {
		var url = url + '?get_all=true'
	}
	
	useEffect(() => {
		fetch(url)
		    .then(res => res.json())
			.then(data => {
				if (getAll) {
					setData(data)
				} else {
					setData(data.results)
				}
				setIsLoading(false)
				})
			.catch(err => console.log(err));
	}, [url])	
	
	return [data, setData, isLoading]
}