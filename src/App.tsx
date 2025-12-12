import { Grid } from '@mui/material';
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { useState } from 'react';
import InfoUI from './components/InfoUI';
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { data, loading, error } = useFetchData(selectedOption);
  const horas = data?.hourly?.time ? data.hourly.time.map(t => t.split("T")[1]) : [];
  const dia2 = data?.hourly?.time ? data.hourly.time.map(t => t.split("T")[0]) : [];
  const horaAmanecer = data?.daily?.sunrise ? data.daily.sunrise.map(t => t.split("T")[1]) : [];
  const horaAtardecer = data?.daily?.sunset ? data.daily.sunset.map(t => t.split("T")[1]) : [];
  const theme = createTheme({
    palette: {
      mode: data?.current?.is_day === 1 ? "light" : "dark",
    },
  });
  const isDay = data?.current?.is_day === 1;

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
    <div className={isDay ? "bg-day" : "bg-night"}>
      <ThemeProvider theme={theme}>

        <div className="content">

          <Grid container spacing={5} justifyContent="center" alignItems="center">


            {/* Encabezado */}
            <Grid size={{ xs: 12, md: 12 }}><HeaderUI /></Grid>

            {/* Alertas */}
            <Grid size={{ xs: 12, md: 12 }} bgcolor={'#69ad6d8c'} borderRadius={1}><AlertUI description="No se preveen lluvias" /></Grid>

            {/* Selector */}
            <Grid size={{ xs: 12, md: 3 }} bgcolor={'#b13e8eff'} borderRadius={1}><SelectorUI onOptionSelect={setSelectedOption} /></Grid>

            {/* Indicadores */}
            <Grid container size={{ xs: 12, md: 9 }} >

              <Grid size={{ xs: 12, md: 3 }}>
                {data && (<IndicatorUI title='Temperatura (2m)' description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />)}
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                {data && (<IndicatorUI title='Temperatura aparente' description={`${data.current.apparent_temperature}  ${data.current_units.apparent_temperature}`} />)}
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
              <TableUI fecha={horas}
                temperature={data.hourly.temperature_2m}
                wind_speed={data.hourly.wind_speed_10m}
                dia={dia2}
              /></Grid>

            {/* Información adicional */}
            <Grid container size={{ xs: 12, md: 12 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoUI title='Amanecer' description={`${horaAmanecer[0] || 'N/A'}`} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <InfoUI title='Atardecer' description={`${horaAtardecer[0] || 'N/A'}`} />
              </Grid>
            </Grid>

          </Grid>

        </div>

      </ThemeProvider>
    </div>
  )
}

export default App
