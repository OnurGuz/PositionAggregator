import React, { useState, useRef, useEffect, useMemo } from 'react';
import AppNavbar from './AppNavbar';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function PositionList () {

  const gridRef = useRef();
  const [rowData, setRowData] = useState();


  const [columnDefs ] = useState([

    {field: 'bbgCode'},
    {field: 'portfolio'},
    {field: 'strategy'},
    {field: 'account'},
    {field: 'user'},
    {field: 'currency'},
    {field: 'pnl', width: 300},
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
  useEffect(() => {
    // Make a request to your Spring Boot API to fetch the data
    // Example using fetch:
    fetch('/trades/positions')
      .then((response) => response.json())
      .then((data) => {
        // Flatten the nested data
        const flattenedData = flattenData(data);
        setRowData(flattenedData);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to flatten the nested data
const flattenData = (nestedData) => {
  let flattenedData = [];

  for (const [key1, value1] of Object.entries(nestedData)) {
    for (const [key2, value2] of Object.entries(value1)) {
      for (const [key3, value3] of Object.entries(value2)) {
        for (const [key4, value4] of Object.entries(value3)) {
          for (const [key5, value5] of Object.entries(value4)) {
            for (const [currency, pnl] of Object.entries(value5)) {
              flattenedData.push({
                bbgCode: key1,
                portfolio: key2,
                account: key3,
                strategy: key4,
                user: key5,
                currency: currency,
                pnl: pnl,
              });
            }
          }
        }
      }
    }
  }

  return flattenedData;
};

  return (
    <div>
     <AppNavbar/>
      <div className="ag-theme-alpine" style={{width: 1500, height: 800}}>

        <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API

            rowData={rowData} // Row Data for Rows

            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties

            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows
			enableCellTextSelection={true}
            />
      </div>
    </div>
  );
};

export default PositionList;
