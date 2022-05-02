import React from 'react';
import styled from 'styled-components';

const Table = ({colnames, rows, theme, height, id}) => {
	var thead_class = "thead-light"
	if (theme === "dark") thead_class = "thead-dark"
	
	var table_class = "table table-hover"
	if (theme === "dark") table_class += " table-dark"
	else if (theme === "light") table_class += " table-light"
	
	if (rows && rows.length < 8) {
		height = "100%";
	}	

	return (
		<Wrapper height={height}>
			<div id={id} className="table-container">
				<table className={table_class}>
					<thead className={thead_class}>		
						<tr>
							{ colnames.map((name, index) => <th scope="col" key={index.toString()}> {name} </th>)}
						</tr>
					</thead>
					<tbody>
						{ rows }  
					</tbody>
				</table>
			</div>
		</Wrapper>
	)
}
export default Table;

const Wrapper = styled.div`
	.table-container {
		overflow: auto;
		height: ${props => props.height};
		background-color: #212529;
	}

`