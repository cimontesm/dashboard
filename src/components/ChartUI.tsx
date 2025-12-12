import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ChartUIProps {
    fecha?: string[];
    temperature?: number[];
    wind_speed?: number[];
}

const theme = createTheme({
    colorSchemes: {
        dark: true,
        
    },
});

export default function ChartUI(props: ChartUIProps) {
    return (
        <ThemeProvider theme={theme}>
            <>
                <Typography variant="h5" component="div">
                    Temperatura vs. Velocidad
                </Typography>
                <LineChart
                    height={300}
                    series={[
                        { data: props.temperature, label: 'Temperature 2m', color: '#ff00f2ff' },
                        { data: props.wind_speed, label: 'Wind Speed 10m', color: '#9000e4ff' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: props.fecha }]}

                />
            </>
        </ThemeProvider>
    );
}