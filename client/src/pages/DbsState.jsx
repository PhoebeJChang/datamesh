import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import dataMed from '../baslic_inf.json'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const DbsState = () => {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    
    { headerName: 'Hospital ID', field: 'hospital_id', filter: true },
    { headerName: 'Hospital Name', field: 'hospital_name', filter: true },
    { headerName: '病歷號碼', field: 'chart_no' } ,
    { headerName: 'Name', field: 'patient_name' } ,
    { headerName: 'Gender', field: 'patient_gender' } ,
    { headerName: '身分證字號', field: 'id_number' } ,
    { headerName: '生日', field: 'birth_date' } ,
    { headerName: '出生地', field: 'birth_place' } ,
    { headerName: '體重', field: 'weight' } ,
    { headerName: '地址', field: 'current_address' } ,
    { headerName: '職業', field: 'profession' } ,
    { headerName: '工作單位', field: 'work_unit' } ,
    { headerName: '聯絡資料', field: 'contact_information' } ,
    { headerName: '入院時間', field: 'admitting_time' } ,
    { headerName: '歷史病歷', field: 'history_recorder' } ,
    { headerName: 'Timestamp', field: 'ts' } ,
    
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    editable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
  }, []);

  // // Example load data from server
  // useEffect(() => {
  //   fetch('baslic_inf.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>

      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingBlockEnd: 20
      }} >
        <h2>MongoDB</h2>
      </div>


      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{
        width: '100%',
        height: 500,
        justifyContent: 'center',
      }}>

        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API

          rowData={dataMed} // Row Data for Rows

          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties

          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
          pagination={true}
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 20,
          paddingBlockEnd: 20,
        }} >
          <h2>MySQL DB</h2>
        </div>
        <div className="ag-theme-alpine" style={{
          width: '100%',
          height: 500,
          justifyContent: 'center',
        }}>

          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API

            rowData={dataMed} // Row Data for Rows

            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties

            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows
            pagination={true}
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          />
        </div>
      </div>


      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 20,
          paddingBlockEnd: 20,
        }} >
          <h2>Azure SQL</h2>
        </div>
        <div className="ag-theme-alpine" style={{
          width: '100%',
          height: 500,
          justifyContent: 'center',
        }}>

          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API

            rowData={dataMed} // Row Data for Rows

            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties

            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows
            pagination={true}
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          />
        </div>
      </div>


    </div>


  );

}

export default DbsState