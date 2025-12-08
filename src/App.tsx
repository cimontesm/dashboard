import { Grid } from '@mui/material';
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {
  const { data, loading, error } = useFetchData();


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No se encontraron datos.</p>;
  }

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }}><AlertUI description="No se preveen lluvias" /></Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}><SelectorUI /></Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        <Grid size={{ xs: 12, md: 3 }}>
          {data && (<IndicatorUI title='Temperatura (2m)' description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data && (<IndicatorUI title='Temperatura aparente (°C)' description={`${data.current.apparent_temperature}  ${data.current_units.apparent_temperature}`} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data && (<IndicatorUI title='Velocidad del viento' description={`${data.current.wind_speed_10m}  ${data.current_units.wind_speed_10m}`} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {data && (<IndicatorUI title='Humedad relativa' description={`${data.current.relative_humidity_2m}  ${data.current_units.relative_humidity_2m}`} />)}
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }} >
        <ChartUI fecha={data.hourly.time.slice(0, 10)}
          temperature={data.hourly.temperature_2m.slice(0, 10)}
          wind_speed={data.hourly.wind_speed_10m.slice(0, 10)} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI fecha={data.hourly.time}
          temperature={data.hourly.temperature_2m}
          wind_speed={data.hourly.wind_speed_10m}
        /></Grid>

      {/* Información adicional */}
      <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
