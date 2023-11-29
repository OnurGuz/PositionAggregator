import React, { useState, useRef, useEffect, useMemo } from 'react';
import AppNavbar from './AppNavbar';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function TradeList () {

  const gridRef = useRef();
  const [rowData, setRowData] = useState();

    const fetchData = () => {
        // Your fetch logic here to get the data
    fetch('/trades')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
            .catch((error) => console.error('Error fetching data:', error));
    };

useEffect(() => {
fetchData();

}, []);

const DeleteButtonRenderer = (params) => {
		const onDelete = (id) => {
			fetch(`/trades/${id}`, {
	            method: 'DELETE',
	        })
	      .then((response) => {
	        if (response.ok) {
	          // Handle the successful deletion of the trade
			  //Refresh the data after a successful deletion
	          alert(`Trade: ${id} deleted!`)
	          console.log('Trade deleted successfully.');
			  fetchData();
	        } else {
	          // Handle errors for unsuccessful deletion
	          console.error('Failed to delete the trade.');
	        }
	      })
	      .catch((error) => {
	        // Handle any network errors
	        console.error('Error deleting the trade:', error);
	      });
	  };


	  return (
		<span>
		<button onClick={() => onDelete(params.data.id)}>X</button>
		</span>

	  );

};

const [columnDefs ] = useState([
  { field: 'id', width: 300 },
  { field: 'bbgCode' },
  { field: 'portfolio' },
  { field: 'strategy' },
  { field: 'account' },
  { field: 'user' },
  { field: 'currency' },
  { field: 'pnl', width: 200 },
  {
    headerName: 'Delete',
    cellRenderer: DeleteButtonRenderer
  }
]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
      sortable: true,
              // set every column width
              width: 140,
              // make every column use 'text' filter by default
              filter: 'agTextColumnFilter'
    }));

  // Example load data from server


  return (
    <div>
      <AppNavbar/>
       <div className="ag-theme-alpine" style={{width: 1700, height: 800}}>

        <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} //  set to 'true' to have rows animate when sorted
            rowSelection='multiple' // allows click selection of rows
			enableCellTextSelection={true} // allows cell value to be copied
            />
      </div>
    </div>
  );
};

export default TradeList;
