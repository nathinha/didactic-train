import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CircleIcon from '@mui/icons-material/Circle';

const getDate = (value) => {
  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',

    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const date = Intl.DateTimeFormat(navigator.language, options).format(new Date(value.value));
  return date;
};

const getLocation = (location) => {
  return (
    <table>
      <tr>
        <td>
          <b>Name:</b>
        </td>
        <td>{location.value.name}</td>
      </tr>
      <tr>
        <td>
          <b>ID:</b>
        </td>
        <td>{location.value.id}</td>
      </tr>
    </table>
  );
};

const getEmployee = (employee) => {
  return (
    <table>
      <tr>
        <td>
          <b>Name:</b>
        </td>
        <td>{employee.value.name}</td>
      </tr>
      <tr>
        <td>
          <b>ID:</b>
        </td>
        <td>{employee.value.id}</td>
      </tr>
      <tr>
        <td>
          <b>Category:</b>
        </td>
        <td>
          <CircleIcon fontSize='small' sx={{ color: employee.value.categoryCode }} />
        </td>
      </tr>
    </table>
  );
};

const columns = [
  { field: 'transactionID', headerName: 'ID', width: 100 },
  { field: 'timeStamp', headerName: 'Date', width: 300, valueGetter: getDate },
  { field: 'amount', headerName: 'Amount', width: 100 },
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'location', headerName: 'Location', width: 250, renderCell: getLocation },
  { field: 'employee', headerName: 'Employee', width: 300, renderCell: getEmployee },
];

function getRowId(row) {
  return row.transactionID;
}

const Transactions = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8080/', { method: 'GET' });
      const data = await res.json();
      console.log(data);
      setRows(data);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <DataGrid
        sx={{ maxWidth: '70%' }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[5]}
        getRowId={getRowId}
        getRowHeight={() => 'auto'}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Transactions;
