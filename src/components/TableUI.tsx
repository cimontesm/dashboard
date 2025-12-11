import Box from '@mui/material/Box';
import { cyan } from '@mui/material/colors';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>, arrDia: Array<string>) {
   return arrLabels.map((label, index) => ({
      id: index + 1,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index],
      value3: arrDia[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Hora',
      width: 125,
   },
   {
      field: 'value1',
      headerName: 'Temperatura',
      width: 125,
   },
   {
      field: 'value2',
      headerName: 'Velocidad del viento',
      width: 125,
   },
   {
      field: 'value3',
      headerName: 'Dia',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 100
   },
];

interface TabletUIProps {
   fecha: string[];
   temperature: number[];
   wind_speed: number[];
   dia: string[];
}


export default function TableUI(props: TabletUIProps) {

   const rows = combineArrays(props.fecha, props.temperature, props.wind_speed, props.dia);

   return (
      <Box sx={{
         height: 350, width: '100%'
      }}>
         <DataGrid
            rows={rows}
            columns={columns}
             sx={{
               background: '#f6feffff',
               border: 'none',
               "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#8babcaff",
                  color: "#5c3d94ff",
                  fontSize: "1rem",
               },
               "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#82a6c0ff",
               },
               "& .MuiDataGrid-cell": {
                  fontSize: "0.95rem",
               }
            }}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}