import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
    fecha?: string[];
    temperature?: number[];
    wind_speed?: number[];
}


export default function ChartUI(props: ChartUIProps) {
    return (
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
                xAxis={[{ scaleType: 'point', data: props.fecha}]}
                
            />
        </>
    );
}