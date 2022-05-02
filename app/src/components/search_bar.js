import React from 'react';

const SearchBar = (props) => {
  return (
	<form className={props.className}>
		<input name="search" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" 
				value={props.value} onChange={(e) => props.handleChange(e)}></input>
	</form>
  )
}
export default SearchBar;