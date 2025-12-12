import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';

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

const theme = createTheme({
   colorSchemes: {
      light: {
         palette: {
            DataGrid: {
               bg: '#fcfcf8ff',
               pinnedBg: '#f6f9f1ff',
               headerBg: '#f5f5eaff',
            },
         },
      },
      dark: {
         palette: {
            DataGrid: {
               bg: '#3c3355ff',
               pinnedBg: '#322948ff',
               headerBg: '#271e3bff',
            },
         },
      },
   },
});

export default function TableUI(props: TabletUIProps) {

   const rows = combineArrays(props.fecha, props.temperature, props.wind_speed, props.dia);

   return (
      <ThemeProvider theme={theme}>
         <Box sx={{
            height: 350, width: '100%'
         }}>
            <DataGrid
               rows={rows}
               columns={columns}

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
      </ThemeProvider>
   );
}