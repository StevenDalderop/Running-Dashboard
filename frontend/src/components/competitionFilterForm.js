import React from "react";

const SelectDistanceOptions = [
    { "value": "all", "name": "All" },
    { "value": 5, "name": "5 km" },
    { "value": 10, "name": "10 km" },
    { "value": 21.1, "name": "21.1 km" }
]

export default function CompetitionFilterForm(props) {
    return (
        <form>
            <strong>Distance</strong>
            <select name="distance" value={props.distance} onChange={props.handleChange} className="form-control">
                {SelectDistanceOptions.map((option, index) => <option key={index} value={option.value}> {option.name} </option>)}
            </select>
            <strong>Search</strong>
            <input type="search" name="searchString" value={props.searchString} className="form-control mr-sm-2" placeholder="Search" aria-label="Search"
                onChange={props.handleChange}></input>
            <strong> Show fastest times </strong>
            <input type="checkbox" name="isOnlyRecords" defaultChecked={props.isOnlyRecords} onChange={props.handleChange}></input>
        </form>
    )
}
