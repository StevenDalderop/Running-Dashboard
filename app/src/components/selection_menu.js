import React from 'react';

const SelectionMenu = (props) => {
	var selectItems = props.items.map((item, index) => <SelectItem key={index} value={item.value} name={item.name} />)
			
  return (
	<div className={props.className}>
	  <select name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} className="form-control">
		  { selectItems }
      </select>
	</div>
  )
}

function SelectItem(props) {
	return (<option value={props.value}> {props.name} </option>)
}

export default SelectionMenu;