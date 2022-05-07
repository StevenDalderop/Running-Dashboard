import React from 'react';
import styled from 'styled-components';

const Table = ({colnames, rows, height, id}) => {
	if (rows && rows.length < 8) {
		height = "100%";
	}	

	return (
		<Wrapper height={height}>
			<div id={id} className="table-container">
				<table className="table table-hover">
					<thead className="thead-light">		
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
	}

`